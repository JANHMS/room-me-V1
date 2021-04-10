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

const DashboardPage: React.FC = () => {
  
  const history = useHistory()
  
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any>();
  const [locationData, setLocationData] = useState<any>()
  const CITY_QUESTION_ID = "16";
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        firestore.collection("profiles").doc(userId).collection("character").doc(CITY_QUESTION_ID)
        .onSnapshot(async (doc) => {
          const LocationData = doc.data()
          setLocationData(LocationData)
        })
        firestore.collection('services').where("citylocation", "==", locationData.answer)
          .get()
          .then(async snapshot => {
            const servicesData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            console.log(servicesData)
            await setServices(servicesData)
          }) 
      fetchServices()
        });
    }, [])

  useEffect(() => { 
    setLoading(false)  
  },[services])
  
  const [loadingLogout, setLoadingLogout] = useState(false)

  async function logout() {
  history.push('/home')
  setLoadingLogout(true)
  toast("Logged out")
  setLoadingLogout(false)
  auth.signOut()
  }
  
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
