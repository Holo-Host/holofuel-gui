import * as React from 'react';
// local page-views imports :
import HoloFuelSummaryPage from '../components/page-views/HoloFuelSummaryPage';
// import HoloFuelTxSummary from '../components/page-views/HoloFuelTxSummary';
import HoloFuelTranferFormPage from '../components/page-views/HoloFuelTransferFormPage';
import AboutHolo from "../components/page-views/AboutHolo";
import HoloFuelTransactionDetailPage from '../components/page-views/HoloFuelTransactionDetailPage';
// import Dashboard from '../components/page-sub-components/dashboard-header/Dashboard';
import createMockApiData, { instanceListData } from  '../utils/seed-data/mock-api-data'; //
import { Ledger } from '../utils/types'; // ListTransactionsResult , ProposalActionParam, RequestActionParam, Address, DateTimeString
import AppNavBar from '../components/page-sub-components/app-nav-bar/AppNavBar';
import SubNavBar from '../components/page-sub-components/app-nav-bar/SubNavBar';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from '../components/styles/page-styles/DefaultPageMuiStyles';
import '../components/styles/page-sub-component-styles/scaffold-styles.css';


export interface OwnProps {
  // These are props the component has received from its parent component
  className: any,
  classes: any,
  history: any
}
export interface StateProps {
  // Props that are set by mapStateToProps
  ledger_state: Ledger,
  list_of_instance_info: typeof instanceListData,
  list_of_transactions: typeof createMockApiData.list_of_request_transactions,
  list_of_requests: typeof createMockApiData.list_of_requests,
  list_of_proposals: typeof createMockApiData.list_of_proposals,
  view_specific_request: typeof createMockApiData.get_request_kv_store[0],
  view_specific_proposal: typeof createMockApiData.get_proposal_kv_store[0]
}
export interface DispatchProps {
    // Props that are set by mapDispatchToProps
    get_info_instances: () => void,
    get_ledger_state: () => void,
    list_transactions: () => void,
    list_requests: () => void,
    list_proposals: () => void,
    get_single_request: ({request_address}: any) => void,
    get_single_proposal: ({proposal_address}: any) => void,
    request_payment: ({request_tx_obj}: any) => void,
    propose_payment: ({propose_tx_obj}: any) => void,
    receive_payment: ({payment_obj}: any) => void
    // not yet avail:
    // pay_request: () => void,
    // decline_request: () => void,
    // reject_payment: () => void
}
export type Props =  StateProps & DispatchProps & OwnProps;

export interface State {
// The components optional internal state
}

class HoloFuelAppRouterContainer extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  public render() {
    console.log('Props in HoloFuelAppContainer:', this.props);
    // const { classes } = this.props;
    const { classes, ...newProps } = this.props;
    const { location } = this.props.history;
    console.log(">>>> location: >>>", location);
    const gutterBottom : boolean = true;

    if(!this.props.ledger_state || !this.props.list_of_transactions){
      return <div/>
    }


    return (
      <div>
        <AppNavBar {...newProps}/>
        <SubNavBar {...newProps}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div className={classes.jumbotron}>
            {/* <hr/> */}
            <h3>Current Balance</h3>
            <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
              {this.props.ledger_state.balance} + 200 HF
            </Typography>
            <hr/>
            <h3>Credit limit : 80 HF {this.props.ledger_state.credit} </h3>
          </div>

          <div>
            {console.log("location.pathname",location.pathname)}
          {location.pathname === "/" || location.pathname === "/holofuelsummary" ?
          // default to HF Summary Page, if no path match
          <HoloFuelSummaryPage className={classes.appTable} {...newProps} />
          :
          location.pathname === "/holofuelrequest" ?
            // this should be the transaction creation form for HoloFuel
            <HoloFuelTranferFormPage className={classes.appTable} {...newProps} />
          :
            location.pathname === "/holofueltransactiondetails" ?
            // this should be the HoloFuel Transaction Details Page
            <HoloFuelTransactionDetailPage className={classes.appTable} {...this.props} />
          :
            // if matches none - route to the "about" page for HoloFuel &/ Holo
            <AboutHolo className={classes.appTable} {...this.props} />
          }
          </div>
        </main>
      </div>
    );
  }
}
  //  className={classes.tableContainer}
  // <HoloFuelSummaryPage className={classes.appTable} {...this.props} />
export default withStyles(styles)(HoloFuelAppRouterContainer);
