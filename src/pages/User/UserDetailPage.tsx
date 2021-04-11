import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from "../../api";
import { IonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import ProfileCard from '../../components/User/ProfileCard';
import { firestore } from '../../firebase';
import { Entry } from '../../models';
import { useAuth } from '../../auth';
import UserDetailComponent from '../../components/User/UserDetailComponent';
interface RouteParams {
  id: string;
}
const UserDetailPage = props => {
  const history = useHistory()
  
  const { id } = useParams<RouteParams>();
  
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [character, setCharacter] = useState<any>();
  const [individualCheckList, setIndividualCheckList] = useState<any>();

  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(id)
      .onSnapshot(async (doc) => {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        })

    firestore.collection("profiles").doc(id).collection('character')
      .get()
      .then(async snapshot => {
        const characterData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        await setCharacter(characterData)
      })
    }, [])
  
  useEffect(() => {
    setLoading(false)

    if (character) {
    const exampleList = character.map(answer => (
        console.log(answer.checkedList)
  )) } else return;
},[character])
  
  return (
  user && !loading && character && user.image ?
    <UserDetailComponent
      user={user}
      character={character}
    /> : <IonLoading isOpen={loading}/> 
  )
}

export default UserDetailPage;
