import { IonButton, IonContent, IonPage } from '@ionic/react'
import React, { useState } from 'react'

const Modal = props => {

  const [ isActive, setIsActive ] = useState(false)

  const changeModalState = modalState => setIsActive(modalState)

  return (
    <IonPage>
      <IonContent>
    <div>
      <IonButton
        onClick={() => changeModalState(true)}
        data-toggle="modal"
        data-target="#exampleModal">
        { props.openIonButtonText || 'Open' }
      </IonButton>
      <div className={`modal ${isActive ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Make a Deal</p>
            <IonButton 
              onClick={() => changeModalState(false)}
              className="delete" 
              aria-label="close"></IonButton>
          </header>
          <section className="modal-card-body">
            { props.children }
          </section>
          <footer className="modal-card-foot">
            <IonButton 
              onClick={() => props.onModalSubmit(() => changeModalState(false))}
              className="IonButton is-success">Save changes</IonButton>
            <IonButton 
              onClick={() => changeModalState(false)}
              className="IonButton">Cancel</IonButton>
          </footer>
        </div>
      </div>
    </div>
    </IonContent>
  </IonPage>
  )
}


export default Modal