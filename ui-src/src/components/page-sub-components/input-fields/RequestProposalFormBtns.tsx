import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as moment from 'moment';
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import PersonPin from '@material-ui/icons/PersonPin';
import Message from '@material-ui/icons/Message';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import Timer from '@material-ui/icons/Timer';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import VerificationMessage from '../modal/VerificationMessage';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import Memo from '../memo/Memo';


type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;
type Moment = moment.Moment;

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
  deadline: string | Moment,
  deadlineDate: Date,
  deadlineTime: Date,
  message: any,
  errorMessage: string,
  transactionType: string // ,
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
      deadlineDate: new Date(),
      deadlineTime: new Date(new Date().getTime()),
      message: "",
      errorMessage: "",
      transactionType: ""
      // requestIdReference: ""
    };
  }

  el: LabelRef = null;
  handleRef (el: any) { // tslint:disable-line
    this.el = ReactDOM.findDOMNode(el!) as HTMLLabelElement | null;
  }

  // componentDidMount() {
  //   this.forceUpdate();
  // }

  handleChange = (name: StateKeyType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("selected event : ", event);
    // console.log("selected name : ", name);
  //TODO: Find a typed solution that allows the following instead of switch case:
  // The non-ts way:
    // this.setState({
    //   [name]: event.target.value,
    // });
    switch (name) {
      case 'recipient':
        this.setState({
          recipient: event.target.value.trim(),
        });
        break;

      case 'amount':
        this.setState({
          amount: event.target.value.trim(),
        });
        break;

      case 'notes':
        this.setState({
          notes: event.target.value.trim(),
        });
        break;

      default:
        return "";
    }
  };

  onChangeDate = (deadlineDate:Date) => {
    console.log('deadlineDate: ', deadlineDate)
    this.setState({deadlineDate})
  }
  onChangeTime = (deadlineTime:Date) => {
    console.log('Time: ', deadlineTime)
    this.setState({deadlineTime})
  }

  handleMakePayment = (tx_obj: object) => {
    this.setState({
      recipient: "",
      amount: "",
      notes: "",
      deadline: ""
    })

    // Now send obj to parent component for API invocation :
    console.log("propose_tx_obj : ", tx_obj);
    this.props.invokeProposal(tx_obj);
  };

  handleRequestPayment = (tx_obj: object) => {
    this.setState({
      recipient: "",
      amount: "",
      notes: "",
      deadline: ""
    })

    // Now send obj to parent component for API invocation :
    console.log("request_tx_obj : ", tx_obj);
    this.props.invokeRequest(tx_obj);
  };

  verifyTx(transactionType: any) {
    return ((e: any) => {
      e.preventDefault();

      const dateString = this.state.deadlineDate.toString();
      const timeString = this.state.deadlineTime.toString();
      const deadlineString = dateString + timeString;
      const txDeadline = moment(deadlineString).format();
      console.log("deadline", txDeadline);
      this.setState({deadline: txDeadline});


      const { recipient, amount, deadline, notes } = this.state;
      const isoDeadline: Moment = moment(deadline, moment.ISO_8601);

      // NOTE : verify the tx inputs here :
        // 1. Deadline: make sure the deadline datetime is not less than current datetime (ie: cannot choose  past date as the datetime for the transaction deadline)
        // 2. Amount: ensure amount is not negative or zero AND exists (ie: !== NULL)
        // 3. Counterparty: Enusre exists (!== NULL)

        console.log("Counterparty(AKA.Recipient), Amount, and Deadline SHOULD NOT BE an empty string || undefined ===>> counterparty: ", recipient);
        console.log("amount", amount);
        console.log("deadline", deadline);

        if (!recipient || !amount || !deadline) {
          this.setState({
            errorMessage: `Opps! /n It looks like we're missing some important transaction details. /n Please ensure that you have provided a counterparty, an amount, and a deadline for your transaction before submitting your transaction.`
          });
          // TODO: Update Alert to custom MUI Dialog Box

          alert(this.state.errorMessage);
        }
        else if (recipient && amount && deadline) {
          // console.log("Counterparty(AKA.Recipient), Amount, and Deadline SHOULD NOT BE an empty string || undefined ===>> counterparty: ", recipient);
          // console.log("amount", amount);
          // console.log("deadline", deadline);

          if (parseInt(amount) <= 0){
            this.setState({
              errorMessage: "Hmmmm... It looks like the amount you entered is invalid. /n Please review your transaction amount and ensure you provide a positive amount value."
            });

            // TODO: Update Alert to custom MUI Dialog Box
            alert(this.state.errorMessage);
          }

          const validDeadlineDate = moment(deadline).isValid();
          console.log("validDeadlineDate", validDeadlineDate);
          if (!validDeadlineDate || parseInt(moment(deadline).startOf('day').fromNow().split(" ")[0]) >  1) {
             this.setState({
                errorMessage: "Wait a minute... /n It looks like the date you entered is invalid. /n Please review your transaction deadline and ensure the date you provide is a present or future datetime."
              });

              // TODO: Update Alert to custom MUI Dialog Box
              alert(this.state.errorMessage);
            }

          const transactionObj = {
            counterparty: recipient,
            amount,
            notes,
            deadline: isoDeadline
          };

          this.setState({
            message: transactionObj,
            transactionType
          });
        }
      }
    );
  }

  resetMessage = () => {
    // resetting the message to blank after confirmed transaction result in modal...
    console.log('resetting the message property in the RequestProposalFormBtns component... >>> ');
    this.setState({ message: "" });
  }

  public render() {
    const { deadlineTime, deadlineDate } = this.state;
    const { classes, txType } = this.props;
    console.log("Inside the RequestProposalFormBtns...", this.props);

    const dateTimeNow: Date = new Date();
    const multiline:boolean = true;
    const fullWidth:boolean = true;
    const okToConfirm:boolean = true;
    const dialog:boolean = true;

    return (
      <div>
        <div className={classnames(classes.txWrapper, classes.root)}>
          <ul className={classnames(classes.flexContainer, classes.inputContainer)}>
            <li className={classnames(classes.formList, classes.flexItem)}>
               <TextField
                className={classes.margin}
                label={(<div><PersonPin/><span>Counterparty</span></div>)}
                variant="outlined"
                id="recipient-input"
                value={this.state.recipient}
                placeholder="HoloTester1--------------------------------------------------------------------------AAAEqzh31M"
                onChange={this.handleChange('recipient')}
                fullWidth={fullWidth}
                aria-describedby="recipient-input-text"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    input: classes.customFormOutlinedInput,
                    focused: classes.customFormFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
               <TextField
                className={classes.margin}
                label={(<div><img style={{ color:"#799ab6"}} width="20px" height="20px" src="/assets/icons/holo-icon_black.png" alt="holofuel_icon"/><span>Amount</span></div>)}
                variant="outlined"
                id="amount-input"
                type='number'
                value={this.state.amount}
                placeholder="335678976"
                onChange={this.handleChange('amount')}
                fullWidth={fullWidth}
                aria-describedby="amount-input-number"
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    input: classes.customFormOutlinedInput,
                    focused: classes.customFormFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
              />
            </li>

            <li className={classnames(classes.formList, classes.flexItem, classes.datetimeInput)}>
                <DateFormatInput
                  InputLabelProps={{
                    classes: {
                      root: classes.datetimeRoot,
                      input: classes.customFormOutlinedInput,
                      focused: classes.customFormFocused,
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                  name='date-input'
                  value={deadlineDate}
                  onChange={this.onChangeDate}
                  min={dateTimeNow}
                  dialog={dialog}
                  okToConfirm={okToConfirm}
                  variant='outlined'
                  fullWidth={fullWidth}
                  transformOrigin={{vertical:'center', horizontal:'left'}}
                  anchorOrigin={{vertical:'center', horizontal:'center'}}
                  InputProps={{ endAdornment: ( <InputAdornment position="end"></InputAdornment> ), startAdornment: ( <InputAdornment position="start"><div><HourGlassIcon/><span>Date Due</span></div></InputAdornment> )}}
                />

                <TimeFormatInput
                  InputLabelProps={{
                    classes: {
                      root: classes.datetimeRoot,
                      input: classes.customFormOutlinedInput,
                      focused: classes.customFormFocused,
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                  name='time-input'
                  value={deadlineTime}
                  onChange={this.onChangeTime}
                  dialog={dialog}
                  okToConfirm={okToConfirm}
                  selectableMinutesInterval={5}
                  variant='outlined'
                  fullWidth={fullWidth}
                  transformOrigin={{vertical:'center', horizontal:'left'}}
                  anchorOrigin={{vertical:'center', horizontal:'left'}}
                  InputProps={{ endAdornment: ( <InputAdornment position="end"></InputAdornment> ), startAdornment: ( <InputAdornment position="start"><div><Timer/><span>Time Due</span></div></InputAdornment> )}}
                />
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    /* root: classes.root, */
                    input: classes.customFormOutlinedInput,
                    focused: classes.customFormFocused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
                id="notes-input"
                label={(<div><Message/><span>Notes</span></div>)}
                placeholder="Fuel for the study session and lunch."
                multiline={multiline}
                rows="4"
                value={this.state.notes}
                onChange={this.handleChange('notes')}
                variant="outlined"
                fullWidth={fullWidth}
              />
            </li>
          </ul>
        </div>

        {/* Toggle Verification_Message Modal */}
          { this.state.message ?
            <VerificationMessage
              resetMessage={this.resetMessage}
              tx={this.state.transactionType}
              handleRequestPayment={this.handleRequestPayment}
              handleMakePayment={this.handleMakePayment}
              message={JSON.stringify(this.state.message)}
            />
          :
            <div/>
          }

        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classnames(classes.buttonMenu)}>
              {txType === "proposal" ?
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.verifyTx("proposal")}
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
                  onClick={this.verifyTx("request")}
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
