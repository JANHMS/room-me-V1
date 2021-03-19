import { firestore } from '../firebase'
import { createRef } from './index'


export const createOffer = offer => firestore.collection('offers').add(offer)

export const fetchSentOffers = userId => {
  const userRef = createRef('profiles', userId)
  return firestore
    .collection('offers')
    .where('fromUser', '==', userRef)
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
}

export const fetchReceivedOffers = userId => {
  const userRef = createRef('profiles', userId)
  return firestore
    .collection('offers')
    .where('toUser', '==', userRef)
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
}

export const changeOfferStatus = (offerId, status) => 
  firestore.collection('offers')
    .doc(offerId)
    .update({status})

export const markOfferAsInCollaboration = offerId => 
  firestore.collection('offers')
    .doc(offerId)
    .update({collaborationCreated: true})
