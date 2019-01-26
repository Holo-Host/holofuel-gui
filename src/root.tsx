import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TransactionOverview from './components/page-views/transaction-overview/TransactionOverview';

import TestApp from './components/page-views/main-transactions-summary/TransactionsSummary';

const Root = ({ store }: {store: Store}) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={TransactionOverview} />
      <Route path='/testapp' component={TestApp} />
    </Router>
  </Provider>
);

export default Root;
