import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotFound } from 'components/core';
import { PrivateRoute } from 'components/common';
import * as Pages from '../pages/index';

export const router = () => (
  <Switch>
    <Route exact path="/" component={() => (<Redirect to="/home" />)} />
    <Route path="/home" component={Pages.Home} name="home" />
    <Route path="/login" component={Pages.Login} name="login" />
    <Route path="/password-reset" component={Pages.ResetPassword} />
    <Route path="/sign-up" component={Pages.SignUp} />
    <PrivateRoute path="/customer/:id" component={Pages.CustomerProfile} name="customer" />
    <PrivateRoute exact path="/customers" component={Pages.CustomerIndex} name="customers" />
    <PrivateRoute exact path="/settings" component={Pages.UserSettings} name="settings" />
    <Route component={NotFound} />
  </Switch>
);

export default router;
