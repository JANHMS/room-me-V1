import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from "../../api";
import { IonLoading } from '@ionic/react';
import { useHistory } from "react-router-dom";
import ProfileCard from '../../components/User/ProfileCard';
import { firestore } from '../../firebase';
import { Entry } from '../../models';
import { useAuth } from '../../auth';

const UserProfilePage = props => {
  const history = useHistory()
  
  const { userId } = useAuth();
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [character, setCharacter] = useState<any>();
  const [individualCheckList, setIndividualCheckList] = useState<any>();


  
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        })

    firestore.collection("profiles").doc(userId).collection('character')
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
    //   answer.checkedList.map((a,index)=> (
    //     a.id
    // ))
  )) } else return;
},[character])
  
  return (
  user && !loading && character && user.image ?
    <ProfileCard
      user={user}
      character={character}
    /> : <IonLoading isOpen={loading}/> 
  )
}

export default UserProfilePage;
