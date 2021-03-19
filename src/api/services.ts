import firebase from 'firebase'
import { firestore } from '../firebase'

import { createRef } from './index'

export const fetchServiceById = (serviceId: string) => 
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

export const fetchUserServices = async (userId: any) => {
  const userRef = createRef('users', userId)
  const snapshot = await firestore
    .collection('services')
    .where("user", "==", userRef)
    .get()
  const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return services
  }


export const createService = async (newService: firebase.firestore.DocumentData) => {
  const docRef = await firestore
    .collection('services')
    .add(newService)
  return docRef.id
}