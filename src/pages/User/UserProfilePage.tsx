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
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any>();
  const [character, setCharacter] = useState<any>();

  
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
        if(character) { console.log(character) } else return;
      })
    }, [])
  
  useEffect(() => {
    setLoading(false)  
  },[character && user])
  
  return (
  user && !loading && character?
    <ProfileCard
      user={user}
    /> : <IonLoading isOpen={loading}/> 
  )
}

export default UserProfilePage;
