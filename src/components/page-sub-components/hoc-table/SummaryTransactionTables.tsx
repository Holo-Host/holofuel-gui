// Main Imports
import * as React from 'react';
import classnames from 'classnames';
// ReactTable Imports
import ReactTable from "react-table";
// import { advancedExpandTableHOC } from "./HocSystemTable";
import "react-table/react-table.css";
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import pending_transaction_table_columns, { processed_transaction_table_columns } from './SummaryTransactionTableCols';
// import { dataRefactor, refactorBaseDna, refactorInstanceData } from "../../../utils/data-refactor";
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// MUI Imports:
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  data: {} | null,
  row: String,
  filter: any,
  prevProps: any
}

// const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

class SummaryTransactionTables extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      row: "",
      filter: null,
      prevProps: {},
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { list_of_transactions, list_of_instance_info } = props;
    if (!list_of_transactions) {
      return null;
    }
    else {
      const transactionData = { list_of_transactions, list_of_instance_info };
      const prevProps = state.prevProps || {};
      const data = prevProps.value !== transactionData ? transactionData : state.data
      console.log("data", data);
      return ({ data, prevProps: data });
    }
  }

  componentDidMount = () => {
    this.beginAppMontoring();
    // this.props.fetch_state();
  }

  beginAppMontoring = () => {
      console.log("PROPS : ", this.props);
      // 1) Invoke GET_INFO_INSTANCES()
      this.props.get_info_instances();

      // 2) Invoke list_transactions() (a ZOME Call) :
      // this.props.list_pending();

      // 3) Invoke list_transactions(spender, transaction) (a ZOME Call) :
      // this.props.request_payment(spender, transaction);

      // 4) Invoke list_transactions() (a ZOME Call) :
      this.props.list_transactions();
  }

  displayData = () => {
    console.log("this.state inside displayData", this.state);
    console.log("this.;props inside displayData", this.props);
    if (this.props.list_of_transactions) {
      // const { list_of_transactions, list_of_instance_info } = this.props;

      // const table_pending_table_info =  refactorInstanceData(list_of_transactions);
      const table_pending_table_info = [{}];

      // console.log("DATA GOING TO INSTANCE MAIN TABLE >>>> !! table_pending_table_info !! <<<<<<<< : ", table_pending_table_info);
      return table_pending_table_info;
    }
  }


  public render() {
    const { classes } = this.props;
    const gutterBottom : boolean = true;

    if (!this.props.list_of_transactions || this.props.list_of_transactions.length === 0){
      return <div/>
    }

    const pending_table_data = this.displayData();
    const processed_table_data = this.displayData();
    const pending_table_columns = pending_transaction_table_columns(this.props, this.state);
    const processed_table_columns = processed_transaction_table_columns(this.props, this.state);
    console.log("table_data: ", pending_table_data);
    console.log("table_columns: ", pending_table_columns);

    return (
    //   <div style="height:700px;overflow:auto;" ref={(ref) => this.scrollParentRef = ref}>
    //     <div>
    //         <InfiniteScroll
    //             pageStart={0}
    //             loadMore={loadFunc}
    //             hasMore={true || false}
    //             loader={<div className="loader" key={0}>Loading ...</div>}
    //             useWindow={false}
    //             getScrollParent={() => this.scrollParentRef}
    //         >
    //             {items}
    //         </InfiniteScroll>
    //     </div>
    // </div>

      ////////////////////////////////
      <div>
        <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h4" >
          Pending Transactions
        </Typography>
        <div className={classnames(classes.tableContainer)}>
          <ReactTable
            defaultPageSize={10}
            className={classnames("-striped", "-highlight", classes.table)}
            data={pending_table_data}
            columns={ pending_table_columns }
          />
        </div>

        <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h2" >
          Processed Transactions
        </Typography>
        <div className={classnames(classes.tableContainer)}>
          <ReactTable
            defaultPageSize={10}
            className={classnames("-striped", "-highlight", classes.table)}
            data={processed_table_data}
            columns={ processed_table_columns }
          />
        </div>
      </div>
  )}
}

export default withStyles(styles)(SummaryTransactionTables);
