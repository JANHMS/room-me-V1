import React, { useState } from 'react'
import withAuthorization from '../../hoc/withAuthorization'
import { Redirect } from 'react-router-dom'
import CreateServiceComponent from "../../components/service/CreateServiceComponent"

import { createService } from '../../actions'


const ServiceCreate = ({auth}) => {

  const [ redirect, setRedirect ] = useState(false)
  const [ serviceForm, setServiceForm ] = useState({
    category: 'mathematics',
    title: '',
    description: '',
    image: '',
    price: null
  })

  const handleChange = e => {
    const { name, value } = e.target
    setServiceForm({...serviceForm, [name]: value})
  }

  const handleSubmit = () => {
    const { user } = auth
    createService(serviceForm, user.uid)
      .then(() => setRedirect(true))
      .catch(() => alert('SOME ERROR!'))
  }

  if (redirect) { return <Redirect to="/" />}

  return (
    <CreateServiceComponent
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      auth={auth}
    />
  )
}

export default ServiceCreate;
