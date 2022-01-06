import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { authenticationService } from '../services/authentication.service'


const PrivateRoute = ({ children }) => {
    return authenticationService.isAuthenticated ? children : <Navigate to="/login" />;
  }

export default PrivateRoute
