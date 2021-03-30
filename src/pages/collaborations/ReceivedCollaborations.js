import React from 'react';
import { Link } from "react-router-dom";
import withAuthorization from '../../hoc/withAuthorization';
import { fetchCollaborations } from '../../actions';
import moment from 'moment';
import { IonContent, IonItem, IonBackButton, IonToolbar, IonHeader, IonButtons, IonTitle, IonPage, IonLoading, IonButton, IonInput, IonList } from "@ionic/react";
import { Timestamp } from '../../firebase';

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
    return collaborations.map(c => {
      const {className, status} = this.getCollaborationStatus(c.expiresAt)
      return (
        <IonItem key={c.id} >
        <article 
          
          className="post">
          <h4>{c.title}</h4>
          <div className="media">
            <div className="media-left">
              <p className="image is-32x32">
                <img src={c.image} alt={c.title}
                style={{width: "40px"}}/>
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <span>{c.fromUser.name}</span> replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                  <span 
                    className={`tag ${className}`}>{status}</span>
                </p>
              </div>
            </div>
                <Link to={`/my/collaborations/individual/${c.id}`}>
                  <IonButton className="button">Enter</IonButton>
                </Link>
            </div>
        </article>
      </IonItem>
      )
    })
  }

  render() {
    const { collaborations } = this.state
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Collaborations</IonTitle>
          </IonToolbar>
        </IonHeader>

          <div className="box content">
            { this.renderCollaborations(collaborations) }
          </div>
      </IonPage>
    )
  }
}

export default withAuthorization(ReceivedCollaborations)
