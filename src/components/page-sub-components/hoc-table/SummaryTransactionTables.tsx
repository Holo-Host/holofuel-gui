// Main Imports
import * as React from 'react';
import classnames from 'classnames';
// ReactTable Imports
import ReactTable from "react-table";
import { advancedExpandTableHOC } from "./HocSystemTable";
import "react-table/react-table.css";
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Refresh from '@material-ui/icons/Refresh';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import pending_transaction_table_columns, { processed_transaction_table_columns } from './SummaryTransactionTableCols';
import SimpleTable from '../simple-table/MuiSimpleTable';
import ErrorMessage from '../error-message/ErrorMessage';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
import { refactorListOfTransactions } from '../../../utils/table-helper-functions/transaction-data-refactor';

export interface OwnProps {
  classes: any,
  txBatchType: any,
  txBatchDuration: any,
  handleTableRefresh: () => void
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  txEndDate: string,
  txStartDate: string,
  txBatchType: string,
  row: String,
  filter: any,
  data: {} | null,
  prevProps: any
}

// For the REACT TABLE Exapandable Version: Advanced HOC
const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

class SummaryTransactionTables extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      row: "",
      filter: null,
      data: {},
      prevProps: {},
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { list_of_transactions, list_of_instance_info, list_of_proposals, list_of_requests } = props;
    if (!list_of_transactions) {
      return null;
    }
    else {
      const transactionData = { list_of_transactions, list_of_instance_info, list_of_proposals, list_of_requests };
      const prevProps = state.prevProps || {};
      const data = prevProps.value !== transactionData ? transactionData : state.data
      console.log("data", data);
      return ({ data, prevProps: data });
    }
  }

  componentDidMount = () => {
    console.log("state within SummaryTransactionTables upon mount >> verify whether the list_of_transactions, list_of_requests, and list_of_proposals are present... ", this.state);
  }

  displayData = () => {
    console.log("this.state inside displayData", this.state);
    console.log("this.;props inside displayData", this.props);
    if (this.props.list_of_transactions) {
      const table_pending_table_info =  refactorListOfTransactions(this.props.list_of_transactions);

      console.log("DATA GOING TO INSTANCE MAIN TABLE >>>> !! table_pending_table_info !! <<<<<<<< : ", table_pending_table_info);
    return table_pending_table_info;
    }
  }


  public render() {
    const { classes, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    const filterable : boolean = true;

    if (!this.props.list_of_transactions){
      return <div>
        <ErrorMessage />
      </div>
    }

    const pending_table_data = this.displayData();
    const processed_table_data = this.displayData();
    const pending_table_columns = pending_transaction_table_columns(this.props, this.state);
    const processed_table_columns = processed_transaction_table_columns(this.props, this.state);
    console.log("table_data: ", pending_table_data);
    console.log("table_columns: ", pending_table_columns);

    return (

  // TODO: Look into integratng the infnite scroll with ReactTable...
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

      <div className={classes.transactionTablesContainer}>
        <Typography className={classnames(classes.tableHeader, classes.leadingTitle)} variant="display1" gutterBottom={gutterBottom} component="h4" >
          Pending Transactions
        </Typography>
        <span className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
            className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
            onClick={() => this.props.handleTableRefresh()}>
            <Refresh className={classes.svg}/>
          </Button>
        </span>
  {/* ///// Pending-TX Table :  ///// */}
        <div className={classnames(classes.tableContainer)}>
          <AdvancedExpandReactTable
            className={classnames("-striped", "-highlight", classes.table)}
            showPagination={false}
            defaultPageSize={pending_table_data!.length}
            filterable={filterable}
            defaultFilterMethod={(filter:any, row:any) =>
               String(row[filter.id]) === filter.value
             }
            data={pending_table_data}
            columns={ pending_table_columns }
            SubComponent={(row:any) => {
              console.log("<><><><><> SubComponent ROW out : >> <><><><><> ", row);
              // refactor rows to include the tx deadline, tx notes, + tx commit_hash, and timestamp of last action commit (to record completion...).
              {/* const currentRowData = {
                row.deadline, row.notes
              }; */}
              const currentRowData = ["due_date", "tx_notes"];


              {/* const seeDetails = (tx_type, transfer, interfaceforInstance) => {
                console.log("<><><><><> customAgentId <><><<><>", custom_agent_id);
                console.log("<><><><><> customInstanceId <><><<><>", custom_instance_id);
                console.log("<><><><><> interfaceforInstance <><><<><>", interfaceforInstance);

                const { dna_id } = row.original;
                const agent_id = custom_agent_id ? custom_agent_id : this.props.containerApiCalls.agent_list[0].id; // HC AGENT ID
                const instance_id = custom_instance_id ?  custom_instance_id : (dna_id + agent_id);
                const interface_id = interfaceforInstance;

                this.props.add_agent_dna_instance({id, dna_id, agent_id}).then(res => {
                  this.props.add_instance_to_interface({instance_id, interface_id});
                })
              } */}

              return (
                <div className={classes.subtable} style={{ paddingTop: "2px", marginBottom:"8px" }}>
                  <Typography className={classes.subtableHeader} variant="caption" gutterBottom={gutterBottom} component="h4" >
                    Transaction Details
                  </Typography>

                  <div className={classnames(classes.flexContainer)}>
                    <SimpleTable classNames={classes.flexItem} {...newProps} currentRowData={currentRowData} />
                  </div>
                </div>
              );
            }}
          />
        </div>

        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
            <ExpandMore/>
          </Button>
        </div>

{/* ///// Proccessed-TX Table :  ///// */}
        <br/>
        <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h2" >
          Processed Transactions
        </Typography>
        <span className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
            className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
            onClick={() => this.props.handleTableRefresh()}>
            <Refresh className={classes.svg}/>
          </Button>
        </span>
        <div className={classnames(classes.tableContainer)}>
          <AdvancedExpandReactTable
            className={classnames("-striped", "-highlight", classes.table)}
            data={processed_table_data}
            columns={ processed_table_columns }
            showPagination={false}
            defaultPageSize={processed_table_data!.length}
            filterable={filterable}
            defaultFilterMethod={(filter:any, row:any) =>
               String(row[filter.id]) === filter.value
             }
            SubComponent={(row:any) => {
              console.log("<><><><><> Processed TX SubComponent ROW out : >> <><><><><> ", row);
              const currentRowData = ["completion_date", "tx_notes"];

              return (
                <div className={classes.subtable} style={{ paddingTop: "2px", marginBottom:"8px" }}>
                  <Typography className={classes.subtableHeader} variant="display1" gutterBottom={gutterBottom} component="h4" >
                    Transaction Details
                  </Typography>

                  <div className={classes.flexContainer}>
                    <SimpleTable classNames={classes.flexItem} {...newProps} currentRowData={currentRowData} />
                  </div>
                </div>
              );
            }}
          />
        </div>

        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
            <ExpandMore className={classes.svg}/>
          </Button>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(SummaryTransactionTables);

// for the Refresh Buttons (adjacent to each table header)... do the following:
// {/* UPDATE THIS BUTTON onClick functon to TRIGGER the handleTxBatchDuration() with params of SINCE and UNTIL (where since === the most recent currently tx date shown and until is date.now) */}
