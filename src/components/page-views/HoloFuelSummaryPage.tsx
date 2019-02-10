import * as React from 'react';
import classnames from 'classnames';
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
import DayTimePicker from '../page-sub-components/day-time-picker/DayTimePicker';
import '../styles/page-styles/scaffold-styles.css';
import { TABLE_DATA_BATCH_LIMIT } from '../../utils/constants';
import Button from '@material-ui/core/Button';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  txType: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txEndDate: string,
  txStartDate: string,
  txBatchType: string,
}

class HoloFuelSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: ""
    };
  };

  public componentDidMount () {
    // Invoke list_transactions() (a ZOME Call) :
    console.log("calling : list_transactions >>  inside HoloFuelSummaryPage... >> ");
    this.props.list_transactions();

    // Invoke list_requests() (a ZOME Call) :
    console.log("calling : list_requests >> ", this.props.list_requests);
    this.props.list_requests();

    // Invoke list_proposals() (a ZOME Call) :
    console.log("calling : list_proposals >> ", this.props.list_proposals);
    this.props.list_proposals();
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
    const { txBatchType, txStartDate, txEndDate } = this.state;
    // Invoke list_transactions() WITH PARAMS :
    console.log("calling : list_transactions WITH PARAMS >> !! >> ");
    this.props.list_transactions({state: txBatchType, since:txStartDate, until: txEndDate, limit: TABLE_DATA_BATCH_LIMIT });
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

            <div className={classes.tableButtonBar}>
              <Button variant="outlined" color="primary"
              className={classnames(classes.button, classes.overlayTop)}
              onClick={this.handleTableRefresh}>
              {/* UPDATE THIS BUTTON onClick functon to TRIGGER the handleTxBatchDuration() with params of SINCE and UNTIL (where since === the most recent currently tx date shown and until is date.now) */}
                Refresh
              </Button>

              <Button variant="outlined" color="primary"
              className={classnames(classes.button, classes.overlayTop)}
              onClick={this.handleTableRefresh}>
                View More
              </Button>
            </div>

            <DayTimePicker setDateFilter={this.handleTxBatchDuration} setTxTypeFilter={this.handleTxBatchType} />

            <TransactionTables txBatchType={this.state.txBatchType} txBatchDuration={{endDate:this.state.txEndDate, startDate:this.state.txStartDate}} {...newProps} />

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

{/* < div
  className={classes.alert}
  ref={ref => {
    this.container = ref;
}} */}
