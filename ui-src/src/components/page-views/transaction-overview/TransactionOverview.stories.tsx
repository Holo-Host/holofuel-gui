import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
// import { Ledger, ListTransactionsResult } from '../../../utils/types';
import createMockApiData, {
  ledger,
  instanceListData
} from '../../../utils/seed-data/mock-api-data';
// import { action } from '@storybook/addon-actions';
// import { withNotes } from '@storybook/addon-notes';
import { specs } from 'storybook-addon-specifications';
import TransactionOverview, { Props } from './TransactionOverview';
import { TransactionOverviewTests } from './TransactionOverview.test';

const mockPromise = jest.fn(() => Promise.reject(''));
storiesOf('TransactionOverview', module)
  .add('Component Overview', () => {
    specs(() => TransactionOverviewTests);

    let props: Props;
    props = {
      // mapStateToProps props
        ledger_state: ledger,
        list_of_instance_info: instanceListData,
        list_of_transactions: createMockApiData.list_of_request_transactions,
        list_of_requests: createMockApiData.list_of_requests,
        list_of_proposals: createMockApiData.list_of_proposals,
        view_specific_request: createMockApiData.get_request_kv_store[0],
        view_specific_proposal: createMockApiData.get_proposal_kv_store[0],
      // mapDispatchToProps props
        get_info_instances: mockPromise,
        get_ledger_state: mockPromise,
        list_transactions: mockPromise,
        list_requests: mockPromise,
        list_proposals: mockPromise,
        get_single_request: mockPromise,
        get_single_proposal: mockPromise,
        request_payment: mockPromise,
        propose_payment: mockPromise,
        receive_payment: mockPromise
    };
    return (<MemoryRouter initialEntries={['/']}><TransactionOverview {...props} /></MemoryRouter>);
  });
