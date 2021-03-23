import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchServiceById } from '../../actions';

import Spinner from '../../components/Spinner/SpinnerComponent';
import ServiceDeatilComponent from '../../components/service/ServiceDetailComponent';

const ServiceDetail = props => {

  const { serviceId } = useParams<{serviceId: string}>()
  const { fetchServiceById, isFetching } = props

  useEffect(() => {
    fetchServiceById(serviceId)
  }, [serviceId, fetchServiceById])


  const { service, auth } = props
  const { user } = service

  if (isFetching || serviceId !== service.id) { return <Spinner /> }

  return (
    auth && user ?
    <ServiceDeatilComponent
      auth={auth}
      user={user}
      service={service}
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
