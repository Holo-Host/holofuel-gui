import { createHolochainZomeCallAsyncAction, createHolochainAdminAsyncAction } from '@holochain/hc-redux-middleware';
// export const FETCH_STATE = 'FETCH_STATE';
export const UPDATE_PROFILE= 'UPDATE_PROFILE';
export const RESET_REFRESH = 'RESET_REFRESH';
export const SET_AGENT_ID= 'SET_AGENT_ID';
// FILE CONSTANTS:
import { setInstance } from '../utils/constants'
// const DNA_INSTANCE = 'holofuel instance';
const TX_ZOME_NAME = 'transactions';
const DNA_INSTANCE = setInstance();
////////////////////////////////////////////////////////////////////////////
                    /* Verfiy State - TESTING */
////////////////////////////////////////////////////////////////////////////
// // STATE CHECK
// export function fetch_state () {
//   return {
//     type: FETCH_STATE
//   };
// }

// Call for in-app UPDATE_PROFILE
export function UpdateProfile (payload:any) {
  return {
    type: UPDATE_PROFILE,
    payload
  };
}

export function SetAgentId (payload:any) {
  return {
    type: SET_AGENT_ID,
    payload
  };
}

// Call for in-app RESET_REFRESH
export function ResetRefresh () {
  return {
    type: RESET_REFRESH
  };
}

////////////////////////////////////////////////////////
          /* Agent and Instance Discovery  */
////////////////////////////////////////////////////////
// Call for FETCH_AGENT_HASH ()
// export const FetchtAgentHashAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami_hash');

// Call for FETCH_AGENT_STRING ()
export const FetchAgentStringAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami');

// Call for GET_AGENT_LIST ()
// This is to retreive the list of agent Hashes/IDs
export const GetAgentListAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>('admin', 'agent', 'list');

////////////////////////////////////////////////////////////////////////////
        /* Confirm Holofuel Instance Discovery in Container */
////////////////////////////////////////////////////////////////////////////
// Call for GET_INFO_INSTANCES ()
// This is to retreive the DNA Instance Hash of the HC-Rust holofuel app
//  for the remaining API calls using the Rust Conainter, RPC Websockets,
//  and redux-hc-middleware..
export const GetInfoInstancesAsyncAction = createHolochainAdminAsyncAction<{}, Array<any>>('info', 'instances');

////////////////////////////////////////////////////////
            /* Reporting Transactions */
////////////////////////////////////////////////////////
// Call for GET_LEDGER_STATE ()
export const LedgerStateAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'ledger_state');

// This will return a client's self-initiated transactions ONLY
export const TransactionListAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_transactions');

// This will return ONLY those transactions (requests/promises/refunds) that are not yet converted to transactions, ie. only the initating party has made a transaction and has mentioned the current user as the counterparty, yet the current user still has yet to engage in the transaction...
export const PendingListAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_pending');

////////////////////////////////////////////////////////
          /* Triggering Transaction Event */
////////////////////////////////////////////////////////

// Call for REQUEST_PAYMENT ()
export const RequestPaymentAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'request');

// Call for PROMISE_PAYMENT ()
export const PromiseAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'promise');

// Call for RECEIVE_PAYMENT ()
export const ReceivePaymentAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'receive_payment');

// Call for REJECT_PAYMENT ()
export const RejectPaymentAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'reject_payment');

// Call for PAY_REQUEST ()
export const PayRequestAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'pay_request');

// Call for DECLINE_REQUEST ()
export const DeclineRequestAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'decline_request');

// Call for LIST_REQUESTS ()
export const ListRequestsAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_requests');

// Call for LIST_PROMISES ()
export const ListPromisesAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_promises');

// Call for GET_SINGLE_REQUEST ()
export const GetRequestAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_request');

// Call for GET_SINGLE_PROMISE ()
export const GetPromiseAsyncAction = createHolochainZomeCallAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_promise');
