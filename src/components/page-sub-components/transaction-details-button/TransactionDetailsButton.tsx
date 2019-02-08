// Main Imports
import * as React from 'react';
import { Link } from 'react-router-dom';
// MUI Imports
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// Local Imports
import styles from '../../styles/page-sub-component-styles/TransactionDetailsButtonMuiStyles';


export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  transactionState: any,
  classes: any
};
export type Props = OwnProps;

export interface State {
// The components optional internal state
  transactionState: "",
  buttonText: "",
  route: ""
};

class TransactionDetailsButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      transactionState: "",
      buttonText: "",
      route: ""
    }
    this.configureTransactionState();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.transactionState !== state.transactionState) {
      return {
        transactionState: props.transactionState,
      };
    }
    const { transactionState } = state;
    console.log("transactionState >>>> ", transactionState);
    return ({ transactionState });
  }

  componentDidUpdate = () => {
    this.configureTransactionState();
    // this.props.fetch_state();
  }

  configureTransactionState = () => {
    const txState: any = this.state.transactionState;
    let route;
    let buttonText;
    // go to the transaction detail page >> sorted by NAME of transaction state...
    switch (txState) {
      case 'requested': {
        route = 'requestsent';
        buttonText = 'Sent'; // (INITIATOR'S VIEW): request to send money or to recieve money
      }
      case 'proposed': {
        route = '';
        buttonText = '';  // (RECIPIENT'S VIEW): proposal to receive money or to send money
      }
      case 'accepted': {
        route = 'pendingfinalapproval';
        buttonText = 'Approval Pending'; // (INITIATOR'S & RECIPIENT'S VIEW): : accepted request to receive or to send money
      }
      case 'rejected': {
        route = 'rejectedrequest';
        buttonText = 'Review'; // (INITIATOR'S & RECIPIENT'S VIEW): : accepted request to receive or to send money
      }
      case 'refunded': {
        route = 'refundedrequest';
        buttonText = 'Review'; // (INITIATOR'S & RECIPIENT'S VIEW): : accepted request to receive or to send money
      }
      default:
        return null;
    }

    this.setState({ route, buttonText });
  };

  handlePendingTransaction = (name: any) => (event: any) => {
     // name (should) === 'buttonText'
    // this.setState({ [name]: event.target.value });
    console.log("you should be re-routing to the detials page...");
  };

  public render() {
    const { classes } = this.props;
    // console.log("TransactionDetailsButton props", this.props);
    // console.log("TransactionDetailsButton state", this.state);
    return (
      <div>
       <Link to={this.state.route}>
          <Button
            variant="outlined"
            color="primary"
            className={ classes.button }
            onClick={ this.handlePendingTransaction('buttonText') }
            value={ this.state.transactionState }
          >
            { this.state.buttonText }
          </Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(TransactionDetailsButton);
