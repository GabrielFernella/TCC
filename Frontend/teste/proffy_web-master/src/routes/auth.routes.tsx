import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Notify from '../pages/Notify'
import ResetPassword from '../pages/ResetPassword'
import ValidateAccount from "../pages/ValidateAccount";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
      <Route path="/validate-account" exact component={ValidateAccount} />
      <Route path="/notify" component={Notify} />
    </BrowserRouter>
  )
}

export default AuthRoutes
