import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import { firestore, auth } from '../../firebase';
import { useHistory } from "react-router";
import { toast } from '../../toast';
import { IonLoading } from '@ionic/react';
import { connect } from 'react-redux' // HOC

const DashboardPage: React.FC = () => {
  
  const history = useHistory()
  const [users, setUsers] = useState<any>()
  const [loading, setLoading] = useState(false)
  
  // improvment could be writing the fetches as a function and rerunning the fetches until the data finally got fetched
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles")
    .get()
    .then(async snapshot => {
      const users = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      console.log(users)
      await setUsers(users)
    }) 
  }, [])
  useEffect(() => {
    setLoading(false)  
  },[users])
  
  
  return (
    users ? <UserListComponent
      users={users}
    /> : <IonLoading isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={5000}/>
  );
};

const mapStateToProps = state => ({services: state.services.all})
    
export default connect(mapStateToProps, {fetchServices})(DashboardPage)
