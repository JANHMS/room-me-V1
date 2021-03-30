import React from 'react';
import { Link } from "react-router-dom";
import withAuthorization from '../../hoc/withAuthorization';
import { fetchCollaborations } from '../../actions';
import moment from 'moment';
import { IonContent, IonItem, IonBackButton, IonToolbar, IonHeader, IonButtons, IonTitle, IonPage, IonLoading, IonButton, IonInput, IonList } from "@ionic/react";
import { Timestamp } from '../../firebase';
import ToggleBar from "../../components/ToggleBar";

class ReceivedCollaborations extends React.Component {

  state = {
    collaborations: []
  }

  getCollaborationStatus = expiresAt => {
    if (!expiresAt) { return {className: 'is-danger', status: 'Not Started'}}
    if (Timestamp.now().seconds < expiresAt.seconds) {
     return {className: 'is-warning', status: 'In Progress'} 
    } else {
      return {className: 'is-success', status: 'Finished'}
    }
  }

  componentDidMount() {
    const { auth: { user }} = this.props
    fetchCollaborations(user.uid)
      .then(collaborations => this.setState({collaborations}))
  }

  renderCollaborations = (collaborations) => {   
    return (
      <IonList>
       { collaborations.map(c => 
        <IonItem key={c.id} >
            <img src={c.image} alt={c.title}
            style={{width: "40px"}}/>
            <p>
              started {moment(c.createdAt.toDate()).fromNow()}
            <br/>
            </p>
        <Link to={`/my/collaborations/individual/${c.id}`}>
          <IonButton style={{position:"absolute", right:"10px", bottom:"10px"}}>Enter</IonButton>
        </Link>
      </IonItem>
      )}
    </IonList>
  )}

  render() {
    const { collaborations } = this.state
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/my" />
            </IonButtons>
            <IonTitle>Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.renderCollaborations(collaborations) }
        </IonContent>
        <ToggleBar />
      
      </IonPage>
    )
  }
}

export default withAuthorization(ReceivedCollaborations)
