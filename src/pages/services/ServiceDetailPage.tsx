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
    console.log(service)
  }, [serviceId, fetchServiceById])


  const { service, auth } = props
  const { user } = service

  if (isFetching) { return <Spinner /> }

  return (
    <ServiceDeatilComponent
      auth={auth}
      user={user}
      service={service}
    />
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