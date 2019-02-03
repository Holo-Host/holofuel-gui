import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux'
import {  mount, ReactWrapper, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import createMockApiData, {
  ledger,
  instanceListData,
} from '../../../utils/seed-data/mock-api-data';
// import { Ledger, ListTransactionsResult } from '../../../utils/types';
import TransactionOverview, { Props } from './TransactionOverview'; // { TransactionOverviewBase }


configure({ adapter: new Adapter() });
// import CreateStore from '../../../../store'
// let store = CreateStore()
export const TransactionOverviewTests = describe('', () => {
  let props: Props;
  let mountedTransactionOverviewComponent: ReactWrapper<Props, {}> | undefined;

  const transactionOverviewComponent = () => {
    if (!mountedTransactionOverviewComponent) {
      mountedTransactionOverviewComponent = mount(<MemoryRouter initialEntries={['/']}><TransactionOverview {...props}/></MemoryRouter>);
    }
    return mountedTransactionOverviewComponent;
  };

  beforeEach(() => {
    mountedTransactionOverviewComponent = undefined;
  });

  // const mockFn = jest.fn();
  const mockPromise = jest.fn(() => Promise.reject('TransactionOverview test mockPromise'));

  it('Clicking Visit Test App fires the link progression event', () => {
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
        receive_payment: mockPromise // ,
        // selectedTransaction: constants.processedData[0],
      };
      transactionOverviewComponent().find('Button').simulate('click');
      expect(props.list_of_transactions).toBeCalled();
    });

    // it('Check getDerivedStateFromProps returns null when props are not updated by component', () => {
    //   props = {
    //     list_of_instance_info:{[]},
    //     list_of_transactions: constants.processedData,
    //     get_info_instances: mockPromise,
    //     list_transactions: mockPromise
    //   };
    //   const prevState = {
    //     profile: {}
    //   };
    //   // @ts-ignore
    //   let newState = TransactionOverviewBase.getDerivedStateFromProps(props, prevState);
    //   expect(newState).toEqual(null);
    // })
    //
    // it('Check getDerivedStateFromProps returns correct state update when props are updated by component', () => {
    //   props = {
    //     list_of_instance_info:{[]},
    //     list_of_transactions: constants.processedData,
    //     get_info_instances: mockPromise,
    //     list_transactions: mockPromise
    //   };
    //   const prevState = {
    //     profile: {}
    //   };
    //   // @ts-ignore
    //   let newState = TransactionOverviewBase.getDerivedStateFromProps(props, prevState);
    //   expect(newState).toEqual(null);
    // })
};
)
