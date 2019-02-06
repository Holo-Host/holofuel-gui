import * as React from 'react';
import classnames from 'classnames';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { ProposalActionParam } from '../../../utils/types'; //  RequestActionParam, Ledger, ListTransactionsResult , DateTimeString, Address
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any,
  txType: string,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  recipient: string,
  amount: string,
  notes: string,
  deadline: string,
  // requestIdReference: string
}

class RequestProposalFormBtns extends React.Component<Props, State> {
  state = {
    recipient: "",
    amount: "",
    notes: "",
    deadline: "",
    // requestIdReference: ""
  };

  handleChange = (name: any) => (event: any) => {
    console.log("selected name : ", name);
    console.log("selected event : ", event);
    // this.setState({
    //   [name]: event.target.value,
    // });
  };

  handleMakePayment = () => {
    const { recipient, amount, deadline, notes } = this.state; // requestIdReference
    const propose_tx_obj: ProposalActionParam = {
      to: recipient,// this will be the payment requestor's AGENT_ADDRESS
      amount,
      notes,
      deadline,
      // request?: requestIdReference
    }
    console.log("calling : propose_payment >> ");
    console.log("propose_tx_obj : ", propose_tx_obj);
    
    // make propose_payment API call
    // this.props.propose_payment({propose_tx_obj});
  };

  public render() {
    const { classes, txType } = this.props;
    return (
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-flexible"
            label="Recipient"
            multiline
            rowsMax="4"
            value={this.state.recipient}
            onChange={this.handleChange('recipient')}
            className={classes.createTxTextField}
            margin="normal"
            helperText="Transaction Recipient"
            variant="outlined"
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={this.state.notes}
            onChange={this.handleChange('notes')}
            className={classes.createTxTextField}
            margin="normal"
            helperText="Transaction Description"
            variant="outlined"
          />

          <TextField
            id="outlined-number"
            label="Amount"
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            type="number"
            className={classes.createTxTextField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            helperText="Transaction Amount"
            variant="outlined"
          />
        </form>

        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar} >
            <div className={classnames(classes.buttonMenu)}>
              {txType === "proposal" ?
              <span>
                <OutlinedButton text="Send" color="primary" onClick={this.handleMakePayment}/>
                <OutlinedButton text="Cancel" color="primary" link="/holofuelsummary"/>
              </span>
              :
              <span>
                <OutlinedButton text="Cancel" color="primary" link="/holofuelsummary"/>
              </span>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(RequestProposalFormBtns);
