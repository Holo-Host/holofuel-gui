import * as React from 'react';
import {  mount, ReactWrapper, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as constants from '../../../utils/seed-data/mock-data';
import TransactionOverview, { Props } from './TransactionOverview'; // { TransactionOverviewBase }
// import { TransactionOverview as TransactionOverviewType } from '../../types/TransactionOverview';
// import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
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
        list_of_instance_info: constants.instanceListData,
        list_of_transactions: constants.processedData,
        get_info_instances: mockPromise,
        list_transactions: mockPromise
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
