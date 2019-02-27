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
import mobile_pending_transaction_table_columns, { mobile_processed_transaction_table_columns } from './SummaryTransactionTableColsMobile';
import { refactorListOfTransactions ,refactorListOfPending } from '../../../utils/table-helper-functions/transaction-data-refactor';
import MuiSimpleTable from '../simple-table/MuiSimpleTable';
import ErrorMessage from '../error-message/ErrorMessage';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

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
  prevProps: any,
  isMobile: boolean,
  refresh: boolean
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
      isMobile: window.innerWidth < 768,
      refresh : false
    };
    this.updateViewPortSize = this.updateViewPortSize.bind(this);
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
    // console.log("state within SummaryTransactionTables upon mount >> verify whether the list_of_transactions, list_of_requests, and list_of_proposals are present... ", this.state);

    this.updateViewPortSize();
    window.addEventListener("resize", this.updateViewPortSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewPortSize);
  }

  updateViewPortSize() {
    this.setState({ isMobile: window.innerWidth < 768})
  }

  // displayData = () => {
  //   console.log("this.state inside displayData", this.state);
  //   console.log("this.props inside displayData", this.props);
  //   if (this.props.list_of_transactions) {
  //     const table_pending_table_info =  refactorListOfTransactions(this.props.list_of_transactions);
  //
  //     console.log("DATA GOING TO INSTANCE MAIN TABLE >>>> !! table_pending_table_info !! <<<<<<<< : ", table_pending_table_info);
  //
  //     // const table_pending_table_info = [{}];
  //     return table_pending_table_info;
  //   }
  // }

  fetchNewData=()=>{
    // console.log("#######################")
    // console.log("Getting pending data",this.props)
    // console.log("#######################")
    if(!this.props.list_of_pending.proposals && !this.props.list_of_pending.requests)
    return []
    else
    return refactorListOfPending(this.props.list_of_pending)
  }

  fetchPendingAndProcessedData=()=>{
    if(!this.props.list_of_pending.proposals && !this.props.list_of_pending.requests)
    return {pending_table_data:[],processed_table_data:[]}
    else
    return refactorListOfTransactions(this.props.list_of_transactions);
  }

  resetPage = () => {
    // Hach to reset page >> revisit...
    this.setState({ refresh: !this.state.refresh });
  }


  public render() {
    const { classes, ...newProps } = this.props;
    const { isMobile } = this.state;
    const gutterBottom : boolean = true;
    const filterable : boolean = true;

    if (!this.props.list_of_transactions){
      return <div>
        <ErrorMessage />
      </div>
    }

  // Sm (mobile) Viewport
    const mobile_pending_table_columns = mobile_pending_transaction_table_columns(this.props, this.state, this.resetPage);
    const mobile_processed_table_columns = mobile_processed_transaction_table_columns(this.props, this.state);

// Md/Lg Viewport
    const pending_table_columns = pending_transaction_table_columns(this.props, this.state, this.resetPage);
    const processed_table_columns = processed_transaction_table_columns(this.props, this.state);
    // console.log("table_columns: ", pending_table_columns);

    // Data

    // const list_of_pending_data_refactored = this.getListOfPendingData();
    // const pending_table_data = this.displayData();


    const new_data_table = this.fetchNewData();
    const {pending_table_data,processed_table_data}= this.fetchPendingAndProcessedData();

    // console.log("table new_data_table: ", new_data_table);
    // console.log("table pending_table_data: ", pending_table_data);
    // console.log("table Processed_data: ", processed_table_data);
    // console.log("ROW LENGTH: ",pending_table_data.length)
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
      {/* /////////////////// List of Pending (aka NEW) Transactions Table :  ///////////////////// */}
      <Typography className={classnames(classes.tableHeader, classes.leadingTitle)} variant="display1" gutterBottom={gutterBottom} component="h4" >
        New Transactions
      </Typography>

     {/* NOTE: // for the Refresh Buttons (adjacent to each table header)... do the following: */}
       {/* UPDATE THIS BUTTON onClick functon to TRIGGER the handleTxBatchDuration() with params of SINCE and UNTIL (where since === the most recent currently tx date shown and until is date.now) */}
      <div className={classes.tableButtonBar}>
        <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
          <Refresh className={classes.svgView}/>
        </Button>
      </div>

      {/* ///// Pending-TX Table :  ///// */}
      {/* // viewports === Mobile Size (widths <=767) */}
      { isMobile ?
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              defaultPageSize={new_data_table!.length}
              data={ pending_table_data }
              columns={ mobile_pending_table_columns }
              NoDataComponent={() => null}
            />
          </div>

      :

      /* // viewports >= Tablet Size (widths >=768) */
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              pageSize={new_data_table.length}
              data={new_data_table}
              columns={ pending_table_columns }
              filter={this.state.filter}
              NoDataComponent={() => null}
              defaultFilterMethod={(filter:any, row:any, column:any) => {
                const id = filter.pivotId || filter.id;
                if (typeof filter.value === "object") {
                  return row[id] !== undefined
                    ? filter.value.indexOf(row[id]) > -1
                    : true;
                } else {
                  return row[id] !== undefined
                    ? String(row[id].toUpperCase()).indexOf(filter.value.toUpperCase()) > -1
                    : true;
                }
              }}
              SubComponent={(row:any) => {
                console.log("<><><><><> SubComponent ROW out : >> <><><><><> ", row);
                // refactor rows to include the + tx commit_hash, tx deadline, and tx notes, and  tx timestamp of last commit (for detailed view / record completion...).

                return (
                  <div className={classes.subtable} style={{ padding: "10px", margin: '0 auto', marginBottom:"8px", width:'95%' }}>
                    <MuiSimpleTable
                      {...newProps}
                      rowInfo={row}
                    />
                  </div>
                );
              }}
            />
          </div>
        }
        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
            <ExpandMore className={classes.svgMore}/>
          </Button>
        </div>


        {/* /////////////////// List of Transactions - Unprocessed (aka Pending) Table :  ///////////////////// */}
        <Typography className={classnames(classes.tableHeader, classes.leadingTitle)} variant="display1" gutterBottom={gutterBottom} component="h4" >
          Pending Transactions
        </Typography>
        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
            className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
            onClick={() => this.props.handleTableRefresh()}>
            <Refresh className={classes.svgView}/>
          </Button>
        </div>

        {/* ///// Pending-TX Table :  ///// */}
        {/* // viewports === Mobile Size (widths <=767) */}
        { isMobile ?
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              defaultPageSize={pending_table_data!.length}
              data={ pending_table_data }
              columns={ mobile_pending_table_columns }
              NoDataComponent={() => null}
            />
          </div>

      :

      /* // viewports >= Tablet Size (widths >=768) */
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              pageSize={pending_table_data.length}
              data={pending_table_data}
              columns={ pending_table_columns }
              NoDataComponent={() => null}
              filter={this.state.filter}
              defaultFilterMethod={(filter:any, row:any, column:any) => {
                const id = filter.pivotId || filter.id;
                if (typeof filter.value === "object") {
                  return row[id] !== undefined
                    ? filter.value.indexOf(row[id]) > -1
                    : true;
                } else {
                  return row[id] !== undefined
                    ? String(row[id].toUpperCase()).indexOf(filter.value.toUpperCase()) > -1
                    : true;
                }
              }}
              SubComponent={(row:any) => {
                {/* console.log("<><><><><> SubComponent ROW out : >> <><><><><> ", row); */}
                // refactor rows to include the + tx commit_hash, tx deadline, and tx notes, and  tx timestamp of last commit (for detailed view / record completion...).

                return (
                  <div className={classes.subtable} style={{ padding: "2px", width:'95%', margin: '0 auto', marginBottom:'8px' }}>
                    <MuiSimpleTable
                      {...newProps}
                      rowInfo={row}
                    />
                  </div>
                );
              }}
            />
          </div>
        }
        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
            <ExpandMore className={classes.svgMore}/>
          </Button>
        </div>


        {/* /////////////////// List of Transactions - Proccessed-TX Table : ///////////////////// */}
        <br/>
        <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h2" >
          Processed Transactions
        </Typography>
        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
            className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
            onClick={() => this.props.handleTableRefresh()}>
            <Refresh className={classes.svgView}/>
          </Button>
        </div>

        {/* { if(processed_table_data!.length <= 0) {
          <ErrorMessage>
          }
        }  */}

        { isMobile ?
          /* // viewports === Mobile Size (widths <=767) */
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              defaultPageSize={processed_table_data!.length}
              data={ processed_table_data }
              columns={ mobile_processed_table_columns }
              getNoDataProps={() => {
                if(processed_table_data!.length <= 0) {
                  return <ErrorMessage/>;
                }
              }}
              filterable={filterable}
              defaultFilterMethod={(filter:any, row:any) =>
                 String(row[filter.id]) === filter.value
               }
            />
          </div>

        :

          /* // viewports >= Tablet Size (width of ~768) */
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              data={ processed_table_data }
              columns={ processed_table_columns }
              getNoDataProps={() => {
                if(processed_table_data!.length <= 0) {
                  return <ErrorMessage/>;
                }
              }}
              showPagination={false}
              pageSize={processed_table_data.length}
              filterable={filterable}
              defaultFilterMethod={(filter:any, row:any) =>
                 String(row[filter.id]) === filter.value
               }
              SubComponent={(row:any) => {
                /* console.log("<><><><><> Processed TX SubComponent ROW out : >> <><><><><> ", row); */
                return (
                  <div className={classes.subtable} style={{ padding: "2px", marginBottom:"8px" }}>
                    <div className={classes.flexContainer}>
                      <MuiSimpleTable
                        {...newProps}
                        rowInfo={row}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </div>
        }
        <div className={classes.tableButtonBar}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.props.handleTableRefresh()}>
            <ExpandMore className={classes.svgMore}/>
          </Button>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(SummaryTransactionTables);
