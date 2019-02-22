// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// MUI Imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-sub-component-styles/TransactionDetailsButtonMuiStyles';
import { ProposalActionParam } from '../../../utils/types';

type Moment = moment.Moment;

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any
  transactionState: any,
  column: string,
  rowInfo: any
};
export type Props = OwnProps & DispatchProps & StateProps;

export interface State {
// The components optional internal state
  transactionState: string,
  txStateDirection:string,
  txStateStage: string,
  todoText: string | undefined,
  nextApiCall: string ,
  message: string
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
      message: ""
    }
    this.configureTransactionState();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.transactionState !== state.transactionState) {
      const txStateDirection = props.transactionState.split("/")[0];
      const txStateStage =props.transactionState.split("/")[1];
      return {
        transactionState: props.transactionState,
        txStateDirection: txStateDirection === "incoming" ? "recipient" : txStateDirection === "outgoing" ? "spender" : txStateDirection ,
        txStateStage
      };
    }
    // console.log("transactionState >>>> ", state.transactionState);
    return ({ transactionState: state.transactionState });
  }

  componentDidMount = () => {
    // console.log("!>!>!>!>!>>!INSIDE COMPONENT DID MOUNT !!>!>!>!>!");
    this.configureTransactionState();
    // this.props.fetch_state();
  }

  configureTransactionState = () => {
    let nextApiCall = "/";
    let todoText = "";
    // console.log("!>!>!>!>!>>!INSIDE configureTransactionState!!>!>!>!>!", this.state);

    if(this.state.txStateDirection === "recipient"){
        switch (this.state.txStateStage) {
        case 'requested': {
          nextApiCall = '';
          todoText = 'Review Request'; // (INITIATOR'S VIEW): request to send money or to recieve money
          break;
          }
        case 'rejected': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Rejection';
          break;
        }
        case 'accepted': {
          nextApiCall = 'receive_payment';
          todoText = 'Accept Final Payment';
          break;
        }
        case 'refunded': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Refund';
          break;
        }
        default:
          return null;
      }
    }
    if(this.state.txStateDirection === "spender"){
      switch (this.state.txStateStage) {
        case 'approved': {
          nextApiCall = '';
          todoText = 'Review Payment';
          break;
        }
        case 'declined': {
          // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Decline';
          break;
        }
        case 'completed': {
          nextApiCall = '';
          todoText = 'Review Final Payment';
          break;
        }
        case 'recovered': {
          // TODO: determine if there is an API for this:
          nextApiCall = '???';
          todoText = 'Review Refund';
          break;
        }
        default:
          return null;
      }
    }
    // still need to add this functionality >> DURING DATA-REFACTOR any list_of_pending transactions that === incoming requests should create a prop that sets pendingCase==="spender", as the current user will be the spender when responding to a request to pay.
    else if(this.props.rowInfo.pendingCase === "spender"){
      nextApiCall = 'propose_payment';
      todoText = 'Send Funds';
    }
    this.setState({ nextApiCall, todoText });
  };

  handlePendingTransaction = async () => {

    if (this.state.nextApiCall === "propose_payment") {

      const { counterparty, amount, notes, dueDate, eventCommitHash } = this.props.rowInfo.original;
      const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      const approved_proposal_obj: ProposalActionParam = {
        to: counterparty,
        amount,
        notes,
        deadline: isoDeadline,
        request: eventCommitHash
      }
      // console.log("propose_tx_obj : ", approved_proposal_obj);
      const proposalResult = await this.props.propose_payment(approved_proposal_obj); //sending as JSON
      this.sendConfirmationMessage(proposalResult, approved_proposal_obj);
    }
    else if (this.state.nextApiCall === "receive_payment") {
      // const { counterparty, amount, notes, dueDate } = this.props.rowInfo.original;
      // const isoDeadline: Moment = moment(dueDate, moment.ISO_8601);
      // const approved_proposal_obj: ProposalActionParam = {
      //   to: recipient,
      //   amount,
      //   notes,
      //   deadline: isoDeadline,
      //   request: eventCommitHash
      // }
      // console.log("propose_tx_obj : ", approved_proposal_obj);
      // const proposalResult = await this.props.propose_payment(approved_proposal_obj); //sending as JSON
      // this.sendConfirmationMessage(proposalResult, approved_proposal_obj);
      //
      // proposal: Proposal, proposal_sig: Signature, proposal_commit: Address
    }
    else if (this.state.nextApiCall === "") {
      // if nextApiCall === "" (an empty sting), make btn access tx details page
      // const { event, counterparty, amount, notes, dueDate, originEvent, originTimeStamp, transaction_timestamp } = this.props.rowInfo.original;

      // record details into redux state and reroute to details page..
      // const { location } = this.props.history;
      // console.log("you should be re-routing to the details page...");
    }
  };

  sendConfirmationMessage = (txResult: any, txInfoObj: any) => {
    // expected output: 'resolved'
    // console.log('The attempt to send money (the proposal) resolved to be : >>> ', txResult);
    this.setState({ message: `You just made the following transaction: ${txInfoObj}.`});
    // console.log("MESSAGE : Inside the proposal page >> : ", this.state.message);
  }


  public render() {
    const { classes, column } = this.props;
    // console.log("TransactionDetailsButton props", this.props);
    // console.log("TransactionDetailsButton state", this.state);

    return (
      <div>
        { column === "status" ?
          <div style={{textTransform:"uppercase"}}>
            { this.state.txStateStage }
          </div>

        : column === "todo" ?
          <div>
            <Button
              variant="outlined"
              color="primary"
              className={ classes.smallButton }
              onClick={ this.handlePendingTransaction }
              value={ this.state.nextApiCall }
            >

              {this.state.todoText}
            </Button>
          </div>

        : column === "both" ?
          <div className={classes.flexContainer}>
            <div style={{textTransform:"uppercase", marginTop:'5px', marginBottom:'10px'}}>
              { this.state.txStateStage }
            </div>

            <Button
              variant="outlined"
              color="primary"
              className={ classes.mobileButton }
              onClick={ this.handlePendingTransaction }
              value={ this.state.nextApiCall }
              style={{margin:"5px"}}
            >
              {this.state.todoText}
            </Button>
          </div>
        :
          <div/>
        }
      </div>
    )
  }
}

export default withStyles(styles)(TransactionDetailsButton);
