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

const DashboardPage: React.FC = (): JSX.Element => {
  
  const history = useHistory()
  
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<any>();
  const [user, setUser] = useState<any>();

    useEffect(() => {
      firestore.collection("profiles").doc(userId)
        .onSnapshot(async (doc) => {
          // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          const userData = doc.data()
          await setUser(userData)
        })
        
      const servicePromise = new Promise((resolve, reject) => {
        resolve(
          firestore.collection("profiles").doc(userId).collection('services')
          .orderBy("score", "desc")
          .onSnapshot(async (doc) => {
            const servicesData = doc.docs.map(doc => ({id: doc.id, ...doc.data()}))
            // console.log("This is the serviceData", servicesData)
            setServices(servicesData)
              })
          )
        }
      )
      servicePromise.then(() => {
        fetchServices()
        setLoading(false)
      })
      
    },[])

  async function logout() {
    history.push('/home')
    setLoadingLogout(true)
    toast("Logged out")
    setLoadingLogout(false)
    auth.signOut()
  }
  
  return (
    user && services && !loading ? 
    <DashboardComponent
      user={user}
      logout={logout}
      loadingLogout={loadingLogout}
      entries={entries}
      formatDate={formatDate}
      services={services}
    /> : <IonLoading isOpen={loading}
        message={'Please wait...'}
        duration={100000}/>
  );
};

const mapStateToProps = state => ({services: state.services.all})
    
export default connect(mapStateToProps, {fetchServices})(DashboardPage)
