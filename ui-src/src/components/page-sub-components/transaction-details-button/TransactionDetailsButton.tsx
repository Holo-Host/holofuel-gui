// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// MUI Imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { ProposalActionParam } from '../../../utils/types';
import InformativeModal from '../modal/InformativeModal';
import HoloFuelTransactionDetailPage from '../../page-views/HoloFuelTransactionDetailPage';
import styles from '../../styles/page-sub-component-styles/TransactionDetailsButtonMuiStyles';

type Moment = moment.Moment;

export interface OwnProps {
  classes: any
  transactionState: any,
  rowInfo: any,
  resetPage: () => void
};
export type Props = OwnProps & DispatchProps & StateProps;

export interface State {
  transactionState: string,
  txStateDirection:string,
  txStateStage: string,
  todoText: string | undefined,
  nextApiCall: string ,
  message: string,
  statusText: string,
  currentRowDataDetailed: Array<any> | null,
  txDetailModal: boolean,
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
      message: "",
      statusText: "",
      currentRowDataDetailed: null,
      txDetailModal: false,
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

  forceReset = (apiResult: any) => {
    console.log("apiResult", apiResult);

    // hack to force a reset >> refactor with modal...
    this.setState({
      reset: !this.state.reset
    })
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
          statusText="Payment Proposed";
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
          todoText = 'Accept Final Payment';
          statusText = "Payment Proposed";
          break;
        }
        case 'spender': {
          nextApiCall = 'propose_payment';
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

  handlePendingTransaction = async () => {
    if (this.state.nextApiCall === "propose_payment") {
      const { counterparty, amount, notes, dueDate, originCommitHash } = this.props.rowInfo.original;
      const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      const approved_proposal_obj: ProposalActionParam = {
        to: counterparty,
        amount,
        notes,
        deadline: isoDeadline,
        request: originCommitHash
      }
      // this.props.propose_payment(approved_proposal_obj);
      const proposalResult = await this.props.propose_payment(approved_proposal_obj); //sending as JSON
      // this.sendConfirmationMessage(proposalResult, approved_proposal_obj);
      this.forceReset(proposalResult);
    }
    else if (this.state.nextApiCall === "receive_payment") {
      const { counterparty, amount, notes, dueDate, inResponseToTX, eventCommitHash, txAuthor,  proposalCommitSignature } = this.props.rowInfo.original; // eventCommitHash,
      const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      const proposal = {
        tx: {
          to: txAuthor,
          from: counterparty,
          amount,
          notes,
          deadline: isoDeadline,
        },
        request: inResponseToTX ? inResponseToTX : null
      }

      const receive_payment_obj: any = {
        proposal, // proposal obj.
        proposal_sig: proposalCommitSignature, // proposal signature
        proposal_commit: eventCommitHash // commit address
      }
      // this.props.receive_payment(receive_payment_obj);

      const receivePaymentResult = await this.props.receive_payment(receive_payment_obj); //sending as JSON
      // this.sendConfirmationMessage(receivePaymentResult, receive_payment_obj);
      this.forceReset(receivePaymentResult);
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

  sendConfirmationMessage = (txResult: any, txInfoObj: any) => {
    this.setState({ message: `You just made the following transaction: ${JSON.stringify(txInfoObj)}.`});
  }

  resetMessage = () => {
    this.setState({ message: "" });
    this.props.resetPage();
  }

  toggleTxDetailModal = ()=> {
    this.setState({
      txDetailModal: !this.state.txDetailModal
    });
  }

  public render() {
    const { classes, ...newProps } = this.props;
    // NOTE: uncomment below when testing button
    return (
      <div>
        <div>
          <div>
            { this.state.txStateStage === "recipient" || this.state.txStateStage === "spender"  ?
              <div style={{textTransform:"uppercase", width: '100%'}}>
                Pending
              </div>

            : this.state.txStateStage === "completed"  ?
              <div style={{textTransform:"uppercase", width: '100%', marginTop:'13px'}}>
                { this.state.txStateStage }
              </div>

            :
              <div style={{textTransform:"uppercase", width: '100%'}}>
                { this.state.txStateStage }
              </div>
            }
          </div>

          { this.state.txStateStage !== "completed" ?
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
          { this.state.message ?
            <InformativeModal {...newProps} confirmMessage={  this.state.message } resetMessage={this.resetMessage}/>
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
