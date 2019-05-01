import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';
import HoloFuelAppContainer from './containers/HoloFuelAppContainer';

// export type ReduxStore = Store | null;

const Root = ({ store, history }: { store: Store, history: any }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact path='/' to='holofuelsummary' />
        <Route path = '/holofuelsummary' component={HoloFuelAppContainer} />
        <Route path = '/holofuelpromise' component={HoloFuelAppContainer} />
        <Route path = '/holofuelrequest' component={HoloFuelAppContainer} />
        <Route path = '/holofueltransactiondetails' component={HoloFuelAppContainer} />
        <Route path = '/profile' component={HoloFuelAppContainer} />
        <Route path = '/settings' component={HoloFuelAppContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;
