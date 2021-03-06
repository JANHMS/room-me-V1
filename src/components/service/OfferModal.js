import React, { useState } from 'react'
import Modal from '../Modal'
import { toast } from '../../../src/toast'
import { createRef, createOffer } from '../../actions'
import { IonInput, IonItem, IonTextarea, IonCard, IonList, IonModal, IonContent, IonPage, IonText } from "@ionic/react";

const OfferModal = ({
  service,
  auth,
  user
}) => {

  const [ offer, setOffer ] = useState({
    fromUser: '',
    toUser: '',
    service: '',
    status: 'pending',
    note: ''
  })

  const handleChange = ({ target: {value, name}}) => {
    // if (name === 'time') {
      // const price = Math.round(value * service.price * 100) / 100
    //   return setOffer({...offer, [name]: value})
    // }
    return setOffer({...offer, [name]: value})
  }

  const handleSubmit = (closeModal) => {
    const offerCopy = { ...offer }

    offerCopy.fromUser = createRef('profiles', auth.user.uid)
    offerCopy.toUser = createRef('profiles', service.userId)
    offerCopy.service = createRef('services', service.id)
    // offerCopy.time = parseInt(offer.time, 10)

    createOffer(offerCopy)
      .then(_ => {
        closeModal()
        toast('Message request was succefuly created!')
      }, (error) => {
        console.log(error)
      })

  }


  return (
    <IonPage>
      <IonContent>
        <IonCard style={{position: "flexible", bottom: "-300px"}}>
        <Modal
          onModalSubmit={handleSubmit}>
            <IonTextarea
              rows={"5"}
               onIonChange={handleChange}           
               name="note"
               type="text"
               placeholder="Why are you our perfect ROOM-ME?"
               max="5"
               min="0"/>            
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <IonText color="primary">
            {user && `Uppon acceptance ${user.fullName}" will come back to you.`}
          </IonText>
        </Modal>
      </IonCard>
    </IonContent>

  </IonPage>
  )
}


export default OfferModal