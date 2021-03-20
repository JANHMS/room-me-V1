import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { createService } from '../../actions'
import { useAuth } from '../../auth'
import CreateServiceComponent from '../../components/service/CreateServiceComponent'
import { toast } from '../../toast'

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
      .catch(() => toast('SOME ERROR!'))
  }

  if (redirect) {
    toast("Sucessfully created")
    return <Redirect to="/my/entries" />
  }

  return (
    <CreateServiceComponent 
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  )
}

export default ServiceCreate;