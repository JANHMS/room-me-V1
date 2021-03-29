import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonImg, IonItem, IonList, IonPage } from '@ionic/react'
import React from 'react'

const JoinedPeople = ({
  users
}) => {


  const statusClass = (status) => {
    return status === 'online' ? 'is-success' : 'is-danger'
  }

  return (
    (users.length > 0) ?
        <IonList>
          {users.map(user => 
          <IonItem key={user.id}>
            <IonCard>
              <IonImg
                  src={user.avatar}
                  alt="icon avatar"
              />
              <IonCardHeader>
                <IonCardSubtitle>{user.fullName}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <span className={`tag textItem ${statusClass(user.state)}`}>{user.state}
                </span>
              </IonCardContent>
            </IonCard>
          </IonItem>
        )}
      </IonList> : null
  )
}

export default JoinedPeople