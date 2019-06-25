import { ActionType, getType  } from 'typesafe-actions';
import * as actions from '../actions/transactionActions';
import { Ledger, ListTransactionsResult, Address, Promise, Transaction, PendingResult } from '../utils/types';
import { setInstance, TABLE_DATA_BATCH_LIMIT } from '../utils/constants'
export type Action = ActionType<typeof actions>;

// FILE CONSTANTS:
const DNA_INSTANCE = setInstance();
const TX_ZOME_NAME = 'transactions';

// readonly (- permissioned) keyword causes compiler to error if one attempts to mutate the state
export type State = {
// global identifiers :
  list_of_instance_info: Array<any>,
  list_of_agents: Array<any>,
  my_agent_string: string,
  my_agent_hash: string,
  hf_base_dna_hash: string,

// holofuel specific states :
  ledger_state: Ledger,
  list_of_transactions: ListTransactionsResult,
  list_of_pending:PendingResult,
  list_of_requests: Array<Address>,
  list_of_promises: Array<Address>,
  mostRecentPromiseCommit:Address,
  mostRecentRequestCommit:Address,
  view_specific_request: Transaction, // this include metadata from promise commit hash (ie ZomeApiResult<AppEntryValue>)
  view_specific_promise: Promise, // this include metadata from promise commit hash
  readonly status: string
  //
  refresh: boolean,
  awaitingResponse: boolean,
  agent_id: "",
  agent_profile: {},
};

export type OriginalState = State | undefined;

export const INITIAL_STATE: State = {
  refresh: false,
  agent_id: "",
  agent_profile: {},
  list_of_instance_info: [],
  list_of_agents: [],
  awaitingResponse: false,
  my_agent_string: '',
  mostRecentPromiseCommit:'',
  mostRecentRequestCommit:'',
  my_agent_hash: '',
  hf_base_dna_hash: "QmcYtest",
  ledger_state: {
    balance: null,
    credit: null,
    payable: null,
    receivable: null,
    fees: null
  },
  list_of_pending  : {},
  list_of_transactions: {
    ledger: {
      balance: null,
      credit: null,
      payable: null,
      receivable: null,
      fees: null
    },
    newer: {
      since: "",
      until: "",
      limit: TABLE_DATA_BATCH_LIMIT,
      state: ""
    },
    older: {
      since: "",
      until: "",
      limit: TABLE_DATA_BATCH_LIMIT,
      state: ""
    },
    transactions: [{
        timestamp: {
          event:"", // ** added **
          origin: "" // ** added **
        },
        state: "",
        origin: "",
        event: {
          Request: {
            to: "",
            amount: "",
	    fee: "",
            notes: "",
            deadline: "",
            request: ""
          }
        },
        adjustment: {
          balance: 0,
          payable: 0,
          receivable: 0,
          fees: 0,
          credit: 0 // ** added **
        }
    }]
  },
  list_of_requests: [],
  list_of_promises: [],
  view_specific_request:{
      to: "",
      amount: "",
      fee: "",
      notes: "",
      deadline: ""
  },
  view_specific_promise: {
      from: "",
      request: "",
      tx: {
        to: "",
        amount: "",
	fee: "",
        notes: "",
        deadline: ""
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

  // Profile Update
  case actions.UPDATE_PROFILE: {
    console.log("UPDATE_PROFILE payload: ", payload );
    return { ...state, agent_profile : payload };
  }

  // Profile Update
  case actions.SET_AGENT_ID: {
    console.log("SET_AGENT_ID payload: ", payload );
    return { ...state, agent_id : payload };
  }

  // Reset refresh
  case actions.RESET_REFRESH: {
    console.log("Calling RESET_REFRESH : FALSE ");
    return { ...state, refresh : false };
  }

////////////////////////////////////////////////////////////////////////////
          /* Confirm GLobal App Constants from Container*/
////////////////////////////////////////////////////////////////////////////
  // GET_INFO_INSTANCE
    // Confirm Holofuel Instance Discovery in Container
    case 'info/instances_SUCCESS': {
      // const list_of_installed_instances = JSON.parse(payload);
      return { ...state, list_of_instance_info : payload };
    }

  // GET_AGENT_LIST
    // Confirm Holofuel Instance Discovery in Container
    case 'admin/agent/list_SUCCESS': {
      return { ...state, list_of_agents : payload };
    }

    // FETCH_AGENT_STRING  >> Success message & Result
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/whoami_SUCCESS`: {
      const my_agent_string = payload.agent_id.nick;
      // const my_agent_key = payload.pub_sign_key;
      const my_agent_hash = payload.agent_address;
      const hf_base_dna_hash = payload.dna_address;
      return {
        ...state,
        my_agent_string,
        my_agent_hash,
        hf_base_dna_hash
      };
    }

    // FETCH_AGENT_STRING >> Failure message
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/whoami_FAILURE`: {
      console.log("whoami_FAILURE >> inside reducer");
    }

////////////////////////////////////////////////////////
          /* Reporting Container Transactions */
////////////////////////////////////////////////////////
// View ledger snapshot / transaction history //
  // Call for GET_LEDGER_STATE ()
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/ledger_state_SUCCESS`: {
      return { ...state, ledger_state : payload };
    }

    // LIST_OF_TRANSACTIONS
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_transactions_SUCCESS`: {
      return { ...state, list_of_transactions : payload };
    }

    // LIST_OF_PENDING_TRANSACTIONS
    case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_pending_SUCCESS`: {
      return { ...state, list_of_pending : payload };
    }

// View List of Transaction by Type (Request/Promise) //
   // LIST_REQUESTS ()
   case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_requests_SUCCESS`: {
     return { ...state, list_of_requests : payload };
   }

   // LIST_PROMISES ()
   case `${DNA_INSTANCE}/${TX_ZOME_NAME}/list_promises_SUCCESS`: {
     return { ...state, list_of_promises : payload };
   }

// View Specific Transaction
  // GET_SINGLE_REQUEST_SUCCESS ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/get_request_SUCCESS`: {
    return { ...state, view_specific_request : payload };
  }

  // GET_SINGLE_REQUEST.._FAILURE ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/get_request_FAILURE`: {
    return { ...state };
  }

  // GET_SINGLE_PROMISE ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/get_promise_SUCCESS`: {
    return { ...state, view_specific_promise : payload };
  }

