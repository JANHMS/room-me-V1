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

const DashboardPage: React.FC = (): JSX.Element => {
  
  const history = useHistory()
  
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any>();
  const [locationData, setLocationData] = useState<any>()
  const [authUserCharacter, setAuthUserCharacter] = useState<any>()
  const [serviceUserCharacters, setServiceUserCharacters] = useState<any>()
  const [serviceUserMatchAnswer, setServiceUserMatchAnswer] = useState<any>()
  
  
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
      const serviceUserCharactersDataObject = {}
      // console.log("This is services", services)
      if(services) {
      services.map(service => {
      firestore.collection("profiles").doc(service.userId).collection("character")
      .get()
      .then(snapshot => {
        const serviceUserCharacterData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        serviceUserCharactersDataObject[service.userId] = serviceUserCharacterData
        })
        
        // console.log("This is serviceUserCharactersDataArray", serviceUserCharactersDataArray)
      })
      setServiceUserCharacters(serviceUserCharactersDataObject)
    } else return
    },[services])
    
// useEffect(() => {
//     var MatchScore = {}
//     we map though all servies
  //   if(ServiceUserMatchAnswer) {
  //   ServiceUserMatchAnswer.map((SingleServiceUser, j) => {
  //     // we are mapping thought the array of services, because if we have 3 services we have 3 different persons published these services
  //     SingleServiceUser.map((answer, i) => {
  //       // we have the authUserCharacter in state
  //       if(SingleServiceUser[i] === authUserCharacter[i]) {
  //         // then we increase the matchscore of that object by one for each similar answer
  //         MatchScore[j] += 1
  //       } 
  //     })
  //     console.log(MatchScore)
  //   })
  //   setLoading(false)
  // } else return;
// },[serviceUserCharacters])

  // improvment could be writing the fetches as a function and rerunning the fetches until the data finally got fetched

  useEffect(() => {
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
          // console.log("This is the authUser Data", authUserCharacterData)
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
          } else return;
          
          setAuthUserCharacter(AuthUserMatchAnswer)
          //the 7th object of the array in the citylocation question answer is string
          setLocationData(authUserCharacterData[CITY_QUESTION_ID].answer)
        })
      });
  }, [])

  useEffect(() => {
    const ServiceUserMatchAnswer = {}
    Object.keys(serviceUserCharacters).map(function(key, index) {
      console.log(`This is the Object of the user ${key}`, serviceUserCharacters[key])
    });
    // console.log("This is services in last update", serviceUserCharacters)
      // serviceUserCharacters.map((serviceUserCharactersData, j) => {
      //   console.log("This is serviceUserCharactersData", serviceUserCharactersData)
        // var outerObj = {}
        //   serviceUserCharactersData.map((serviceUserCheckList,i) => {
        //     var innerArray = []
        //     serviceUserCheckList.checkedList?.map(answerObject => { 
        //         if(answerObject.text !== ""){ innerArray.push(answerObject.text) }
        //       }) 
        //       outerObj[serviceUserCheckList.id] = innerArray
        //     })
        //     // console.log("This is the outerObj", outerObj)
        //     ServiceUserMatchAnswer[j] = outerObj
        //     console.log("This is ServiceUserMatchAnswer", ServiceUserMatchAnswer)
          // })
      //   const outerObj = {}
      //   serviceUserCharactersData.map((serviceUserCheckList,i) => {
      //       var innerArray = []
      //       serviceUserCheckList.checkedList?.map(answerObject => {
      //         if(answerObject.text !== ""){
      //           innerArray.push(answerObject.text)
      //         }
      //       })
      //       // console.log("Mapped text with the innerArray id", innerArray)
      //       outerObj[serviceUserCheckList.id] = innerArray
      //   })        
      //   var ServiceUserMatchAnswer = {}
      //   ServiceUserMatchAnswer[j] = outerObj
      //   console.log("This is serviceUserCharacters", ServiceUserMatchAnswer)
      // })

  },[serviceUserCharacters])
  
  useEffect(() => {
    setLoading(false)
  },[serviceUserCharacters])

  async function logout() {
    history.push('/home')
    setLoadingLogout(true)
    toast("Logged out")
    setLoadingLogout(false)
    auth.signOut()
  }
  
  return (
    user && services && locationData && !loading ? 
    <DashboardComponent
      logout={logout}
      loadingLogout={loadingLogout}
      entries={entries}
      formatDate={formatDate}
      user={user}
      services={services}
    /> : <IonLoading isOpen={loading}
        message={'Please wait...'}
        duration={10000}/>
  );
};

const mapStateToProps = state => ({services: state.services.all})
    
export default connect(mapStateToProps, {fetchServices})(DashboardPage)
