import firebase from 'firebase'
import { firestore } from '../firebase'

import { createRef } from './index'


export const fetchServiceById = serviceId => 
  firestore.collection('services')
    .doc(serviceId)
    .get()
    .then(snapshot => ({id: snapshot.id, ...snapshot.data()}))


export const fetchServices = () => 
  firestore.collection('services')
    .get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      return services
    })

export const fetchUserServices = userId => {
  const userRef = createRef('profiles', userId)
  return firestore
    .collection('services')
    .where("user", "==", userRef)
    .get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      return services
    })
  }


export const createService = newService => {
  return firestore
    .collection('services')
    .add(newService)
    .then(docRef => docRef.id)
}