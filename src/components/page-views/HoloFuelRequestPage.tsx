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
  agentHash: string,
}

const EXAMPLE_AGENT_HASH = '65ra8a76asfT0KAafFL5eASUasd9847aaR89F'

class HoloFuelRequestPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);

    this.state = {
      agentHash: EXAMPLE_AGENT_HASH,
    }
  };

  componentDidMount () {
    console.log("holofuel REQUEST PAGE PROPS : ", this.props);
    // set the this.state.agentHash value  !!!!
  }

  makeRequest = (txInfoObj: any) => {
    console.log("txInfo for Proposal Call : ", txInfoObj);
    // make make_payment API call
    this.props.request_payment({txInfoObj});  // send as JSON
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
          <QrGenerator agentHash={this.state.agentHash}/>
        </div>

        <hr className={classes.horizontalLine}/>
        <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Request Funds
       </Typography>

        <RequestProposalFormBtns {...newProps} txType={this.props.txType} invokeTx={this.makeRequest} />
        <hr className={classes.horizontalLine}/>

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
