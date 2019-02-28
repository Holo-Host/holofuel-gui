import * as React from 'react';
import classnames from 'classnames';
// import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import RequestProposalFormBtns from '../page-sub-components/input-fields/RequestProposalFormBtns';
import QRbutton from '../page-sub-components/input-fields/QRbutton';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
// import QrGenerator from '../page-sub-components/qr-generator/QrGenerator';


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  transferBtnBar: boolean,
  txType: string,
  showTransferBar: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {}

class HoloFuelRequestPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  componentDidMount () {
    console.log("holofuel REQUEST PAGE PROPS : ", this.props);
    // set the this.state.agentHash value  !!!!
  }

  makeRequest = (txInfoObj: any) => {
    console.log("txInfo for Request Call : ", txInfoObj);
    // make make_payment API call
    this.props.request_payment(txInfoObj);  // sending as JSON
  }


  public render () {
    console.log('HoloFuelRequestPage PROPS upon componentDidMount:', this.props);
    const { classes, transferBtnBar, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    return (
    <div>
      <div className={classnames(classes.flexContainer, classes.reducedJumbotron)}>
        <div className={classes.flexItem}>
          <h3 className={classes.h3}>Current Balance</h3>
          <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
            {this.props.ledger_state.balance ? `${this.props.ledger_state.balance} HF` : `Pending...`}
          </Typography>
        </div>
        <div className={classes.verticalLine}/>
        <div className={classes.flexItem}>
          <h3 className={classes.h3}>Credit limit</h3>
          <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
            {this.props.ledger_state.credit ? `${this.props.ledger_state.credit} HF`: `N/A`}
          </Typography>
        </div>
      </div>

      <div>
        <QRbutton agentHash={this.props.my_agent_hash} {...newProps}/>
        <br/>
        <br/>
        <br/>
        <hr className={classes.horizontalLine}/>
        <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Request Funds
       </Typography>
         <br/>
         <br/>


        <RequestProposalFormBtns {...newProps} txType={this.props.txType} invokeRequest={this.makeRequest} invokeProposal={this.makeRequest}/>
        <hr className={classnames(classes.horizontalLine, classes.txBottomLineSpace)}/>

        { transferBtnBar ?
          <Portal>
            <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
              <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
            </Slide>
          </Portal>
        :
          <div/>
        }
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(HoloFuelRequestPage);
