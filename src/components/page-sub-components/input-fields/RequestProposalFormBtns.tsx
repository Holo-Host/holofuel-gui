import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import PersonPin from '@material-ui/icons/PersonPin';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Message from '@material-ui/icons/Message';
import Timer from '@material-ui/icons/Timer';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { ProposalActionParam, RequestActionParam } from '../../../utils/types'; //  RequestActionParam, Ledger, ListTransactionsResult , DateTimeString, Address
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import Memo from '../memo/Memo';

//TODO : Apply logic to buttons >>


// Recipient (known by their role in proposal >> only true they DID NOT initate the proposal (ie. there is no request value in propsoal struct)):
//1.) Determine whether Local Agent is Recipient of current TX (ie. ...)
//2.) Discern TX Event type
//3.) Run conditional: If the event === "receive_payment or reject_payment"  && the  {
  //    then the button action text should to "OK" or "Reject"
  //  }


type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any,
  txType: string,
  showTransferBar: (txType:any) => void,
  invokeProposal: (txType:any) => void,
  invokeRequest: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  recipient: string,
  amount: string,
  notes: string,
  deadline: string,
  // requestIdReference: string
}
// type StateInput = Pick<State, StateKeyType>| null;

class RequestProposalFormBtns extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      recipient: "",
      amount: "",
      notes: "",
      deadline: "",
      // requestIdReference: ""
    };
  }

  el: LabelRef = null;
  handleRef (el: any) { // tslint:disable-line
    this.el = ReactDOM.findDOMNode(el!) as HTMLLabelElement | null;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  handleChange = (name: StateKeyType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("selected event : ", event);
    // console.log("selected name : ", name);
  //TODO: Find a typed solution that allows the following isntead of switch case:
  // The non-ts way:
    // this.setState({
    //   [name]: event.target.value,
    // });
    switch (name) {
      case 'recipient':
        this.setState({
          recipient: event.target.value,
        });
        break;

      case 'amount':
        this.setState({
          amount: event.target.value,
        });
        break;

      case 'notes':
        this.setState({
          notes: event.target.value,
        });
        break;

      case 'deadline':
        this.setState({
          deadline: event.target.value,
        });
        break;

      default:
        return "";
    }
  };

  handleMakePayment = () => {
    const { recipient, amount, deadline, notes } = this.state; // requestIdReference
    const tx_obj: ProposalActionParam = {
      to: recipient,// this will be the payment requestor's/payment recipeient's AGENT_ADDRESS
      amount,
      notes,
      deadline,
      // request?: requestIdReference
    }
    console.log("propose_tx_obj : ", tx_obj);
    // Now send obj to parent component for API invocation :
    this.props.invokeProposal({tx_obj});
  };

  handleRequestPayment = () => {
    const { recipient, amount, deadline, notes } = this.state; // requestIdReference
    const tx_obj: RequestActionParam = {
      from: recipient,// this will be the payment requestor's/payment recipeient's AGENT_ADDRESS
      amount,
      notes,
      deadline,
      // request?: requestIdReference
    }
    console.log("propose_tx_obj : ", tx_obj);
    // Now send obj to parent component for API invocation :
    this.props.invokeRequest({tx_obj});
  };

  public render() {
    const multiline:boolean = true;
    console.log("Inside the RequestProposalFormBtns...", this.props);

    const { classes, txType } = this.props;
    return (
      <div>
        <div className={classnames(classes.txWrapper, classes.root)}>
          <ul className={classes.flexContainer}>
            <li className={classnames(classes.formList, classes.flexItem)}>
              <FormControl className={classnames(classes.formInputContainer, classes.formControl)}>
                 <InputLabel
                   htmlFor="recipient-input"
                   classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                    }}
                  />
                 <Input
                   id="recipient-input"
                   value={this.state.recipient}
                   onChange={this.handleChange('recipient')}
                   aria-describedby="recipient-input-text"
                   startAdornment={<InputAdornment position="start"><PersonPin/></InputAdornment>}
                   classes={{
                     underline: classes.customFormUnderline
                  }}
                 />
                 <FormHelperText id="recipient-input-text">Type in the Recipient ID</FormHelperText>
               </FormControl>
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <FormControl className={classnames(classes.formInputContainer, classes.formControl)}>
                 <InputLabel
                   htmlFor="amount-input"
                   classes={{
                      root: classes.root,
                      input: classes.customFormInput,
                      focused: classes.customFormFocused,
                    }}
                  />
                 <Input
                   id="amount-input"
                   type="number"
                   value={this.state.amount}
                   onChange={this.handleChange('amount')}
                   aria-describedby="amount-input-number"
                   startAdornment={<InputAdornment position="start"><img style={{ color:"#799ab6"}} width="20px" height="20px" src="/assets/icons/holo-icon_black.png" alt="holofuel_icon"/></InputAdornment>}
                   classes={{
                     underline: classes.customFormUnderline
                   }}
                 />
                 <FormHelperText id="amount-input-text">Type the amount you'll be sending.</FormHelperText>
               </FormControl>
            </li>

            <li className={classnames(classes.formList, classes.flexItem, classes, classes.areaTextBox)}>
              <FormControl className={classnames(classes.formInputContainer, classes.formControl)} variant="outlined">
                <InputLabel
                  htmlFor="deadline-input"
                  classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                   }}
                />
                <Input
                  id="deadline-input"
                  type="date"
                  value={this.state.deadline}
                  onChange={this.handleChange('deadline')}
                  aria-describedby="recipient-input-text"
                  startAdornment={<InputAdornment position="start"><Timer/></InputAdornment>}
                  classes={{
                    root: classes.root,
                    input: classes.customFormInput,
                    underline: classes.customFormUnderline,
                    focused: classes.customFormFocused,
                  }}
                />
                <FormHelperText id="deadline-input">Type in the transaction cut-off date</FormHelperText>
              </FormControl>
            </li>
           {/* </ul>
         </div>

          <div className={classnames(classes.txWrapper, classes.root)}>
            <ul className={classes.flexContainer}> */}
            <li className={classnames(classes.formList, classes.flexItem)}>
              <FormControl className={classnames(classes.formInputContainer, classes.formControl)} variant="outlined">
                <InputLabel
                  htmlFor="notes-input"
                  classes={{
                     root: classes.root,
                     input: classes.customFormInput,
                     focused: classes.customFormFocused,
                   }}
                >
                  <Message/>
                </InputLabel>
                <OutlinedInput
                  id="notes-input"
                  multiline={multiline}
                  rows="4"
                  value={this.state.notes}
                  onChange={this.handleChange('notes')}
                  labelWidth={this.el ? this.el.offsetWidth : 3}
                  classes={{
                    root: classes.root,
                    input: classes.customFormOutlinedInput,
                    focused: classes.customFormFocused
                 }}
                />
                <FormHelperText id="notes-input">Describe a few details about your transaction</FormHelperText>
              </FormControl>
            </li>
          </ul>
        </div>

        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classnames(classes.buttonMenu)}>
              {txType === "proposal" ?
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.handleMakePayment}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Send</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  olor="primary"
                  link="/holofuelsummary"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
              </span>
              :
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.handleRequestPayment}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Request</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  color="primary"
                  link="/holofuelsummary"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
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
// {/* ref={el => {this.handleRef(el)}} */}
