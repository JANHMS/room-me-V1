import { IonButton, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonFooter } from '@ionic/react'
import React, { useState } from 'react'

const Modal = props => {

  const [ isActive, setIsActive ] = useState(false)

  const changeModalState = modalState => setIsActive(modalState)

  return (
    <IonPage>
      <IonContent>
        <IonCard>

      <IonButton
        onClick={() => changeModalState(true)}
        data-toggle="modal"
        data-target="#exampleModal">
        { props.openIonButtonText || 'Open' }
      </IonButton>
      <IonCardHeader>
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
          <p>Sent a request</p>
          <IonButton 
            onClick={() => changeModalState(false)}
            >Request</IonButton>
        </div>
        </IonCardHeader>
        <IonCardContent>
          <section className="modal-card-body">
            { props.children }
          </section>
          <IonFooter>
            <IonButton 
              onClick={() => props.onModalSubmit(() => changeModalState(false))}
              >Save changes</IonButton>
            <IonButton 
              onClick={() => changeModalState(false)}
              className="IonButton">Cancel</IonButton>
          </IonFooter>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  )
}


export default Modal