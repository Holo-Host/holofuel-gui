import * as React from 'react';
// import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import TransactionTables from '../page-sub-components/hoc-table/SummaryTransactionTables';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import '../styles/page-styles/scaffold-styles.css';

export interface OwnProps {
  classes: any,
  txType: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  newprofile:boolean
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txEndDate: string | undefined,
  txStartDate: string | undefined,
  txBatchType: string | undefined,
  currentTxBatchInfo: {newer:{}, over:{}} | null,
  data: {} | null,
  prevProps: any,
}

class HoloFuelSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      currentTxBatchInfo: null,
      data: {},
      prevProps: {}
    };
  };

  public componentDidMount () {
    this.props.list_transactions({});
    this.props.list_promises();
    this.props.list_requests();
    this.props.list_pending();
  }

  componentDidUpdate(prevProps:any, prevState:any ) {
    if (prevProps.list_transactions !== this.props.list_transactions || prevProps.list_pending !== this.props.list_pending ) {
      this.render();
    }
  }

   public render () {
      const { classes, transferBtnBar, ...newProps } = this.props;
      const gutterBottom : boolean = true;

      return (
        <div>
          <div className={classes.jumbotron}>
            <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
              {
		this.props.ledger_state.balance && this.props.ledger_state.credit && this.props.ledger_state.payable
		? <div><img src="/assets/icons/holo-logo.png" alt="holo-logo" width="85" className={classes.hcLogoLg} /> {`${this.props.ledger_state.balance + this.props.ledger_state.credit - this.props.ledger_state.payable}`}</div>
                : `Pending...`
              }
            </Typography>
            <hr style={{color:"#0e094b8f"}} />
            <h3 className={classes.h3}>
              {this.props.ledger_state.credit
                ? <span>(<img src="/assets/icons/holo-logo.png" alt="holo-logo" width="25" className={classes.hcLogoSm}/>{`${this.props.ledger_state.credit}`} Credit)</span>
                : <span>Credit</span>
              }
	      <span> + </span>
	      {this.props.ledger_state.balance
                ? <span>(<img src="/assets/icons/holo-logo.png" alt="holo-logo" width="25" className={classes.hcLogoSm}/>{`${this.props.ledger_state.balance}`} Balance)</span>
                : <span>Balance</span>
              }
	      <span> - </span>
              { this.props.ledger_state.payable
                ? <span>(<img src="/assets/icons/holo-logo.png" alt="holo-logo" width="25" className={classes.hcLogoSm}/>{`${this.props.ledger_state.payable}`} Payable)</span>
                : <span>Payable</span>
              }
              <div>
	      { this.props.ledger_state.fees
                ? <span>(<img src="/assets/icons/holo-logo.png" alt="holo-logo" width="25" className={classes.hcLogoSm}/>{`${this.props.ledger_state.fees}`} Fees)</span>
                : <span>(Fees)</span>
              }
	      </div>
            </h3>
          </div>

          <div>
            {/* { this.props.list_of_pending.promises && this.props.list_of_pending.requests ?
              <Typography className={classnames(classes.tableHeader, classes.pageHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
                Transaction History
              </Typography>
            :
              <div/>
            } */}

            <TransactionTables newprofile={this.props.newprofile} {...newProps} />

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

export default withStyles(styles)(HoloFuelSummaryPage);
