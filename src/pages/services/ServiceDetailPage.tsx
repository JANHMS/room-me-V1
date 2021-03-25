import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchServiceById } from '../../actions';
import * as api from "../../api";
import Spinner from '../../components/Spinner/SpinnerComponent';
import ServiceDeatilComponent from '../../components/service/ServiceDetailComponent';

const ServiceDetail = props => {
  const [offer, setOffer] = useState(false)
  const { serviceId } = useParams<{serviceId: string}>()
  const { fetchServiceById, isFetching } = props
  
  useEffect(() => {
    fetchServiceById(serviceId)
    fetchUser()
  }, [])

  const handleOfferClick = (_:any) => {
    setOffer(!offer)
    console.log(offer)
  }

  const { service, auth } = props
  const { userId } = service
    
  // console.log(userId)
  
  const [serviceUser, setServiceUser] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  async function fetchUser () {
    const ServiceUser = await api.getUserProfile(userId)
    await setServiceUser(ServiceUser)
    console.log(ServiceUser)
    setLoading(false)
  }
  if (isFetching || serviceId !== service.id || loading) { return <Spinner /> }

  return (
  serviceUser && !loading && auth ?
    <ServiceDeatilComponent
      auth={auth}
      user={serviceUser}
      service={service}
      offer={offer}
      handleOfferClick={handleOfferClick}
    /> : <Spinner /> 
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
