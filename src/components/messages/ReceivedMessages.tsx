import React from 'react'
import { connect } from 'react-redux'
import { getMessages } from '../../reducers'
import { markMessageAsRead } from '../../actions'
import { useHistory } from 'react-router-dom'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonItem, IonList, IonPage } from '@ionic/react'
import HeaderBar from '../HeaderBar'
import HeaderImage from '../HeaderImage'
import ToggleBar from '../ToggleBar'

const ReceivedMessages = ({dispatch, messages}) => {

  const history = useHistory()

  const handleMessageAsRead = message => {
    markMessageAsRead(message)
  }

  const goToCollaboration = message => {
    markMessageAsRead(message)
    history.push("my" + message.cta)
  }

return(   
    <IonPage>
      <HeaderBar />
      <IonContent>
        <IonList>
          {messages.filter(m => !m.isRead).map(message => 
          <IonItem key={message.id}
            style={{height: "900px"}}>
            <IonCard>
              <img src={message.fromUser.avatar} />
                <IonCardHeader>
                  <IonCardSubtitle>{message.fromUser.name}</IonCardSubtitle>
                </IonCardHeader>
                  <IonCardContent>

                  <div className="from-user">
                    <span>From: </span>{message.fromUser.name}
                  </div>
                  <hr />
                  <div className="navbar-item navbar-item-message">
                    <div>
                      { message.text }
                    </div>
                    <div onClick={() => goToCollaboration(message)}>
                      <div className="button is-success">Join</div>
                    </div>
                    <button
                      onClick={() => handleMessageAsRead(message)}
                      className="button is-warning">Later</button>
                  </div>
                  </IonCardContent>
                </IonCard>

              </IonItem>
            )}
          </IonList>
        </IonContent>
      <ToggleBar/>
    </IonPage>
    )
}

const mapStateToProps = (state) => ({messages: getMessages(state)})

export default connect(mapStateToProps)(ReceivedMessages)