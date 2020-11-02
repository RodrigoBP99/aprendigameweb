import React from 'react';

import Login from '../views/login';
import Home from '../views/home';
import TeacherRegister from '../views/teacherRegister';
import ConsultCourseUnit from '../views/courseUnit/consultCourseUnit';
import ConsultCourseClass from '../views/courseClass/consultCourseClass';
import RegisterCourseClass from '../views/courseClass/registreCourseClass';
import { AuthConsumer } from './authenticationProvider';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

function AuthenticateRoute({
  component: Component,
  isUserAuthenticated,
  ...props
}) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUserAuthenticated) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function Routes(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/teacher-register" component={TeacherRegister} />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/home"
          component={Home}
        />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/consult-classes"
          component={ConsultCourseClass}
        />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/register-class/:id?"
          component={RegisterCourseClass}
        />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/consult-course"
          component={ConsultCourseUnit}
        />
      </Switch>
    </HashRouter>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => <Routes isUserAuthenticated={context.isAuthenticated} />}
  </AuthConsumer>
);
