import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import RequestPromiseFormBtns from '../page-sub-components/input-fields/RequestPromiseFormBtns';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
// import QrGenerator from '../page-sub-components/qr-generator/QrGenerator';


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  location:any,
  transferBtnBar: boolean,
  txType: string,
  showTransferBar: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  confirmation: string
}

class HoloFuelRequestPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      confirmation: ""
    }
  };

  componentDidMount () {
  }

  makeRequest = async (txInfoObj: any) => {
    // make make_payment API call
    // this.props.request_payment(txInfoObj);  // sending as JSON

    // creates request_payment const that make call and stores the result..
    const requestResult = await this.props.request_payment(txInfoObj); // send as JSON
    this.sendConfirmationMessage(requestResult, txInfoObj);
  }

  sendConfirmationMessage = (requestResult: any, txInfoObj: any) => {

    this.setState({ confirmation: txInfoObj});
  // Can prompt for a confirm message here with request info...
  }

  resetMessage = () => {
    // resetting the message to blank after confirmed transaction result in modal...
    this.setState({ confirmation: "" });
  }

  public render () {
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
        <br/>
        <Typography className={classnames(classes.pageHeader,classes.tableHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Request Funds
       </Typography>
         <br/>
         <br/>

         <div style={{ margin:'0 auto' }}>
           <RequestPromiseFormBtns {...newProps} location={this.props.location} txType={this.props.txType} invokeRequest={this.makeRequest} invokePromise={this.makeRequest}/>
        </div>

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
