import React, { useEffect } from 'react'
import ServiceItem from '../../components/service/ServiceItem'

import { fetchUserServices } from '../../actions'
import { useAuth } from '../../auth'
import { IonPage } from '@ionic/react'
import withAuthorization from '../../hoc/withAuthorization'

const UserServicesPage = ({
  dispatch,
  auth
}) => {
  
  const { user } = auth.user
  const { services } = auth.services
  
  const { userId } = useAuth()
  
  useEffect(()=> {
    dispatch(fetchUserServices(userId))
  },[])
  
  return (
    <IonPage>
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Your Services</h1>
        <div className="columns is-multiline">
          <h1>Service Page</h1>
        </div>
      </div>
    </div>
  </IonPage>
  )
}


export default UserServicesPage;
