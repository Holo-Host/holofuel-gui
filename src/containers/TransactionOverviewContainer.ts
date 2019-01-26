import { Dispatch } from 'redux';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { State } from '../reducers/reducer';
import TransactionOverviewComponent, { StateProps, DispatchProps } from '../components/page-views/transaction-overview/TransactionOverview';
import { GetInfoInstancesAsyncAction, TransactionListAsyncAction } from '../actions/transactionActions';

const mapStateToProps = ({ list_of_instance_info, list_of_transactions, status }: State): StateProps => {
  return {
    list_of_instance_info,
    list_of_transactions,
    // status
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
  get_info_instances : () => dispatch(GetInfoInstancesAsyncAction.create({})),
  list_transactions : () => dispatch(TransactionListAsyncAction.create({}))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionOverviewComponent);
