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

const DashboardPage: React.FC = () => {
  const history = useHistory()

  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  
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
        // console.log(source, " data: ", doc.data());
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
    user ? <DashboardComponent
      logout={logout}
      loadingLogout={loadingLogout}
      entries={entries}
      formatDate={formatDate}
      user={user}
    /> : <IonLoading isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={5000}/>
  );
};

export default DashboardPage;
