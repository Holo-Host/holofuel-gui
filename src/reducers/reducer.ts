import { ActionType } from 'typesafe-actions';
import * as actions from '../actions/transactionActions';

export type Action = ActionType<typeof actions>;

// readonly (- permissioned) keyword causes compiler to error if one attempts to mutate the state
export type State = {
  list_of_instance_info: Array<any>,
  list_of_transactions: Array<any>,
  readonly status: string
};

export const INITIAL_STATE: State = {
  list_of_instance_info: [],
  list_of_transactions: [],
  status: 'default'
};

export function reducer (state: State = INITIAL_STATE, action: Action) {
  const { type, payload } = action;

  switch (type) {
  // STATE CHECK
    // case actions.FETCH_STATE: {
    //   return { ...state };
    // }

  // GET_INFO_INSTANCE
    case 'GET_INFO_INSTANCES_SUCCESS': {
      console.log("GET_INFO_INSTANCES_SUCCESS payload", payload);
      // const list_of_installed_instances = JSON.parse(payload);
      // console.log("Parsed REDUCER VERSION OF >>>> info_instances <<<<<", list_of_installed_instances);
      return { ...state, list_of_instance_info : payload };
    }

  // LIST_OF_TRANSACTIONS
    case 'LIST_OF_TRANSACTIONS_SUCCESS': {
      console.log("LIST_OF_TRANSACTIONS_SUCCESS state", payload);
      return { ...state, list_of_transactions : payload };
    }
    case 'LIST_OF_TRANSACTIONS_FAILURE': {
      console.log("LIST_OF_TRANSACTIONS_FAILURE state", payload);
      return { ...state};
    }

    // DEFAULT  --> RETURN STATE
    default:
      return state;
  }
}
