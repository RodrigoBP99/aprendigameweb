import React from 'react';

import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from '../views/login';
import Home from '../views/home';
import TeacherRegister from '../views/teacherRegister';
import ConsultCourseClass from '../views/courseClass/consultCourseClass';
import RegisterCourseClass from '../views/courseClass/registreCourseClass';

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/teacher-register" component={TeacherRegister} />
        <Route path="/consult-classes" component={ConsultCourseClass} />
        <Route path="/register-class" component={RegisterCourseClass} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
