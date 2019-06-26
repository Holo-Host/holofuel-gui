import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';
import * as RP from 'redux-persist/integration/react'
import HoloFuelAppContainer from './containers/HoloFuelAppContainer';

// export type ReduxStore = Store | null;
const { PersistGate } = RP;

const Root = ({ store, history, persistor }: { store: Store, history: any, persistor:any }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Redirect exact path='/' to='holofuelsummary' />
          <Route path = '/holofuelsummary' component={HoloFuelAppContainer} />
          <Route path = '/holofuelpromise' component={HoloFuelAppContainer} />
          <Route path = '/holofuelrequest' component={HoloFuelAppContainer} />
          <Route path = '/holofueltransactiondetails' component={HoloFuelAppContainer} />
          <Route path = '/profile' component={HoloFuelAppContainer} />
          <Route path = '/success' component={HoloFuelAppContainer} />
          <Route path = '/settings' component={HoloFuelAppContainer} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
