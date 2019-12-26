import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import { ToastContainer, Slide } from 'react-toastify';
import { HomePage } from 'features/Home';
import { Operators, RefillBalance } from 'features/Payment';
import { StringIndex } from 'features/Refactor';
import { AppLayout } from 'ui/templates';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <ToastContainer
      closeOnClick={false}
      draggable={false}
      position="bottom-center"
      transition={Slide}
    />
    <Switch>
      <Route
        exact
        path="/"
        component={HomePage}
      />
      <Route
        path="/refactor"
        render={() => (
          <AppLayout>
            <Route
              path="/refactor"
              component={StringIndex}
            />
          </AppLayout>
        )}
      />
      <Route
        path="/payment"
        render={() => (
          <AppLayout>
            <Route
              exact
              path="/payment"
              component={Operators}
            />
            <Route
              path="/payment/:operatorName"
              component={RefillBalance}
            />
          </AppLayout>
        )}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
