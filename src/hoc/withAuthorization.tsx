import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const withAuthorization = ({
  auth,
  props
}) => {
  const WithAuthorization = (): JSX.Element => {  
    return auth.isAuth ? <Component {...props} /> : <Redirect to="/" />   
    }
  return connect(({auth}) => ({auth}))(WithAuthorization)
}


export default withAuthorization
