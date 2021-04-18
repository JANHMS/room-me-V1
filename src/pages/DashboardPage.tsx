import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { formatDate } from '../date';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { auth } from '../firebase';
import { useHistory } from "react-router";
import DashboardComponent from '../components/DashboardComponent';
import { toast } from '../toast';
import { getUserProfile } from '../api';
import { IonLoading } from '@ionic/react';
import { connect } from 'react-redux' // HOC
import { fetchServices } from '../actions';

//the 7th object of the array in the citylocation question answer is string
const CITY_QUESTION_ID = "7";

const DashboardPage: React.FC = () => {
  
  const history = useHistory()
  
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any>();
  const [locationData, setLocationData] = useState<any>()
  const [authUserCharacter, setAuthUserCharacter] = useState<any>()
  const [serviceUserCharacters, setServiceUserCharacters] = useState<any>()
  
    useEffect(() => {
      if(locationData) {
        firestore.collection('services').where("citylocation", "==", locationData)
        .get()
        .then(async snapshot => {
          const servicesData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
          // console.log("This is the serviceData", servicesData)
          await setServices(servicesData)
        })
        fetchServices()
      } else return;
    },[locationData])

    useEffect(() => {
      // fetch data of the users who offer the services, array of array of objects
      const serviceUserCharactersDataArray = []
      // console.log("This is services", services)
      if(services) {
      services.map(service => {
      firestore.collection("profiles").doc(service.userId).collection("character")
      .get()
      .then(snapshot => {
        const serviceUserCharacterData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        serviceUserCharactersDataArray.push(serviceUserCharacterData)
        })
        setServiceUserCharacters(serviceUserCharactersDataArray)
        // console.log("This is serviceUserCharactersDataArray", serviceUserCharactersDataArray)
      })
    } else return
    },[services])
    
  // improvment could be writing the fetches as a function and rerunning the fetches until the data finally got fetched
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        // here we fetch from the character collection of the auth user
        firestore.collection("profiles").doc(userId).collection("character")
        .get()
        .then(snapshot => {
          const authUserCharacterData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
          console.log("This is the authUser Data", authUserCharacterData)
          const AuthUserMatchAnswer = {}
          if(authUserCharacterData) {
          authUserCharacterData.map((authUserCheckedList) => {
              if(authUserCheckedList.checkedList){
                var innerArray = []
                authUserCheckedList.checkedList.map(answerObject => {
                  if(answerObject.text !== ""){
                    innerArray.push(answerObject.text)
                  } else return;
                })

                AuthUserMatchAnswer[authUserCheckedList.id] = innerArray

              }
          })
          console.log("Mapped text of AuthUserMatchAnswer id", AuthUserMatchAnswer)
          setLoading(false)
          } else return;
          setAuthUserCharacter(authUserCharacterData)
          //the 7th object of the array in the citylocation question answer is string
          setLocationData(authUserCharacterData[CITY_QUESTION_ID].answer)
        })
      });
  }, [])
  
  useEffect(() => {
    const ServiceUserMatchAnswer = {}
    if(serviceUserCharacters) {
    serviceUserCharacters.map((serviceUserCharactersData) => {
      serviceUserCharactersData.map((serviceUserCheckList,i) => {
        if(serviceUserCheckList.checkedList){
          var innerArray = []
          serviceUserCheckList.checkedList.map(answerObject => {
            if(answerObject.text !== ""){
              innerArray.push(answerObject.text)
            } else return;
          })
          // console.log("Mapped text with the innerArray id", innerArray)
          ServiceUserMatchAnswer[serviceUserCheckList.id] = innerArray
        }}
      )
    })
    console.log("ServiceUserMatchAnswer", ServiceUserMatchAnswer)
    setLoading(false)
    } else return;
  },[serviceUserCharacters])
  

  async function logout() {
    history.push('/home')
    setLoadingLogout(true)
    toast("Logged out")
    setLoadingLogout(false)
    auth.signOut()
  }
  
  // calculate RoomME Match score
    
  // I have user and services
  // fetch the answered questions of the current authenticated user 
  // fetch the answered questiosn of the users who have created the serviceData
  // compare those answers and give back a percentage of similar answered questions
  return (
    user && services && locationData ? <DashboardComponent
      logout={logout}
      loadingLogout={loadingLogout}
      entries={entries}
      formatDate={formatDate}
      user={user}
      services={services}
    /> : <IonLoading isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={5000}/>
  );
};

const mapStateToProps = state => ({services: state.services.all})
    
export default connect(mapStateToProps, {fetchServices})(DashboardPage)
