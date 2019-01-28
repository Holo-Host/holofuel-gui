
import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';
// import { INITIAL_STATE } from '../reducers/reducer'
// const info_instances = INITIAL_STATE.list_of_instance_info;

// export const FETCH_STATE = 'FETCH_STATE';
/////////////////////////////////////////////////////////////////////////////////////////

                          /*  Available APIs  */
// -----------------------------------------------------------------------------
// [x]  info/instances()
// [ ]  happ/zome/main/ list_transactions(since_date, until_date)
// [ ]  happ/zome/main/ request_payment(spender_id, transaction_id)
// [ ]  happ/zome/main/ list_pending()

                          /*  Pending APIs  */
// ----------------------------------------------------------------------------------
// [ ]  happ/zome/main/ receive_payment({proposal_obj})
// [ ]  happ/zome/main/ reject_payment({proposal_obj})
// [ ]  happ/zome/main/ pay_request({request_obj})
// [ ]  happ/zome/main/ decline_request({request_obj})

/////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
    /* Reporting Container DNAs/DNA-instances */
////////////////////////////////////////////////////////
// Call for GET_INFO_INSTANCES ()
// This is to retreive the DNA Instance Hash of the HC-Rust holofuel app
//  for the remaining API calls using the Rust Conainter, RPC Websockets,
//  and redux-hc-middleware..
export const GetInfoInstancesAsyncAction = createHolochainAsyncAction<{}, Array<any>>('info', 'instances');

export function get_info_instances () {
  return {
    type: 'GET_INFO_INSTANCES',
    payload: [],
    meta: {
    	holochainAction: true,
    	callString: 'info/instances'
    }
  };
}

// Call for LIST_OF_TRANSACTIONS ()
export const TransactionListAsyncAction = createHolochainAsyncAction<{}, Array<any>>('holofuel-instance', 'transactions', 'list_transactions');

export function list_transactions () {
  console.log('>>LIST_TRANSACTIONS() invoked <<');
  return {
    type: 'LIST_OF_TRANSACTIONS',
    payload: {},
    meta: {
      holochainAction: true,
      callString: TransactionListAsyncAction
    }
  };
}

// // STATE CHECK
// export function fetch_state () {
//   return {
//     type: FETCH_STATE
//   };
// }
