// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// MUI Imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { PromiseActionParam } from '../../../utils/types';
import TransactionTableModal from '../modal/TransactionTableModal';
import HoloFuelTransactionDetailPage from '../../page-views/HoloFuelTransactionDetailPage';
import styles from '../../styles/page-sub-component-styles/TransactionDetailsButtonMuiStyles';

type Moment = moment.Moment;

export interface OwnProps {
  classes: any
  transactionState: any,
  rowInfo: any,
  resetPage: () => void,
  invokeTxCall: (txObj:any) => void
};
export type Props = OwnProps & DispatchProps & StateProps;

export interface State {
  transactionState: string,
  txStateDirection:string,
  txStateStage: string,
  todoText: string | undefined,
  nextApiCall: string ,
  messageObj: any,
  statusText: string,
  currentRowDataDetailed: Array<any> | null,
  txDetailModal: boolean,
  newTxCall: boolean,
  reset: boolean
};

class TransactionDetailsButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      transactionState: "",
      txStateDirection:"",
      txStateStage: "",
      todoText: undefined,
      nextApiCall: "/",
      messageObj: {},
      statusText: "",
      currentRowDataDetailed: null,
      txDetailModal: false,
      newTxCall: false,
      reset: false
    };
    this.configureTransactionState();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.transactionState !== state.transactionState) {
      const txStateDirection = props.transactionState.split("/")[0];
      const txStateStage = props.transactionState.split("/")[1];
      return {
        transactionState: props.transactionState,
        txStateDirection: txStateDirection === "incoming" ? "recipient" : txStateDirection === "outgoing" ? "spender" : txStateDirection ,
        txStateStage
      };
    }
    return ({ transactionState: state.transactionState });
  }

  componentDidMount = () => {
    this.configureTransactionState();
  }

  configureTransactionState = () => {
    let nextApiCall = "/";
    let todoText = "";
    let statusText = "";

    if(this.state.txStateDirection === "recipient"){
        switch (this.state.txStateStage) {
        case 'requested': {
          nextApiCall = '';
          todoText = 'Review Request'; // (INITIATOR'S VIEW): request to send money or to recieve money
          statusText="Payment Requested";
          break;
          }
        case 'rejected': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Rejection';
          statusText="Payment Rejected";
          break;
        }
        case 'accepted': {
          nextApiCall = 'receive_payment';
          todoText = 'Accept Final Payment';
          statusText="Payment Promised";
          break;
        }
        case 'completed': {
          nextApiCall = '';
          todoText = 'Review Final Payment';
          statusText = "Payment Completed";
          break;
        }
        case 'refunded': {
          nextApiCall = '';
          todoText = 'Review Refund';
          statusText="Payment Refunded";
          break;
        }
        default:
          return null;
      }
    }
    // if author of transaction === spender
    if(this.state.txStateDirection === "spender"){
      switch (this.state.txStateStage) {
        case 'approved': {
          // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Payment';
          statusText = "Payment Sent"
          break;
        }
        case 'declined': {
          nextApiCall = '';
          todoText = 'Review Decline';
          statusText = "Payment Declined";
          break;
        }
        case 'completed': {
          nextApiCall = '';
          todoText = 'Review Final Payment';
          statusText = "Payment Completed";
          break;
        }
        case 'recovered': {
          // TODO: determine if there is an API for this:
          nextApiCall = '';
          todoText = 'Review Recovery';
          statusText = "Payment Recovered";
          break;
        }
        default:
          return null;
      }
    }
    // if counterparty of tx recieves tx from author (counterparty is not yet taken action within the tx-cycle).
    if(this.state.txStateDirection === "pending"){
      switch (this.state.txStateStage) {
        case 'recipient': {
          nextApiCall = 'receive_payment';
          todoText = 'Accept Payment';
          statusText = "Payment Promised";
          break;
        }
        case 'spender': {
          nextApiCall = 'promise_payment';
          todoText = 'Send Funds';
          statusText = "Payment Requested";
          break;
        }
        default:
          return null;
      }
    }

    this.setState({ nextApiCall, todoText, statusText });
  };

  public handleTableTx = () => {
    console.log("messageObj to send off >> ", this.state.messageObj);
    this.props.invokeTxCall(this.state.messageObj);
    this.resetMessage();
  };

  public resetMessage = () => {
    this.setState({ messageObj: {}, newTxCall: false });
  }

  handlePendingTransaction = async () => {
    if (this.state.nextApiCall === "promise_payment") {
      const { counterparty, amount, notes, dueDate, originCommitHash } = this.props.rowInfo.original;
      const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      const txObj: PromiseActionParam = {
        to: counterparty,
        amount,
        notes,
        deadline: isoDeadline,
        request: originCommitHash
      }
      const messageObj = {...txObj, apiCall: 'promise_payment'}
      this.setState({messageObj, newTxCall: true});
    }
    else if (this.state.nextApiCall === "receive_payment") {
      const { counterparty, amount, fee, notes, dueDate, inResponseToTX, eventCommitHash, txAuthor,  promiseCommitSignature } = this.props.rowInfo.original; // eventCommitHash,
      const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      const promise = {
        tx: {
          to: txAuthor,
          from: counterparty,
          amount,
	         fee,
          notes,
          deadline: isoDeadline,
        },
        request: inResponseToTX ? inResponseToTX : null
      }

      const txObj: any = {
        promise, // promise obj.
        promise_sig: promiseCommitSignature, // promise signature
        promise_commit: eventCommitHash // commit address
      }
      // this.props.receive_payment(txObj);
      const messageObj = {...txObj, apiCall: 'receive_payment'}
      this.setState({messageObj, newTxCall: true});
    }
    else if (this.state.nextApiCall === "") {
      // if nextApiCall === "" (an empty string), make btn access tx details page
      const { originTimeStamp, transaction_timestamp, dueDate, amount, status, counterparty, notes } = this.props.rowInfo.original; // /*originEvent*/

      this.setState({
        currentRowDataDetailed : [
           dueDate,
           transaction_timestamp,
           originTimeStamp,
           // originEvent,
           amount,
           counterparty,
           notes,
           status
         ]
      });

      this.toggleTxDetailModal();
    }
  };

  toggleTxDetailModal = ()=> {
    this.setState({
      txDetailModal: !this.state.txDetailModal
    });
  }

  public render() {
    const { classes } = this.props;
    // NOTE: uncomment below when testing button
    return (
      <div>
        <div>
          <div>
            { this.state.txStateStage === "recipient" || this.state.txStateStage === "spender"  ?
              <div style={{textTransform:"uppercase", width: '100%', fontSize:'.8rem', marginBottom:"5px"}}>
                Pending
              </div>

            : this.state.txStateStage === "completed"  ?
              <div style={{textTransform:"uppercase", width: '100%', fontSize:'.8rem'}}>
                { this.state.txStateStage }
              </div>

            :
              <div style={{textTransform:"uppercase", width: '100%', fontSize:'.8rem'}}>
                { this.state.txStateStage }
              </div>
            }
          </div>

          { this.state.txStateDirection === "pending" ?
              <Button
                variant="outlined"
                color="primary"
                className={ classes.colButton }
                onClick={ this.handlePendingTransaction }
                value={ this.state.nextApiCall }
                style={{margin:"3px"}}
              >
                {this.state.todoText}
              </Button>
          :
              <div/>
          }
        </div>

        {/* Toggle Confirmation Message (aka. InformativeModal) */}
          { this.state.newTxCall && this.state.txStateDirection === "pending" ?
            <TransactionTableModal
              handleTx={this.handleTableTx}
              message={JSON.stringify(this.state.messageObj)}
            />
          :
            <div/>
          }

        {/* Toggle Transaction Detail Full-Page Modal */}
          { this.state.txDetailModal ?
            <HoloFuelTransactionDetailPage
              currentRowDataDetailed={this.state.currentRowDataDetailed}
              toggleTxDetailModal={this.toggleTxDetailModal}
              ledger_state={this.props.ledger_state}
            />
          :
            <div/>
          }
      </div>
    )
  }
}

export default withStyles(styles)(TransactionDetailsButton);
