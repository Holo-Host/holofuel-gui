// Main Imports
import * as React from 'react';
// MUI Imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Local Imports
import styles from '../../styles/page-sub-component-styles/TransactionDetailsButtonMuiStyles';


export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any
  transactionState: any,
  column: string,
  rowInfo: any
};
export type Props = OwnProps;

export interface State {
// The components optional internal state
  transactionState: string,
  txStateDirection:string,
  txStateStage: string,
  todoText: string | undefined,
  nextApiCall: string
};

class TransactionDetailsButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      transactionState: "",
      txStateDirection:"",
      txStateStage: "",
      todoText: undefined,
      nextApiCall: "/"
    }
    this.configureTransactionState();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.transactionState !== state.transactionState) {
      const txStateDirection = props.transactionState.split("/")[0];
      const txStateStage =props.transactionState.split("/")[1];
      return {
        transactionState: props.transactionState,
        txStateDirection,
        txStateStage
      };
    }
    console.log("transactionState >>>> ", state.transactionState);
    return ({ transactionState: state.transactionState });
  }

  componentDidMount = () => {
    console.log("!>!>!>!>!>>!INSIDE COMPONENT DID MOUNT !!>!>!>!>!");
    this.configureTransactionState();
    // this.props.fetch_state();
  }

  configureTransactionState = () => {
    let nextApiCall = "/";
    let todoText = "";
    console.log("!>!>!>!>!>>!INSIDE configureTransactionState!!>!>!>!>!");

    if(this.state.txStateDirection === "incoming"){
      switch (this.state.txStateStage) {
        case 'requested': {
          nextApiCall = 'propose_payment';
          todoText = 'Send Funds'; // (INITIATOR'S VIEW): request to send money or to recieve money
        }
        case 'rejected': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Decline';
        }
        case 'accepted': {
          nextApiCall = 'receive_payment';
          todoText = 'Accept Final Payment';
        }
        case 'refunded': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Refund';
        }
        default:
          return null;
      }
    }
    if(this.state.txStateDirection === "outgoing"){
      switch (this.state.txStateStage) {
        case 'approved': {
           // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Proposal';
        }
        case 'declined': {
             // no api call ... only need to review details
          nextApiCall = '';
          todoText = 'Review Decline';
        }
        case 'completed': {
          nextApiCall = '';
          todoText = 'Review Final Payment';
        }
        case 'recovered': {
  // TODO: determine if there is an API for this:
          nextApiCall = '???';
          todoText = 'Review Refund';
        }
        default:
          return null;
      }
    }

    this.setState({ nextApiCall, todoText });
  };

  handlePendingTransaction = (name: any) => (event: any) => {
     // name (should) === 'nextApiCall'
    // this.setState({ [name]: event.target.value });

    // if nextApiCall === "" (an empty sting), make btn access tx details page
    console.log("you should be re-routing to the details page...");
  };

  public render() {
    const { classes, column } = this.props;
    console.log("TransactionDetailsButton props", this.props);
    console.log("TransactionDetailsButton state", this.state);

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
              onClick={ this.handlePendingTransaction(this.state.nextApiCall) }
              value={ this.state.nextApiCall }
            >
              todo text
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
              onClick={ this.handlePendingTransaction(this.state.nextApiCall) }
              value={ this.state.nextApiCall }
              style={{margin:"5px"}}
            >
              todo text
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
