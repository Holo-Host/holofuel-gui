import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';
// export const FETCH_STATE = 'FETCH_STATE';
// FILE CONSTANTS:
const DNA_INSTANCE = 'holofuel_pagination.hcpkg instance';
const TX_ZOME_NAME = 'transactions';

////////////////////////////////////////////////////////////////////////////
                    /* Verfiy State - TESTING */
////////////////////////////////////////////////////////////////////////////
// // STATE CHECK
// export function fetch_state () {
//   return {
//     type: FETCH_STATE
//   };
// }

////////////////////////////////////////////////////////
          /* Agent and Instance Discovery  */
////////////////////////////////////////////////////////
// Call for FETCH_AGENT_HASH ()
// export const FetchtAgentHashAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami_hash');

// Call for FETCH_AGENT_STRING ()
export const FetchAgentStringAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami');

// Call for GET_AGENT_LIST ()
// This is to retreive the list of agent Hashes/IDs
export const GetAgentListAsyncAction = createHolochainAsyncAction<{}, Array<any>>('admin', 'agent', 'list');

////////////////////////////////////////////////////////////////////////////
        /* Confirm Holofuel Instance Discovery in Container */
////////////////////////////////////////////////////////////////////////////
// Call for GET_INFO_INSTANCES ()
// This is to retreive the DNA Instance Hash of the HC-Rust holofuel app
//  for the remaining API calls using the Rust Conainter, RPC Websockets,
//  and redux-hc-middleware..
export const GetInfoInstancesAsyncAction = createHolochainAsyncAction<{}, Array<any>>('info', 'instances');
// export function get_info_instances () {
//   return {
//     type: 'GET_INFO_INSTANCES',
//     payload: [],
//     meta: {
//     	holochainAction: true,
//     	callString: 'info/instances'
//     }
//   };
// }

////////////////////////////////////////////////////////
            /* Reporting Transactions */
////////////////////////////////////////////////////////
// Call for GET_LEDGER_STATE ()
export const LedgerStateAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'ledger_state');

// Call for LIST_OF_TRANSACTIONS ()
// Action API Body Call Reference: (Legacy Method Call)
// export function list_transactions () {
//   console.log('>>LIST_TRANSACTIONS() invoked <<');
//   return {
//     type: 'LIST_OF_TRANSACTIONS',
//     payload: {},
//     meta: {
//       holochainAction: true,
//       callString: 'holofuel_pagination.hcpkg instance', 'transactions', 'list_transactions'
//     }
//   };
// }

export const TransactionListAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_transactions');

////////////////////////////////////////////////////////
          /* Triggering Transaction Event */
////////////////////////////////////////////////////////

// Call for REQUEST_PAYMENT ()
export const RequestPaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'request');

// Call for PROPOSE_PAYMENT ()
export const ProposalAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'proposal');

// Call for RECEIVE_PAYMENT ()
export const ReceivePaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'receive_payment');

// Call for REJECT_PAYMENT ()
export const RejectPaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'reject_payment');

// Call for PAY_REQUEST ()
export const PayRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'pay_request');

// Call for DECLINE_REQUEST ()
export const DeclineRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'decline_request');

// Call for LIST_REQUESTS ()
export const ListRequestsAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_requests');

// Call for LIST_PROPOSALS ()
export const ListProposalsAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_proposals');

// Call for GET_SINGLE_REQUEST ()
export const GetRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_request');

// Call for GET_SINGLE_PROPOSAL ()
export const GetProposalAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_proposal');
