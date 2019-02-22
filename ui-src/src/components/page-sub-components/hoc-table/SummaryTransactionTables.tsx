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
import { refactorListOfTransactions,refactorListOfPending } from '../../../utils/table-helper-functions/transaction-data-refactor';
import SimpleTable from '../simple-table/MuiSimpleTable';
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
  isMobile: boolean
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
      isMobile: window.innerWidth < 768
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
    console.log("state within SummaryTransactionTables upon mount >> verify whether the list_of_transactions, list_of_requests, and list_of_proposals are present... ", this.state);

    this.updateViewPortSize();
    window.addEventListener("resize", this.updateViewPortSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewPortSize);
  }

  updateViewPortSize() {
    this.setState({ isMobile: window.innerWidth < 768})
  }

  displayData = () => {
    console.log("this.state inside displayData", this.state);
    console.log("this.props inside displayData", this.props);
    if (this.props.list_of_transactions) {
      const table_pending_table_info =  refactorListOfTransactions(this.props.list_of_transactions);

      console.log("DATA GOING TO INSTANCE MAIN TABLE >>>> !! table_pending_table_info !! <<<<<<<< : ", table_pending_table_info);

      // const table_pending_table_info = [{}];
      return table_pending_table_info;
    }
  }

  getListOfPendingData=()=>{
    console.log("#######################")
    console.log("Getting pending data",this.props)
    console.log("#######################")
    if(!this.props.list_of_pending.proposals && !this.props.list_of_pending.requests)
    return []
    else
    return refactorListOfPending(this.props.list_of_pending)
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

    const list_of_pending_data_refactored = this.getListOfPendingData();
  // Sm (mobile) Viewport
    const mobile_pending_table_columns = mobile_pending_transaction_table_columns(this.props, this.state);
    const mobile_processed_table_columns = mobile_processed_transaction_table_columns(this.props, this.state);

// Md/Lg Viewport
    const pending_table_data = this.displayData();
    const processed_table_data = this.displayData();
    const pending_table_columns = pending_transaction_table_columns(this.props, this.state);
    const processed_table_columns = processed_transaction_table_columns(this.props, this.state);
    console.log("table_data: ", pending_table_data);
    console.log("table_columns: ", pending_table_columns);
    console.log("FIRST LOG:list_of_pending_data_refactored ",list_of_pending_data_refactored)
    
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
/////////////////PENDING TRANSACTIONS//////////////////
<div className={classes.transactionTablesContainer}>

  <Typography className={classnames(classes.tableHeader, classes.leadingTitle)} variant="display1" gutterBottom={gutterBottom} component="h4" >
    List Of Pending Transactions
  </Typography>
  <div className={classes.tableButtonBar}>
    <Button variant="outlined" color="primary"
      className={classnames(classes.buttonSumTable, classes.refreshBtn, classes.overlayTop)}
      onClick={() => this.props.handleTableRefresh()}>
      <Refresh className={classes.svgView}/>
    </Button>
  </div>

{ isMobile ?
  <div className={classnames(classes.tableContainer)}>
    <ReactTable
      className={classnames("-striped", "-highlight", classes.table)}
      showPagination={false}
      defaultPageSize={list_of_pending_data_refactored!.length}
      data={ list_of_pending_data_refactored }
      columns={ mobile_pending_table_columns }
    />
  </div>

:

/* // viewports >= Tablet Size (widths >=768) */
  <div className={classnames(classes.tableContainer)}>
    <AdvancedExpandReactTable
      className={classnames("-striped", "-highlight", classes.table)}
      showPagination={false}
      defaultPageSize={list_of_pending_data_refactored!.length}
      data={list_of_pending_data_refactored}
      columns={ pending_table_columns }
      filterable={filterable}
      defaultFilterMethod={(filter:any, row:any) =>
         String(row[filter.id]) === filter.value
       }
      SubComponent={(row:any) => {
        // SubComponent LOGIC >> to display the tx details...
        console.log("<><><><><> SubComponent ROW out : >> <><><><><> ", row);
          const currentRowData = ["due_date", "tx_notes"];
        return (
          <div className={classes.subtable} style={{ paddingTop: "2px", marginBottom:"8px" }}>
            <div className={classnames(classes.flexContainer)}>
              <SimpleTable classNames={classes.flexItem} {...newProps} currentRowData={currentRowData} />
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

/////////////////asd///////////////////////
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
            />
          </div>

      :

      /* // viewports >= Tablet Size (widths >=768) */
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              defaultPageSize={pending_table_data!.length}
              data={pending_table_data}
              columns={ pending_table_columns }
              filterable={filterable}
              defaultFilterMethod={(filter:any, row:any) =>
                 String(row[filter.id]) === filter.value
               }
              SubComponent={(row:any) => {
                // SubComponent LOGIC >> to display the tx details...
                console.log("<><><><><> SubComponent ROW out : >> <><><><><> ", row);
                // refactor rows to include the tx deadline, tx notes, + tx commit_hash, and timestamp of last action commit (to record completion...).

                /* const currentRowData = {
                  row.deadline, row.notes
                }; */
                const currentRowData = ["due_date", "tx_notes"];


                /* const seeDetails = (tx_type, transfer, interfaceforInstance) => {
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
                } */

                return (
                  <div className={classes.subtable} style={{ paddingTop: "2px", marginBottom:"8px" }}>
                    <div className={classnames(classes.flexContainer)}>
                      <SimpleTable classNames={classes.flexItem} {...newProps} currentRowData={currentRowData} />
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


  {/* ///// Proccessed-TX Table :  ///// */}
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

        { isMobile ?
          /* // viewports === Mobile Size (widths <=767) */
          <div className={classnames(classes.tableContainer)}>
            <ReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              defaultPageSize={processed_table_data!.length}
              filterable={filterable}
              defaultFilterMethod={(filter:any, row:any) =>
                 String(row[filter.id]) === filter.value
               }
              data={ processed_table_data }
              columns={ mobile_processed_table_columns }
            />
          </div>

        :

          /* // viewports >= Tablet Size (width of ~768) */
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              data={ processed_table_data }
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
                    <div className={classes.flexContainer}>
                      <SimpleTable classNames={classes.flexItem} {...newProps} currentRowData={currentRowData} />
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

// for the Refresh Buttons (adjacent to each table header)... do the following:
// {/* UPDATE THIS BUTTON onClick functon to TRIGGER the handleTxBatchDuration() with params of SINCE and UNTIL (where since === the most recent currently tx date shown and until is date.now) */}
