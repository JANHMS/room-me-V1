import { 
  FETCH_SERVICES_SUCCESS, 
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  FETCH_USER_SERVICES_SUCCESS } from '../types'

import * as api from '../api';
import { firestore } from '../firebase';

export const fetchServices = () => dispatch =>
   api
    .fetchServices()
    .then(services => dispatch(
      {
        type: FETCH_SERVICES_SUCCESS,
        services
      }
    )
  )

export const fetchUserServices = userId => dispatch => 
   api.fetchUserServices(userId).then(services =>
     dispatch({type: FETCH_USER_SERVICES_SUCCESS, services}))


export const fetchServiceById = serviceId => (dispatch, getState) => {
  const lastService = getState().selectedService.item
  if (lastService.id && lastService.id === serviceId) { return Promise.resolve() }

  dispatch({type: REQUEST_SERVICE})
  return api
    .fetchServiceById(serviceId)
    .then(async (service: any) => {
    
      const user = await api.getUserProfile(service.userId)
      console.log("This is the user", user)
      // const user = await service.user.get()
      // service.user = user.data()
      // service.user.id = user.id

      dispatch({type: FETCH_SERVICE_SUCCESS, service}
    )}
  )
}

export const createService = (newService, userId) => {
  newService.price = parseInt(newService.price, 10)
  newService.user = api.createRef('profiles', userId)

  return api.createService(newService)
}