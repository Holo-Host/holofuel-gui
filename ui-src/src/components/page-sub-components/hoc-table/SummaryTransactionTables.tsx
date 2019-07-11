// Main Imports
import * as React from 'react';
import classnames from 'classnames';
// ReactTable Imports
import ReactTable from "react-table";
import "react-table/react-table.css";
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { tx_table_columns } from './SummaryTransactionTableCols';
import mobile_tx_table_columns from './SummaryTransactionTableColsMobile';
import { refactorListOfTransactions } from  '../../../utils/transaction-data-refactor';
import ErrorMessage from '../error-message/ErrorMessage';
import NoTxMsessage from '../error-message/NoTxMessage';
import SignUpModal from '../modal/SignUpModal';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  newprofile: boolean
  invokeTxCall: (txType:any) => void
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  row: String,
  data: {} | null,
  prevProps: any,
  isMobile: boolean,
  refresh: boolean
}

class SummaryTransactionTables extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      row: "",
      data: {},
      prevProps: {},
      isMobile: window.innerWidth < 768,
      refresh : false
    };
    this.updateViewPortSize = this.updateViewPortSize.bind(this);
  }

  componentDidMount = () => {
    this.updateViewPortSize();
    window.addEventListener("resize", this.updateViewPortSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewPortSize);
  }

  updateViewPortSize() {
    this.setState({ isMobile: window.innerWidth < 768})
  }

  resetPage = () => {
    this.setState({ refresh: !this.state.refresh });
  }

  invokeTxCall = (tx_obj:any) => {
    this.props.invokeTxCall(tx_obj)
  }

  fetchPendingAndProcessedData=()=>{
    if(!this.props.list_of_pending.promises && !this.props.list_of_pending.requests) {
      return [];
    }
    else {
      return refactorListOfTransactions(this.props.list_of_transactions, this.props.list_of_pending);
    }
  }

  public render() {
    console.log(">>>> this.props.newprofile in summarytables >>>> : ", this.props.newprofile);

    const { classes } = this.props;
    const { isMobile } = this.state;

    if (!this.props.list_of_pending.promises && !this.props.list_of_pending.requests){
      return <div>
        <ErrorMessage />
      </div>
    }


    if (this.props.list_of_pending.promises!.length <= 0 && this.props.list_of_pending.requests!.length <= 0 && this.props.list_of_transactions.transactions!.length<=0 && this.props.newprofile === true){
      return <div>
        <SignUpModal />
      </div>
    }

    if (this.props.list_of_pending.promises!.length <= 0 && this.props.list_of_pending.requests!.length <= 0 && this.props.list_of_transactions.transactions!.length<=0 && this.props.newprofile !== true){
      console.log("this.props.list_of_pending.promises!.length <= 0 && this.props.list_of_pending.requests!.length <= 0 && this.props.list_of_transactions.transactions!.length<=0 : ", this.props.list_of_pending.promises!.length <= 0 && this.props.list_of_pending.requests!.length <= 0 && this.props.list_of_transactions.transactions!.length<=0);
      return <div>
        <NoTxMsessage />
      </div>
    }

    // Sm (mobile) Viewport
    const mobile_table_columns = mobile_tx_table_columns(this.props, this.state, this.resetPage);
    // Md/Lg Viewport
    const table_columns = tx_table_columns(this.props, this.state, this.invokeTxCall, this.resetPage);
    // Data
    const table_data = this.fetchPendingAndProcessedData();

  return (
    <div className={classes.transactionTablesContainer}>
        { isMobile ?
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={ false }
              defaultPageSize={ table_data!.length }
              data={ table_data }
              columns={ mobile_table_columns }
              NoDataComponent={() => null}
            />
          </div>

      :

          /* // viewports >= Tablet Size (widths >=768) */
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={ false }
              pageSize={ table_data!.length }
              data={ table_data }
              columns={ table_columns }
              NoDataComponent={() => null}
            />
          </div>
        }

      </div>
    );
  }
}

export default withStyles(styles)(SummaryTransactionTables);