////////////////////////////////////////////////////////
          /* Triggering Transaction Event */
////////////////////////////////////////////////////////

  // Call for REQUEST_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/request_SUCCESS`: {
      return { ...state, mostRecentRequestCommit: payload };
    }

  // Call for REQUEST_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/request_FAILURE`: {
      return { ...state };
    }

  //////////////////////////////////////////////////////////////
  // Spinner Reducer Logic :
    case getType(actions.PromiseAsyncAction.request):
    return { ...state, awaitingResponse: true}
//////////////////////////////////////////////////////////////

  // Call for PROMISE_PAYMENT_SUCCESS ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/promise_SUCCESS`: {
      return { ...state };
    }

    // Call for PROMISE_PAYMENT_FAILURE ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/promise_FAILURE`: {
        return { ...state };
      }

  //////////////////////////////////////////////////////////////
  // Spinner Reducer Logic :
    case getType(actions.ReceivePaymentAsyncAction.request):
    return { ...state, awaitingResponse: true}
//////////////////////////////////////////////////////////////

  // Call for RECEIVE_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/receive_payment_SUCCESS`: {
      return { ...state, mostRecentPromiseCommit: payload };
    }

  // Call for REJECT_PAYMENT ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/reject_payment_SUCCESS`: {
      return { ...state };
    }

  // Call for PAY_REQUEST ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/pay_request_SUCCESS`: {
      return { ...state };
    }

  // Call for DECLINE_REQUEST ()
  case `${DNA_INSTANCE}/${TX_ZOME_NAME}/decline_request_SUCCESS`: {
      return { ...state };
    }

    // DEFAULT  --> RETURN STATE
    default:
      return state;
  }
}
export default transactionReducer;
