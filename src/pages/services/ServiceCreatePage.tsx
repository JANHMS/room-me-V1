import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createService } from '../../actions'
import { useAuth } from '../../auth'
import CreateServiceComponent from '../../components/service/CreateServiceComponent'

const ServiceCreate: React.FC = () => {
  
  const { userId } = useAuth();

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
    createService(serviceForm, userId)
      .then(() => setRedirect(true))
      .catch(() => alert('SOME ERROR!'))
  }

  if (redirect) { return <Redirect to="/my/entries" />}

  return (
    <CreateServiceComponent 
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  )
}

export default ServiceCreate;