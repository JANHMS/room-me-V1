import { IonButton, IonTitle, IonText, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonFooter } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Modal = (props, setOffer) => {
  let history = useHistory();

  return (
    <div>
      <section className="modal-card-body">
        { props.children }
      </section>
      <br />

        <IonButton 
          onClick={() => props.onModalSubmit(() => history.goBack())}
          >Request Chat</IonButton>
        <br />
          <IonText>
          To see the offer again click on the chat symbol
        </IonText>

    </div>
  )
}


export default Modal