import { Dispatch } from 'redux';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { State } from '../reducers/transactionReducer';
import {
GetInfoInstancesAsyncAction,
TransactionListAsyncAction,
LedgerStateAsyncAction,
ListRequestsAsyncAction,
ListProposalsAsyncAction,
GetRequestAsyncAction,
GetProposalAsyncAction,
RequestPaymentAsyncAction,
// PayRequestAsyncAction,
// DeclineRequestAsyncAction,
ProposalAsyncAction,
ReceivePaymentAsyncAction,
// RejectPaymentAsyncAction
} from '../actions/transactionActions';
import TransactionOverview, { StateProps, DispatchProps } from '../components/page-views/transaction-overview/TransactionOverview';

const mapStateToProps = ({ transactionReducer }: any): StateProps => {
  // console.log("transactionReducer", transactionReducer);
  return {
    list_of_instance_info: transactionReducer.list_of_instance_info,
    ledger_state: transactionReducer.ledger_state,
    list_of_transactions: transactionReducer.list_of_transactions,
    list_of_requests: transactionReducer.list_of_requests,
    list_of_proposals: transactionReducer.list_of_proposals,
    view_specific_request: transactionReducer.view_specific_request,
    view_specific_proposal: transactionReducer.view_specific_proposal // ,
    // status
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  // console.log("GetInfoInstancesAsyncAction", GetInfoInstancesAsyncAction);
  // console.log("TransactionListAsyncAction", TransactionListAsyncAction);
  return {
    get_info_instances : () => {console.log("dispatching get_info_instances"); dispatch(GetInfoInstancesAsyncAction.create([]))},

// TRANSACTION STATES
//// View LEDGER SNAPSHOT / TRANSACTION HISTORY
    get_ledger_state : () => {console.log("dispatching get_ledger_state"); dispatch(LedgerStateAsyncAction.create({}))},

    // NOTE: `State` parameter allows the request of transactions by Event State (Proposal(Cheque)/Request(Invoice), Decline/Reject, Receipt/Refund, Failure/Error). *Type is Enum, therefore, can only pass one of the two State values (ie: StateName or StateList) as Argument.
    // `Since` & `Until` are the dates surrounding the currently displayed TXs, `Limit` is the amount(batch size) of TXs that will be displayed per batch of TXs.

    // TODO: Make a payload object including (state, since, until, limit) parameters as a JSON object.
    list_transactions : (payload?) => {console.log("dispatching list_transactions"); dispatch(TransactionListAsyncAction.create(payload))},

//// View List of Transaction by Type (Request/Proposal)
    list_requests : () => {console.log("dispatching list_transactions"); dispatch(ListRequestsAsyncAction.create({}))},

    list_proposals : () => {console.log("dispatching list_transactions"); dispatch(ListProposalsAsyncAction.create({}))},

//// View Specific Transaction
    // get_request's input === the output from list_requests
    // request_payload === {request: request_commit_hash_address} => request as JSON obj
    get_single_request : (request_payload) => {console.log("dispatching list_transactions"); dispatch(GetRequestAsyncAction.create(request_payload))},

    // get_proposal's input === the output from list_proposals
    // proposal_payload === {proposal: request_commit_hash_address} => proposal as JSON obj
    get_single_proposal : (proposal_payload) => {console.log("dispatching list_transactions"); dispatch(GetProposalAsyncAction.create(proposal_payload))},

// TRANSACTION EVENTS (ACTIONS):
//// REQUEST CASE :
    // payload === {from, amount, notes?, deadline?}
    request_payment : (payload) => {console.log("dispatching request"); dispatch(RequestPaymentAsyncAction.create(payload))},

// NOTE: API not yet available...
    // pay_request : () => {console.log("dispatching pay_request"); dispatch(PayRequestAsyncAction.create({}))},

// NOTE: API not yet available...
    // decline_request : () => {console.log("dispatching decline_request"); dispatch(DeclineRequestAsyncAction.create({}))},

//// PROPOSAL CASE :
    // payload === {to, amount, notes?, deadline?, request?}
    propose_payment : (payload) => {console.log("dispatching proposal"); dispatch(ProposalAsyncAction.create(payload))},

    // payload === {proposal, proposal_sig, proposal_commit_hash}
    receive_payment : (payload) => {console.log("dispatching receive_payment"); dispatch(ReceivePaymentAsyncAction.create(payload))},

// NOTE: API not yet available...
    // reject_payment : () => {console.log("dispatching receive_payment"); dispatch(RejectPaymentAsyncAction.create({}))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverview);
