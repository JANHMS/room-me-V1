import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchServiceById } from '../../actions';
import * as api from "../../api";
import ServiceDeatilComponent from '../../components/service/ServiceDetailComponent';
import { IonLoading } from '@ionic/react';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

const ServiceDetail = props => {
  
  const { service, auth } = props
  const { userId } = service
  const { fetchServiceById, isFetching } = props
  
  const { serviceId } = useParams<{serviceId: string}>()

  const [offer, setOffer] = useState(false)
  const [serviceUser, setServiceUser] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser()
    fetchServiceById(serviceId)
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [serviceUser])
  
  const handleOfferClick = (_:any) => {
    setOffer(!offer)
    console.log(offer)
  }
    
  async function fetchUser () {
    const ServiceUser = await api.getUserProfile(userId)  
    setServiceUser(ServiceUser)
  }
  
  const handleMediaLinkClick = async (serviceAdress) => {
    await Browser.open({ url: serviceAdress });
  }
  return (
  serviceUser && !loading && auth && !isFetching ?
    <ServiceDeatilComponent
      auth={auth}
      user={serviceUser}
      service={service}
      offer={offer}
      handleOfferClick={handleOfferClick}
      handleMediaLinkClick={handleMediaLinkClick}
    /> : <IonLoading isOpen={loading}/> 
  )
}


const mapStateToProps = ({selectedService, auth}) => (
  {
    service: selectedService.item,
    isFetching: selectedService.isFetching,
    auth
  }
)

export default connect(mapStateToProps, {fetchServiceById})(ServiceDetail)
