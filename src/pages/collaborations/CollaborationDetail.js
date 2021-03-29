import React from 'react'
import { connect } from 'react-redux'
import withAuthorization from '../../hoc/withAuthorization'
import { withRouter } from 'react-router-dom'
import { Timestamp } from '../../firebase'
import moment from 'moment'
import { IonPage, IonLoading, IonButton, IonInput, IonList } from "@ionic/react";
import { 
  subToCollaboration, 
  joinCollaboration,
  leaveCollaboration,
  subToProfile,
  sendChatMessage,
  subToMessages,
  startCollaboration } from '../../actions'
import JoinedPeople from '../../components/collaboration/JoinedPeople'
import ChatMessages from '../../components/collaboration/ChatMessages'
import Timer from '../../components/collaboration/Timer'

class CollaborationDetail extends React.Component {

  state = {
    inputValue: '',
    reload: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    joinCollaboration(id, user.uid)
    this.watchCollabChanges(id)
    this.watchMessagesChanges(id)
  }

  watchCollabChanges = id => {
    this.unsubscribeFromCollab = this.props.subToCollaboration(id, 
      ({joinedPeople}) => {
        this.watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id))
      })
  }

  watchJoinedPeopleChanges = ids => {
    this.peopleWatchers = {}
    ids.forEach(id => {
      this.peopleWatchers[id] = this.props.subToProfile(id)
    })
  }

  watchMessagesChanges = collabId => {
    this.unsubscribeFromMessages = this.props.subToMessages(collabId)
  }

  onKeyboardPress = (e) => {
    if (e.key === 'Enter') { this.onSendMessage(this.state.inputValue) }
  }

  onSendMessage = inputValue => {
    if (inputValue.trim() === '') { return }

    const timestamp = moment().valueOf().toString()
    const { user } = this.props.auth
    const { collaboration } = this.props

    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim()
    }

    this.props.sendChatMessage({message, collabId: collaboration.id, timestamp})
      .then(_ => this.setState({inputValue: ''}))
      .catch(error => {
        // this.setState({inputValue: ''})
        alert(error)
      })
  }

  onStartCollaboration = collaboration => {
    const { id } = collaboration
    const nowSeconds = Timestamp.now().seconds

    const expiresAt = new Timestamp(nowSeconds + 20000, 0)
    startCollaboration(id, expiresAt)
  }

  componentWillUnmount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    this.unsubscribeFromCollab()
    this.unsubscribeFromMessages()

    Object.keys(this.peopleWatchers)
      .forEach(uid => this.peopleWatchers[uid]())

    leaveCollaboration(id, user.uid)
  }

  getCollaborationStatus = collaboration => {
    if (Object.keys(collaboration).length === 0) { return 'loading' }

    if (!collaboration.expiresAt) { return 'notStarted' }
    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
     return 'active' 
    } else {
      return 'finished'
    }
  }

  render() {
    const { collaboration, joinedPeople, messages } = this.props
    const { inputValue } = this.state
    const { user } = this.props.auth

    const status = this.getCollaborationStatus(collaboration)

    if (status === 'loading') { return <IonLoading isOpen={status === 'loading'} /> }

    return (
      <IonPage>
          <JoinedPeople users={joinedPeople} />
            <div className="headerChatUser">
              <span className="textHeaderChatBoard">{user.fullName}</span>
            </div>
            { status === 'notStarted' &&
                <IonButton 
                  onClick={() => this.onStartCollaboration(collaboration)}
                  className="IonButton is-success">Start Collaboration</IonButton>
            }
            { status === 'active' &&
              <Timer 
                seconds={20000 - Timestamp.now().seconds}
                timeOutCallback={() => this.setState({reload: true})}/>
            }
            { status === 'finished' &&
              <span className="tag is-warning is-large"> 
                Collaboration has been finished
              </span>
            }
          <IonList>
          <div className="viewListContentChat">
            <ChatMessages 
              authUser={user}
              messages={messages} />
            <div style={{float: "left", clear: "both"}}></div>
          </div>
            <IonInput 
              onIonChange={(e) => this.setState({inputValue: e.target.value})}
              onKeyPress={this.onKeyboardPress}
              // disabled={status === 'finished' || status === 'notStarted'}
              value={inputValue}
              placeholder="Type your message..." />
            <IonButton 
              onClick={() => this.onSendMessage(inputValue)}
              // disabled={status === 'finished' || status === 'notStarted'}
              >Send
            </IonButton>
          </IonList>
      </IonPage>
    )
  }
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
  subToMessages,
  sendChatMessage
})

const mapStateToProps = ({collaboration}) => {
  return {
    collaboration: collaboration.joined,
    joinedPeople: collaboration.joinedPeople,
    messages: collaboration.messages
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))
export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)