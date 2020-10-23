import React from 'react';

import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from '../views/login';
import TeacherRegister from '../views/teacherRegister';

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="teacher-register" component={TeacherRegister} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
