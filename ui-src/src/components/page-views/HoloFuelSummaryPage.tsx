import * as React from 'react';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import TransactionTables from '../page-sub-components/hoc-table/SummaryTransactionTables';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import DateTimePicker from '../page-sub-components/day-time-picker/DateTimePicker';
import '../styles/page-styles/scaffold-styles.css';
import { TABLE_DATA_BATCH_LIMIT } from '../../utils/constants';
import {RequestActionParam} from '../../utils/types';
// import * as moment from 'moment';

// type Moment = moment.Moment;
export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  txType: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txEndDate: string | undefined,
  txStartDate: string | undefined,
  txBatchType: string | undefined,
  currentTxBatchInfo: {newer:{}, over:{}} | null,
  data: {} | null,
  prevProps: any
}

class HoloFuelSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      currentTxBatchInfo: null,
      data: {},
      prevProps: {}
    };
  };

  public componentDidMount () {
    // Invoke list_transactions() (a ZOME Call) :
    console.log("calling : list_transactions >>  inside HoloFuelSummaryPage... >> ");
    this.props.list_transactions({});

    // Invoke list_requests() (a ZOME Call) :
    // console.log("calling : list_requests >> ", this.props.list_requests);
    // this.props.list_requests();

    // Invoke list_proposals() (a ZOME Call) :
    // console.log("calling : list_proposals >> ", this.props.list_proposals);
    // this.props.list_proposals();
      this.initializing();
  }

  initializing (){
    // let time = moment().format().toString();
    // let time1= "Some("+time+")";
    const request_tx_obj : RequestActionParam = {
      from: "HoloTester2-----------------------------------------------------------------------AAACZp4xHB", // this will be the payment requestor's AGENT_ADDRESS
      amount:"0.0000000569066456676 HF",
      notes: "Some(testing out the request_payment api call...)",
      deadline: "Some()"
    }
    console.log("request_tx_obj", request_tx_obj);
    console.log("calling : request_payment >> ", this.props.request_payment);
    this.props.request_payment(request_tx_obj);

  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { list_of_transactions } = props;
    if (!list_of_transactions) {
      return null;
    }
    else {
      const transactionData = { list_of_transactions };
      const prevProps = state.prevProps || {};
      const data = prevProps.value !== transactionData ? transactionData : state.data
      console.log("data", data);

      const { newer } = list_of_transactions;
      const currentTxBatchInfo = Object.assign({newer}, {});
      console.log("------------------------>",list_of_transactions)
      const txEndDate = newer!.until;
      const txStartDate = newer!.since;
      console.log(" <><><><><>< TXENDDATE UPON getDerivedStateFromProps <><><><><", txEndDate);
      console.log(" <><><><><>< TXSTARTDATE UPON getDerivedStateFromProps <><><><><", txStartDate);

      return ({
        data,
        prevProps: data,
        currentTxBatchInfo,
        txStartDate,
        txEndDate,
        txBatchType: 'All Transactions',
      });
    }
  }

  handleTxBatchType = (txState: string) => {
    console.log("TXTYPE for Batch -- inside of HoloFuelSummaryPage", txState);
    this.setState({
      txBatchType: txState
    });
    // reset table data with custom date filters :
    this.handleTableRefresh();
  }

  handleTxBatchDuration = (txEndDate: any, txStartDate: any) => {
    console.log(">> TXDURATION :: ENDDATE << for Batch -- inside of HoloFuelSummaryPage", txEndDate);
    console.log(">> TXDURATION :: ENDDATE << for Batch -- inside of HoloFuelSummaryPage", txStartDate);
    this.setState({
      txEndDate,
      txStartDate
    });
    // reset table data with custom date filters :
    this.handleTableRefresh();
  }

  handleTableRefresh = () => {
    // const { txBatchType, txStartDate, txEndDate } = this.state;
    console.log("calling : TABLE_DATA_BATCH_LIMIT >> !! >> ", TABLE_DATA_BATCH_LIMIT);
    // Invoke list_transactions() WITH PARAMS :

    console.log("calling : list_transactions WITH PARAMS >> !! >> ");

    // this.props.list_transactions({state: txBatchType, since:txStartDate, until: txEndDate, limit: TABLE_DATA_BATCH_LIMIT });
  }

   public render () {
      const { classes, transferBtnBar, ...newProps } = this.props;
      const gutterBottom : boolean = true;

      console.log('Props in HoloFuelSummaryPage:', this.props);

      return (
        <div>
          <div className={classes.jumbotron}>
            <h3 className={classes.h3}>Current Balance</h3>
            <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
              {this.props.ledger_state.balance ? `${this.props.ledger_state.balance} HF` : `Pending...`}
            </Typography>
            <hr style={{color:"#0e094b"}} />
            <h3 className={classes.h3}>Credit limit : {this.props.ledger_state.credit ? `${this.props.ledger_state.credit} HF`: `N/A`} </h3>
          </div>

          <div>
            <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
              Transaction History
            </Typography>

            <DateTimePicker { ...newProps } setDateFilter={this.handleTxBatchDuration} setTxTypeFilter={this.handleTxBatchType} />

            <TransactionTables txBatchType={this.state.txBatchType} txBatchDuration={{endDate:this.state.txEndDate, startDate:this.state.txStartDate}} handleTableRefresh={this.handleTableRefresh} {...newProps} />

            { transferBtnBar ?
              <Portal>
                <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
                  <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
                </Slide>
              </Portal>
            :
              <div/>
            }
          </div>
        </div>
      );
   }
}

export default withStyles(styles)(HoloFuelSummaryPage);


// {/* <div className={classes.tableButtonBar}>
//   <Button variant="outlined" color="primary"
//   className={classnames(classes.buttonSumTable, classes.overlayTop)}
//   onClick={this.handleTableRefresh}>
//     <ExpandMore/>
//   </Button>
// </div> */}

// {/* < div
//   className={classes.alert}
//   ref={ref => {
//     this.container = ref;
// }} */}