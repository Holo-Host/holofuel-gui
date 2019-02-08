// Main Imports
import * as React from 'react';
import classnames from 'classnames';
// ReactTable Imports
import ReactTable from "react-table";
import { advancedExpandTableHOC } from "./HocSystemTable";
import "react-table/react-table.css";
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import pending_transaction_table_columns, { processed_transaction_table_columns } from './SummaryTransactionTableCols';
import SimpleTable from '../simple-table/MuiSimpleTable';
import ErrorMessage from '../error-message/ErrorMessage';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface OwnProps {
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  data: {} | null,
  row: String,
  filter: any,
  prevProps: any
}

// For the REACT TABLE Exapandable Version: Advanced HOC
const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

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

  // componentDidMount = () => {
  //   this.beginAppMontoring();
  //   // this.props.fetch_state();
  // }
  //
  // beginAppMontoring = () => {
  //     console.log("PROPS : ", this.props);
  //     // 1) Invoke GET_INFO_INSTANCES()
  //     this.props.get_info_instances();
  //
  //     // 2) Invoke list_transactions() (a ZOME Call) :
  //     // this.props.list_pending();
  //
  //     // 3) Invoke list_transactions(spender, transaction) (a ZOME Call) :
  //     // this.props.request_payment(spender, transaction);
  //
  //     // 4) Invoke list_transactions() (a ZOME Call) :
  //     this.props.list_transactions();
  // }

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
    const { classes, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    const filterable : boolean = true;

    if (!this.props.list_of_transactions || this.props.list_of_transactions.length === 0){
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

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // FYI: If expantion panel doesn't work... then use the HOC dropdowna dn reference the Row value provdied byt the SubComponent Values.       //
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      <div>
        <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h4" >
          Pending Transactions
        </Typography>
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
              console.log("row out: ", row);
              {/* const addInstance = (custom_agent_id, custom_instance_id, interfaceforInstance) => {
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
                <div style={{ paddingTop: "2px", marginBottom:"8px" }}>
                  <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h4" >
                    Transaction Details
                  </Typography>

                  <div className={classes.flexContainer}>
                    <SimpleTable classNames={classes.flexItem} {...newProps} />
                  </div>

                </div>
              );
            }}
          />

          <br/>
          <Typography className={classes.tableHeader} variant="display1" gutterBottom={gutterBottom} component="h2" >
            Processed Transactions
          </Typography>
          <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              defaultPageSize={10}
              className={classnames("-striped", "-highlight", classes.table)}
              data={processed_table_data}
              columns={ processed_table_columns }
            />
          </div>

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SummaryTransactionTables);
            // {/* defaultPageSize={10} */}
