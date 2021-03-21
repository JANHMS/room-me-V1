import React, { useEffect, useState } from 'react'
import ServiceItem from '../../components/service/ServiceItem'

import { fetchUserServices } from '../../actions'
import { useAuth } from '../../auth'
import { IonLoading, IonPage } from '@ionic/react'
import { firestore } from '../../firebase'

const UserServicesPage = ({
  dispatch,
  auth
}) => {
  const { userId } = useAuth();

  const [user, setUser] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any>()
  useEffect(() => {
    setLoading(true)
    firestore.collection("profiles").doc(userId)
      .onSnapshot(async (doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        const userData = doc.data()
        await setUser(userData)
        // console.log(source, " data: ", doc.data());
        
        firestore.collection('services')
          .get()
          .then(async snapshot => {
            const services = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            await setServices(services)
            console.log(services)
            setLoading(false)
          })
        });
    }, [])
  
  // 
  // useEffect(()=> {
  //   dispatch(fetchUserServices(userId))
  // },[])
  
  return (
    services ? 
    <IonPage>
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Your Services</h1>
        <div className="columns is-multiline">
          {
            services.map(s => (
              <div key={s.id} className="column">
                <ServiceItem service={s} />
              </div>
              )
            )
          }
        </div>
      </div>
    </div>
  </IonPage> : <IonLoading 
    isOpen={loading}
    onDidDismiss={() => setLoading(false)}
    message={'Please wait...'}
    duration={5000}/>
  )
}


export default UserServicesPage;
