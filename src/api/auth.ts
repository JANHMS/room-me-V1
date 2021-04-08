import firebase from 'firebase/app'
import 'firebase/auth'

import { firestore } from '../firebase'

const createUserProfile = (userProfile) => 
  firestore.collection('profiles')
    .doc(userProfile.uid)
    .set(userProfile)

export const register = async ({email, password, fullName, socialMediaLink}) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const { user } = res
    const userProfile = { uid: user.uid, fullName, email, socialMediaLink, services: []}
    await createUserProfile(userProfile)
    return userProfile
  } catch(error) {
    return Promise.reject(error.message)
  }
}

export const login = ({email, password}) => 
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => Promise.reject(error.message))

export const logout = () => firebase.auth().signOut()

export const onAuthStateChanged = onAuthCallback => 
  firebase.auth().onAuthStateChanged(onAuthCallback)


export const getUserProfile = (uid: string) =>
  firestore.collection('profiles')
    .doc(uid)
    .get()
    .then(snapshot => ({uid, ...snapshot.data()}))