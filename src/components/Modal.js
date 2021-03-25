import { IonButton, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonFooter } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Modal = (props, setOffer) => {
  let history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonTitle>          
            <p>Request a chat</p>
          </IonTitle>   
        <IonCardContent>
          <section className="modal-card-body">
            { props.children }
          </section>
          <IonFooter>
            <IonButton 
              onClick={() => props.onModalSubmit(() => history.goBack())}
              >Request Chat</IonButton>
          </IonFooter>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  )
}


export default Modal