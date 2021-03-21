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
import Spinner from '../components/Spinner/SpinnerComponent';
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
  
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId)
      .collection('entries');
    return entriesRef.orderBy('date', 'desc').limit(7)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)))
  }, [userId]);
  
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        
        firestore.collection('services')
          .get()
          .then(async snapshot => {
            const servicesData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            console.log(servicesData)
            await setServices(servicesData)
          })
  
      setLoading(false)
        });
    }, [])
    
  const [loadingLogout, setLoadingLogout] = useState(false)

  async function logout() {
  setLoadingLogout(true)
  history.replace('/')
  toast("Logged out")
  setLoadingLogout(false)
  auth.signOut()
  }
  
  return (
    user && services ? <DashboardComponent
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


