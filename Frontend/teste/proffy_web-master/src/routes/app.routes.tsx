import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import TeacherList from '../pages/Study'
import GiveClasses from '../pages/GiveClasses'
import Notify from '../pages/Notify'
import TeacherProfile from '../pages/Profile'


function AppRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={GiveClasses} />
      <Route path="/profile" component={TeacherProfile} />
      <Route path="/notify" component={Notify} />
      {/*<Redirect path="*" to="/" />*/}

    </BrowserRouter>
  )
}

export default AppRoutes
