import * as React from 'react';
import classnames from 'classnames';
// import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import RequestProposalFormBtns from '../page-sub-components/input-fields/RequestProposalFormBtns';
import QrGenerator from '../page-sub-components/qr-generator/QrGenerator';
import InformativeModal from '../page-sub-components/modal/InformativeModal';


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  transferBtnBar: boolean,
  txType: string,
  showTransferBar: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  message: string
}

class HoloFuelTransferFormPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);

    this.state = {
      message: ""
    }
  };

  componentDidMount () {
    console.log("ProposalPage PROPS upon componentDidMount : ", this.props);
    // set the this.state.agentHash value  !!!!
  }

  sendProposal = async (txInfoObj: any) => {
    console.log("txInfoObj for Proposal Call : ", txInfoObj);
    // create propose const that amkes call and stores the result..
    const proposalResult = await this.props.propose_payment({txInfoObj}); // send as JSON
    this.sendConfirmationMessage(proposalResult);
  }

  sendConfirmationMessage = (proposalResult: any) => {
    // expected output: 'resolved'
    console.log('proposalResult >>> ', proposalResult);
    this.setState({ message: proposalResult });
  }

  resetMessage = () => {
    // resetting the message to blank after confirmed transaction result in modal...
    console.log('resetting the message propety on the proposal page... >>> ');
    this.setState({ message: "" });
  }

  public render () {
    const { message } = this.state;
    // console.log('Props in HoloFuelTransferFormPage:', this.props);
    const { classes, transferBtnBar, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    return (
    <div>
      <div className={classnames(classes.flexContainer, classes.reducedJumbotron)}>
        <div className={classes.flexItem}>
          <h3 className={classes.h3}>Current Balance</h3>
          <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
            {this.props.ledger_state.balance} + 200 HF
          </Typography>
        </div>
        <div className={classes.verticalLine}/>
        <div className={classes.flexItem}>
          <h3 className={classes.h3}>Credit limit</h3>
          <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
            {this.props.ledger_state.credit}  80 HF
          </Typography>
        </div>
      </div>

      <div>
        <div className={classes.jumbotronImg}>
          <h4 className={classes.h4}> Scan QR Code</h4>
          <QrGenerator agentHash={this.props.my_agent_hash}/>
        </div>

        <hr className={classes.horizontalLine}/>
        <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Send Funds
       </Typography>

        <RequestProposalFormBtns {...newProps} txType={this.props.txType} invokeTx={this.sendProposal} />
        <hr className={classnames(classes.horizontalLine, classes.txBottomLineSpace)}/>

      {/* Toggle Transaction Sending */}
        { transferBtnBar ?
          <Portal>
            <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
              <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
            </Slide>
          </Portal>
        :
          <div/>
        }

      {/* Toggle Confirmation Message */}
        { message !== "" ?
          <InformativeModal {...newProps} message={this.state.message} resetMessage={this.resetMessage}/>
        :
          <div/>
        }
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(HoloFuelTransferFormPage);
