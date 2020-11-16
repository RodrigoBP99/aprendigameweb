import React from 'react';

import Login from '../views/login';
import Home from '../views/home';
import TeacherRegister from '../views/teacher/teacherRegister';
import ConsultCourseUnit from '../views/courseUnit/consultCourseUnit';
import RegisterCourseUnit from '../views/courseUnit/registerCourseUnit';
import ConsultCourseClass from '../views/courseClass/consultCourseClass';
import RegisterCourseClass from '../views/courseClass/registerCourseClass';
import CourseClass from '../views/courseClass/courseClass';
import CourseUnit from '../views/courseUnit/courseUnit';
import RegisterQuizz from '../views/quizz/registerQuizz';
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
                pathname: '/',
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
        <Route path="/" exact component={Login} />
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
          path="/courseClass/:id"
          component={CourseClass}
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
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/courseUnit/:id"
          component={CourseUnit}
        />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/register-course/:id?"
          component={RegisterCourseUnit}
        />
        <AuthenticateRoute
          isUserAuthenticated={props.isUserAuthenticated}
          path="/register-quizz/:id?"
          component={RegisterQuizz}
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
