import { Dispatch } from 'redux';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { State } from '../reducers/transactionReducer';
import TransactionOverview, { StateProps, DispatchProps } from '../components/page-views/transaction-overview/TransactionOverview';
import { GetInfoInstancesAsyncAction, TransactionListAsyncAction } from '../actions/transactionActions';

const mapStateToProps = ({ transactionReducer }: any): StateProps => {
  // console.log("transactionReducer", transactionReducer);
  return {
    list_of_instance_info: transactionReducer.list_of_instance_info,
    list_of_transactions: transactionReducer.list_of_transactions
    // status
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  // console.log("GetInfoInstancesAsyncAction", GetInfoInstancesAsyncAction);
  // console.log("TransactionListAsyncAction", TransactionListAsyncAction);
  return {
    get_info_instances : () => {console.log("dispatching get_info_instances"); dispatch(GetInfoInstancesAsyncAction.create([]))},
    list_transactions : () => {console.log("dispatching list_transactions"); dispatch(TransactionListAsyncAction.create({}))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverview);
