import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as moment from 'moment';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PersonPin from '@material-ui/icons/PersonPin';
import Message from '@material-ui/icons/Message';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import VerificationMessage from '../modal/VerificationMessage';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;
type Moment = moment.Moment;

export interface OwnProps {
  classes: any,
  location: any,
  txType: string,
  showTransferBar: (txType:any) => void,
  invokePromise: (txType:any) => void,
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
  transactionType: string
}

class RequestPromiseFormBtns extends React.Component<Props, State> {
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
          notes: event.target.value,
        });
        break;

      default:
        return "";
    }
  };

  onChangeDate = (deadlineDate:Date) => {
    this.setState({deadlineDate})
  }
  onChangeTime = (deadlineTime:Date) => {
    this.setState({deadlineTime})
  }

  handleMakePayment = (tx_obj: object) => {
    this.setState({
      recipient: "",
      amount: "",
      notes: "",
      deadline: ""
    })
    this.props.invokePromise(tx_obj);
  };

  handleRequestPayment = (tx_obj: object) => {
    this.setState({
      recipient: "",
      amount: "",
      notes: "",
      deadline: ""
    })
    this.props.invokeRequest(tx_obj);
  };

  verifyTx(transactionType: any) {
    return ((e: any) => {
      e.preventDefault();
      const day = this.state.deadlineDate.getDate();
      const month = this.state.deadlineDate.getMonth();
      const year = this.state.deadlineDate.getFullYear();
      const timeHours = this.state.deadlineTime.getHours();
      const timeMinutes= this.state.deadlineTime.getMinutes();
      const deadlineString  = new Date(year,month,day,timeHours,timeMinutes, 0);
      const txDeadline = moment(deadlineString);

      this.setState({
        deadline: txDeadline,
        transactionType
      });
      this.digestTxContent(txDeadline);
    });
  }

  digestTxContent = (txDeadline:Moment) => {
    const { recipient, amount, notes } = this.state;

    const isoDeadline: Moment = moment(txDeadline, moment.ISO_8601);

    // NOTE : verify the tx inputs here :
      // 1. Deadline: make sure the deadline datetime is not less than current datetime (ie: cannot choose  past date as the datetime for the transaction deadline)
      // 2. Amount: ensure amount is not negative or zero AND exists (ie: !== NULL)
      // 3. Counterparty: Enusre exists (!== NULL)

      if (!recipient || !amount || !txDeadline) {
        this.setState({
          errorMessage: `Opps! \n It looks like we're missing some important transaction details. \n Please ensure that you have provided a counterparty, an amount, and a deadline for your transaction before submitting your transaction.`
        });

        // TODO: Update Alert to custom MUI Dialog Box
        return alert(this.state.errorMessage);
      }
      else if (recipient && amount && txDeadline) {
        if (parseInt(amount) <= 0){
          this.setState({
            errorMessage: "Hmmmm... It looks like the amount you entered is invalid. \n Please review your transaction amount and ensure you provide a positive amount value."
          });

          // TODO: Update Alert to custom MUI Dialog Box
          return alert(this.state.errorMessage);
        }

        // const validDeadlineDate = moment(deadline).isValid();
        const transactionObj = {
          counterparty: recipient,
          amount,
          notes,
          deadline: isoDeadline
        };

        return this.setState({
          message: transactionObj
        });
    }
  }

  resetMessage = () => {
    this.setState({ message: "" });
  }

  public render() {
    const { classes, txType } = this.props;
    const multiline:boolean = true;
    const fullWidth:boolean = true;
    return (
      <div>
        <div className={classnames(classes.txWrapper, classes.root)}>
          <Paper className={classes.txPaperRoot} square={false} elevation={4}>
          <ul className={classnames(classes.flexContainer, classes.inputContainer)}>
            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
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
              </Paper>
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
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
              </Paper>
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
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
                  placeholder="Time to fuel up!"
                  multiline={multiline}
                  rows="4"
                  value={this.state.notes}
                  onChange={this.handleChange('notes')}
                  variant="outlined"
                  fullWidth={fullWidth}
                />
              </Paper>
            </li>
          </ul>
          </Paper>
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
              {txType === "promise" || this.props.location === "/holofuelpromise" ?
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.verifyTx("promise")}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Send HoloFuel</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  color="primary"
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
                  <span className={classes.innerBtnText}>Request HoloFuel</span>
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

export default withStyles(styles)(RequestPromiseFormBtns);
