import {MOCK_AGENT_ADDRESS} from './agent_address_store';
import {list_of_requests} from './list_requests';
import {get_request_kv_store} from './get_request';
import {get_proposal_kv_store} from './get_proposal';
import {list_of_proposals} from './list_proposals';
import {list_of_proposal_transactions} from "./list-of-transactions-w-proposal-event";
import {list_of_request_transactions} from "./list-of-transactions-w-request-event";
// import { ListTransactionsResult } from "./list-of-transations-w-proposal-event";

export const ledger = {
  balance: 200,
  credit: 80,
  payable: 20,
  receivable: 40
}

export const instanceListData = [
  { id: 'app spec instance 2', dna: 'app spec rust', agent: 'test agent 2' },
  { id: 'app spec instance 1', dna: 'app spec rust', agent: 'test agent 1' }
];


// import { combineReducers } from 'redux';
const createMockApiData = {
  MOCK_AGENT_ADDRESS,
  list_of_requests,
  list_of_proposals,
  get_request_kv_store,
  get_proposal_kv_store,
  list_of_proposal_transactions,
  list_of_request_transactions
};

export default createMockApiData;
