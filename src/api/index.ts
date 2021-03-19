

import { firestore } from '../firebase'

export const createRef = (collection, docId) => firestore.doc(`${collection}/` + docId)

export * from './services'
export * from './auth'
export * from './offers'
export * from './collaborations'
export * from './connection'















