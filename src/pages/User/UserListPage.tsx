import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import { firestore, auth } from '../../firebase';
import { useHistory } from "react-router";
import { toast } from '../../toast';
import { IonLoading } from '@ionic/react';
import { connect } from 'react-redux' // HOC
import UserListComponent from '../../components/User/UserListComponent';

const CITY_QUESTION_ID = "16";

const UserListPage: React.FC = () => {
  
  const { userId } = useAuth();
  const history = useHistory()
  const [users, setUsers] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>()

  const [locationData, setLocationData] = useState<any>()

  // improvment could be writing the fetches as a function and rerunning the fetches until the data finally got fetched
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        const userData = doc.data()
        await setUser(userData)
      })
        firestore.collection("profiles").doc(userId).collection("character").doc(CITY_QUESTION_ID)
        .onSnapshot(async (doc) => {
          const locationData = doc.data()
          setLocationData(locationData.answer)
      });
  }, [])
  
  useEffect(() => {
    setLoading(true)
    if(locationData) {
    firestore.collection('profiles').where("citylocation", "==", locationData)
      .get()
      .then(async snapshot => {
        const users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        console.log(users)
        await setUsers(users)
      }) 
    } else return;
  },[locationData])

  useEffect(() => {
    setLoading(false)  
  },[users])
  
  const handleMyUserProfileClick = () => {
    history.push("/my/profile")
  }
  
  return (
    users ? <UserListComponent
      handleMyUserProfileClick={handleMyUserProfileClick}
      user={user}
      users={users}
    /> : <IonLoading isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={5000}/>
  );
};
    
export default UserListPage;
