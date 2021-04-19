import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import { formatDate } from '../../date';
import { firestore } from '../../firebase';
import { Entry, toEntry } from '../../models';
import { auth } from '../../firebase';
import { useHistory } from "react-router";
import DashboardComponent from '../../components/DashboardComponent';
import { toast } from '../../toast';
import { getUserProfile } from '../../api';
import { IonLoading } from '@ionic/react';
import { connect } from 'react-redux' // HOC
import { fetchServices } from '../../actions';
import CreateUserSpecificServices from '../../components/User/CreateUserSpecificServices';

//the 7th object of the array in the citylocation question answer is string
const CITY_QUESTION_ID = "7";
const CreateUserSpecificServicesPage: React.FC = (): JSX.Element => {
  
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
  const [serviceUserCharactersLoaded , setServiceUserCharactersLoaded] = useState(false)
  
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
      const servicePromise = new Promise((resolve, reject) => {
        if(locationData) {
          resolve(
            firestore.collection('services')
            .where("citylocation", "==", locationData)
            .get()
            .then(async snapshot => {
              const servicesData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
              console.log("This is the serviceData", servicesData)
              setServices(servicesData)
            })
          )
        }
      })
      servicePromise.then(() => {
        fetchServices()
      }
    )
    },[locationData])

    useEffect(() => {
      const serviceUserCharacterPromise = new Promise((resolve, reject) => {
      // fetch data of the users who offer the services, array of array of objects
      const serviceUserCharactersDataObject = {}
      // console.log("This is services", services)
      if(services) {
        services.map(service => {
        firestore.collection("profiles").doc(service.userId).collection("character")
        .get()
        .then(snapshot => {
          const serviceUserCharacterData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
          //the service id and the userData according to that service
          serviceUserCharactersDataObject[service.id] = serviceUserCharacterData
          })
          
          console.log("This is serviceUserCharactersDataArray", serviceUserCharactersDataObject)
        })
      }
        resolve(setServiceUserCharacters(serviceUserCharactersDataObject))
      })
    serviceUserCharacterPromise.then(() => setServiceUserCharactersLoaded(true))
    // console.log('This is the Object setSetServiceUserCharactersLoading', serviceUserCharactersLoaded)
    setLoading(false)

    },[services])

  // improvment could be writing the fetches as a function and rerunning the fetches until the data finally got fetched

    //this first step is done to refactor the Object and get the pure answer data
    const createScore = () => {
      const ServiceUserMatchAnswer = {}
      // console.log(`This is the Object serviceUserCharacters`, serviceUserCharacters)
      
      const myPromise = new Promise((resolve, reject) => {
        Object.keys(serviceUserCharacters).map(function(key, index) {
            // console.log(`This is the Object of the user ${key}`, serviceUserCharacters[key])
            var outerObj = {}
            serviceUserCharacters[key].map((object) => {
              var innerArray = []
              object.checkedList && object.checkedList.map((answer) => {
                if(answer.text !== "") { 
                  innerArray.push(answer.text) 
                }
              })
              outerObj[object.id] = innerArray
            })
            ServiceUserMatchAnswer[key] = outerObj
            // console.log(`This is the Object of the user ${key} and the answer`, ServiceUserMatchAnswer)  
          });
      
          if(ServiceUserMatchAnswer !== {}) {
            // Matchscores is object with key userId and score as number
            const MatchScores = {};
            Object.keys(ServiceUserMatchAnswer).map(function(key, index) {
              var score = 0;
              // console.log(`This is the Object of the user ${key} and the answer`, ServiceUserMatchAnswer[key])
              if(ServiceUserMatchAnswer) {
                Object.keys(ServiceUserMatchAnswer[key]).map(function(k, index) {
                  // we map thought all service users and map throught their answers, if they are the same as the one of authuser w matchsore += 1
                  // console.log(`This is the ServiceUserMatchAnswer`, ServiceUserMatchAnswer[key][k])
                  // console.log("This is the authUser", authUserCharacter[index])
      
                  var a = authUserCharacter[index]
                  var b = ServiceUserMatchAnswer[key][k]
      
                  for (var i = 0; i < b.length; ++i) {
                    if (a[i] !== b[i]) return false;
                  }
                  score += 1;
                });
                MatchScores[key] = score
                firestore.collection("services").doc(key).set({
                  matchscore: score
                }, { merge: true })
      
              }
            })  
            console.log('This is the score', MatchScores)
          }
      });
      myPromise.then(() => {
      })
    }

const handleCreateClick = () => {
  console.log(services)
  // firestore.collection("profiles").doc(userId).collection("services")
}
  
  return (
    user && services && locationData && !loading ? 
    <CreateUserSpecificServices
      createScore={createScore}
      handleCreateClick={handleCreateClick}
    /> : <IonLoading isOpen={loading}
        message={'Please wait...'}
        duration={100000}/>
  );
};

const mapStateToProps = state => ({services: state.services.all})
    
export default connect(mapStateToProps, {fetchServices})(CreateUserSpecificServicesPage)
