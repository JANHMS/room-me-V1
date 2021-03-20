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

const DashboardPage: React.FC = () => {
  const history = useHistory()

  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any>()
  
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId)
      .collection('entries');
    return entriesRef.orderBy('date', 'desc').limit(7)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)))
  }, [userId]);
  
  useEffect(() => {
    firestore.collection("profiles").doc(userId)
        .onSnapshot((doc) => {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", doc.data().fullName);
        });
    }, [])
    console.log("This is user", user)

  const [loadingLogout, setLoadingLogout] = useState(false)

  async function logout() {
  setLoadingLogout(true)
  history.replace('/')
  toast("Logged out")
  setLoadingLogout(false)
  auth.signOut()
  }
  return (
    <DashboardComponent
      logout={logout}
      loadingLogout={loadingLogout}
      entries={entries}
      formatDate={formatDate}
    />
  );
};

export default DashboardPage;
