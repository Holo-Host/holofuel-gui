import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
// import TransactionOverviewContainer from './containers/TransactionOverviewContainer';
import HoloFuelAppContainer from './containers/HoloFuelAppContainer';

import BankViewAppContainer from './containers/BankViewAppContainer';

const Root = ({ store, history }: { store: Store, history: any }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/bankstyleapp' component={BankViewAppContainer} />
        <Route path='/holofuelsummary' component={HoloFuelAppContainer} />
        <Route path = '/holofuelrequest' component={HoloFuelAppContainer} />
        <Route path = '/about' component={HoloFuelAppContainer} />
        <Route path = '/holofueltransactiondetails' component={HoloFuelAppContainer} />
        <Route path='/' component={HoloFuelAppContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;
// <Route path='/' component={TransactionOverviewContainer} />
