import { ActionType } from 'typesafe-actions';
import * as actions from '../actions/transactionActions';
import { Ledger, ListTransactionsResult, Address } from '../utils/types';
import createMockApiData from '../utils/seed-data/mock-api-data';

export type Action = ActionType<typeof actions>;

// FILE CONSTANTS:
const DNA_INSTANCE = 'holofuel_pagination.hcpkg instance';
const TX_ZOME_NAME = 'transactions';
const TX_BATCH_VIEW_AMOUNT = 50;


// readonly (- permissioned) keyword causes compiler to error if one attempts to mutate the state
export type State = {
  list_of_instance_info: Array<any>,
  ledger_state: Ledger,
  list_of_transactions: ListTransactionsResult,
  list_of_requests: Array<Address>,
  list_of_proposals: Array<Address>,
  view_specific_request: typeof createMockApiData.get_request_kv_store[0], // this include metadata from propsal commit hash (ie ZomeApiResult<AppEntryValue>)
  view_specific_proposal: typeof createMockApiData.get_proposal_kv_store[0], // this include metadata from propsal commit hash
  readonly status: string
};

export type OriginalState = State | undefined;

export const INITIAL_STATE: State = {
  list_of_instance_info: [],
  ledger_state: {
    balance: null,
    credit: null,
    payable: null,
    receivable: null
  },
  list_of_transactions: {
    ledger: {
      balance: null,
      credit: null,
      payable: null,
      receivable: null
    },
    next: {
      since: "",
      until: "",
      limit: TX_BATCH_VIEW_AMOUNT,
      state: ""
    },
    over: {
      first: 0,
      count: 0,
      total: 0
    },
    transactions: [{
        timestamp: "",
        state: "",
        origin: "",
        event: {
          Request: {
            to: "",
            amount: "",
            notes: "",
            deadline: "",
            request: ""
          }
        },
        adjustment: {
          balance: 0,
          payable: 0,
          receivable: 0
        }
    }]
  },
  list_of_requests: [],
  list_of_proposals: [],
  view_specific_request:{
    "134dFh8vfhhVGjsS8QoarGjfaJa5XPQDpY" : {
      to: "",
      amount: "",
      notes: "",
      deadline: ""
    }
  },
  view_specific_proposal: {
    "1BFe7xaqCh2gHf94AC5xmH6ooShbRy4vC" : {
      from: "",
      proposal_sig: "",
      tx: {
        to: "",
        amount: "",
        notes: "",
        deadline: ""
      },
      request: ""
    }
  },
  status: 'default'
};

export function transactionReducer (state: OriginalState = INITIAL_STATE, action: Action) {
  const { type, payload } = action;

  switch (type) {
////////////////////////////////////////////////////////////////////////////
                      /* Verfiy State - TESTING */
////////////////////////////////////////////////////////////////////////////
  // STATE CHECK
    // case actions.FETCH_STATE: {
    //   return { ...state };
    // }

////////////////////////////////////////////////////////////////////////////
          /* Confirm Holofuel Instance Discovery in Container */
////////////////////////////////////////////////////////////////////////////
  // GET_INFO_INSTANCE
    case 'info/instances_SUCCESS': {
      console.log('GET_INFO_INSTANCES_SUCCESS payload', payload);
      // const list_of_installed_instances = JSON.parse(payload);
      // console.log("Parsed REDUCER VERSION OF >>>> info_instances <<<<<", list_of_installed_instances);
      return { ...state, list_of_instance_info : payload };
    }

////////////////////////////////////////////////////////
          /* Reporting Container Transactions */
////////////////////////////////////////////////////////
// View ledger snapshot / transaction history //
  // Call for GET_LEDGER_STATE ()
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/ledger_state_SUCCESS`: {
      console.log('GET_LEDGER_STATE payload', payload);
      return { ...state, ledger_state : payload };
    }

    // LIST_OF_TRANSACTIONS
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_transactions_SUCCESS`: {
      console.log('LIST_OF_TRANSACTIONS_SUCCESS state', payload);
      return { ...state, list_of_transactions : payload };
    }

// View List of Transaction by Type (Request/Proposal) //
   // LIST_REQUESTS ()
   case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_requests_SUCCESS`: {
     console.log('LIST_REQUESTS_SUCCESS state', payload);
     return { ...state, list_of_requests : payload };
   }

   // LIST_PROPOSALS ()
   case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_proposals_SUCCESS`: {
     console.log('LIST_PROPOSALS_SUCCESS state', payload);
     return { ...state, list_of_proposals : payload };
   }

// View Specific Transaction
  // GET_SINGLE_REQUEST ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/get_request_SUCCESS`: {
    console.log('GET_SINGLE_REQUEST_SUCCESS state', payload);
    return { ...state, view_specific_request : payload };
  }

  // GET_SINGLE_PROPOSAL ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/get_proposal_SUCCESS`: {
    console.log('GET_SINGLE_PROPOSAL_SUCCESS state', payload);
    return { ...state, view_specific_proposal : payload };
  }

////////////////////////////////////////////////////////
          /* Triggering Transaction Event */
////////////////////////////////////////////////////////

  // Call for REQUEST_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/request_SUCCESS`: {
      console.log('REQUEST_PAYMENT (REQEUST) payload', payload);
      return { ...state };
    }

  // Call for PROPOSE_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/proposal_SUCCESS`: {
      console.log('PROPOSE_PAYMENT (PROPOSAL) payload', payload);
      return { ...state };
    }

  // Call for RECEIVE_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/receive_payment_SUCCESS`: {
      console.log('RECEIVE_PAYMENT payload', payload);
      return { ...state };
    }

  // Call for REJECT_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/reject_payment_SUCCESS`: {
      console.log('REJECT_PAYMENT (REQEUST) payload', payload);
      return { ...state };
    }

  // Call for PAY_REQUEST ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/pay_request_SUCCESS`: {
      console.log('PAY_REQUEST payload', payload);
      return { ...state };
    }

  // Call for DECLINE_REQUEST ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/decline_request_SUCCESS`: {
      console.log('DECLINE_REQUEST payload', payload);
      return { ...state };
    }

    // DEFAULT  --> RETURN STATE
    default:
      return state;
  }
}
export default transactionReducer;
