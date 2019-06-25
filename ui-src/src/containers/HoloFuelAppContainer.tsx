import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// actions, reducers, & utils imports :
import {
GetInfoInstancesAsyncAction,
GetAgentListAsyncAction,
FetchAgentStringAsyncAction,
// FetchAgentHashAsyncAction,
TransactionListAsyncAction,
PendingListAsyncAction,
LedgerStateAsyncAction,
ListRequestsAsyncAction,
ListPromisesAsyncAction,
GetRequestAsyncAction,
GetPromiseAsyncAction,
RequestPaymentAsyncAction,
// PayRequestAsyncAction,
// DeclineRequestAsyncAction,
PromiseAsyncAction,
ReceivePaymentAsyncAction,
// RejectPaymentAsyncAction
SetAgentId,
ResetRefresh,
UpdateProfile
} from '../actions/transactionActions';

import HoloFuelAppRouterContainer, { StateProps, DispatchProps } from './HoloFuelAppRouterContainer';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  staticContext: any,
  className: any,
  classes: any,
  history: any
}
export type Props = OwnProps & StateProps & DispatchProps;

class HoloFuelAppContainer extends React.Component<Props> {
  constructor(props:Props){
    super(props);
  };

  public render() {
    return (
      <HoloFuelAppRouterContainer {...this.props}/>
    )
  }
}

const mapStateToProps = ({ transactionReducer }: any): StateProps => {
  return {
// global identifiers :
  list_of_instance_info: transactionReducer.list_of_instance_info,
  list_of_agents: transactionReducer.list_of_agents,
  my_agent_string: transactionReducer.my_agent_string,
  my_agent_hash: transactionReducer.my_agent_hash,
  hf_base_dna_hash:  transactionReducer.hf_base_dna_hash,

// holofuel specific states :
  ledger_state: transactionReducer.ledger_state,
  list_of_transactions: transactionReducer.list_of_transactions,
  list_of_pending:transactionReducer.list_of_pending,
  mostRecentPromiseCommit:transactionReducer.mostRecentPromiseCommit,
  mostRecentRequestCommit:transactionReducer.mostRecentRequestCommit,
  list_of_requests: transactionReducer.list_of_requests,
  list_of_promises: transactionReducer.list_of_promises,
  view_specific_request: transactionReducer.view_specific_request,
  view_specific_promise: transactionReducer.view_specific_promise,

  // status
  refresh: transactionReducer.refresh,
  awaitingResponse: transactionReducer.awaitingResponse,
  agent_id: transactionReducer.agent_id,
  agent_profile: transactionReducer.agent_profile // {}
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
      reset_refresh : () => dispatch(ResetRefresh()),

      set_agent_id : (payload) => dispatch(SetAgentId(payload)),

      update_profile : (payload) => dispatch(UpdateProfile(payload)),

      get_info_instances : () => {
       dispatch(GetInfoInstancesAsyncAction.create([]))},

      get_agent_list : () => {
       dispatch(GetAgentListAsyncAction.create([]))},

      fetch_agent_string: () => {
       dispatch(FetchAgentStringAsyncAction.create([]))},

  // TRANSACTION STATES
      get_ledger_state : () => {
      dispatch(LedgerStateAsyncAction.create({}))},

      list_transactions : (payload?) => {
       dispatch(TransactionListAsyncAction.create(payload))},

      list_pending : () => {
       dispatch(PendingListAsyncAction.create({}))},

      list_requests : () => {
       dispatch(ListRequestsAsyncAction.create({}))},

      list_promises : () => {
       dispatch(ListPromisesAsyncAction.create({}))},

  //// View Specific Transaction
      get_single_request : (request_payload) => {
       dispatch(GetRequestAsyncAction.create(request_payload))},

      get_single_promise : (promise_payload) => {
       dispatch(GetPromiseAsyncAction.create(promise_payload))},

  // TRANSACTION EVENTS (ACTIONS):
      request_payment : (payload) => {
       dispatch(RequestPaymentAsyncAction.create(payload))},

  // NB: API not yet available...
      // decline_request : () => {console.log("dispatching decline_request"); dispatch(DeclineRequestAsyncAction.create({}))},

  //// PROMISE CASE :
      // payload === {to, amount, notes?, deadline?, request?}
      promise_payment : (payload) => {console.log("dispatching promise"); dispatch(PromiseAsyncAction.create(payload))},
      receive_payment : (payload) => {console.log("dispatching receive_payment" + JSON.stringify(payload)); dispatch(ReceivePaymentAsyncAction.create(payload))},

  // NB: API not yet available...
      // reject_payment : () => {console.log("dispatching reject_payment"); dispatch(RejectPaymentAsyncAction.create({}))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HoloFuelAppContainer);
