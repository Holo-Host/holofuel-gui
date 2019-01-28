import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import * as constants from '../../../utils/seed-data/mock-data';
// import { action } from '@storybook/addon-actions'
import { specs } from 'storybook-addon-specifications';
// import { withNotes } from '@storybook/addon-notes'
import TransactionOverview, { Props } from './TransactionOverview';
import { TransactionOverviewTests } from './TransactionOverview.test';

const mockPromise = jest.fn(() => Promise.reject(''));

storiesOf('TransactionOverview', module)
  .add('Component Overview', () => {
    specs(() => TransactionOverviewTests);

    let props: Props;
    props = {
      list_of_instance_info: constants.instanceListData,
      list_of_transactions: constants.processedData,
      get_info_instances: mockPromise,
      list_transactions: mockPromise
    };

    return <MemoryRouter initialEntries={['/']}><TransactionOverview {...props} /></MemoryRouter>;
  });
