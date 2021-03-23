import React, { useState } from 'react'
import Modal from '../Modal'
import { toast } from '../../../src/toast'
import { createRef, createOffer } from '../../actions'
import { IonInput, IonContent, IonPage } from "@ionic/react";

const OfferModal = ({service, auth, user}) => {

  const [ offer, setOffer ] = useState({
    fromUser: '',
    toUser: '',
    service: '',
    status: 'pending',
    price: 0,
    time: 0,
    note: ''
  })

  const handleChange = ({ target: {value, name}}) => {
    if (name === 'time') {
      const price = Math.round(value * service.price * 100) / 100
      return setOffer({...offer, [name]: value, price})
    }

    return setOffer({...offer, [name]: value})
  }

  const handleSubmit = (closeModal) => {
    const offerCopy = { ...offer }

    offerCopy.fromUser = createRef('profiles', auth.user.uid)
    offerCopy.toUser = createRef('profiles', service.userId)
    offerCopy.service = createRef('services', service.id)
    offerCopy.time = parseInt(offer.time, 10)

    createOffer(offerCopy)
      .then(_ => {
        closeModal()
        toast('Offer was succefuly created!')
      }, (error) => {
        console.log(error)
      })

  }


  return (
    <IonPage>
    <IonContent>

    <Modal
      onModalSubmit={handleSubmit}
      openButtonText="Make an offer">
        <IonInput
           onChange={handleChange}
           placeholder="Write some catchy note"
           max="5"
           min="0"/>
        <p className="help">Note can increase chance of getting the service</p>
        <IonInput
           onChange={handleChange}
           type="number"
           placeholder="How long you need service for ?"
         />
        <p className="help">Enter time in hours</p>
          {user && `Uppon acceptance ${user.fullName}" will charge you:`}
          <h1 className="title">{offer.price}$</h1>
    </Modal>
  </IonContent>
  </IonPage>
  )
}


export default OfferModal