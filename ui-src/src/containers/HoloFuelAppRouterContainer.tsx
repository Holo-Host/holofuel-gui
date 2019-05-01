import * as React from 'react';
// import * as hClient from '../utils/hclient';
// local page-views imports :
import HoloFuelSummaryPage from '../components/page-views/HoloFuelSummaryPage';
// import HoloFuelTxSummary from '../components/page-views/HoloFuelTxSummary';
import HoloFuelRequestPage from '../components/page-views/HoloFuelRequestPage';
import HoloFuelPromisePage from '../components/page-views/HoloFuelPromisePage';
import SettingsHolo from "../components/page-views/SettingsHolo";
import AgentProfile from "../components/page-views/AgentProfile";
import HoloFuelTransactionDetailPage from '../components/page-views/HoloFuelTransactionDetailPage';
// import Dashboard from '../components/page-sub-components/dashboard-header/Dashboard';
// import createMockApiData, { instanceListData } from  '../utils/seed-data/mock-api-data'; //
import { Ledger, ListTransactionsResult, PendingResult } from '../utils/types'; // RequestActionParam, PromiseActionParam, Address, DateTimeString
import AppNavBar from '../components/page-sub-components/app-nav-bar/AppNavBar';
// import SubNavBar from '../components/page-sub-components/app-nav-bar/SubNavBar';
// custom styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../components/styles/page-styles/DefaultPageMuiStyles';
import '../components/styles/page-styles/scaffold-styles.css';


export interface OwnProps {
  // These are props the component has received from its parent component
  className: any,
  staticContext: any,
  classes: any,
  history: any
}
export interface StateProps {
  // Props that are set by mapStateToProps
  ledger_state: Ledger,
  list_of_instance_info: Array<any>,
  list_of_agents: Array<any>,
  my_agent_string: string,
  my_agent_hash: string,
  hf_base_dna_hash: string,
  mostRecentPromiseCommit: string,
  mostRecentRequestCommit: string,
  list_of_transactions : ListTransactionsResult,
  list_of_pending: PendingResult,
  list_of_requests: Array<any>,
  list_of_promises: Array<any>,
  view_specific_request: Array<any>,
  view_specific_promise: Array<any>
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
  // identifying calls :
    get_info_instances: () => void,
    get_agent_list: () => void,
    fetch_agent_string: () => void,
  // holofuel specific calls :
    get_ledger_state: () => void,
    list_transactions: (payload? : any) => void,
    list_pending: () => void,
    list_requests: () => void,
    list_promises: () => void,
    get_single_request: ({request_address}: any) => void,
    get_single_promise: ({promise_address}: any) => void,
    request_payment: ({request_tx_obj}: any) => void,
    promise_payment: ({promise_tx_obj}: any) => void,
    receive_payment: ({payment_obj}: any) => void,
}
export type Props =  StateProps & DispatchProps & OwnProps;

export interface State {
// The components optional internal state
  chooseTxBtnBarOpen: boolean,
  transactionType: string,
  prevProps: any,
  loggedIn: boolean
}

class HoloFuelAppRouterContainer extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      chooseTxBtnBarOpen: false,
      transactionType: "",
      prevProps: {},
      loggedIn: false
    }
  };

  // --------------------------------------
  // Holo Connection
  // --------------------------------------
  initializeHolofuel = () => {
    this.setState({ loggedIn: true })
    console.log("INSIDE of initializeHolofuel >>", this.state);
    this.props.fetch_agent_string();
    this.props.get_ledger_state();
  }
  // --------------------------------------



  async componentDidMount () {
    // await hClient.installLoginDialog();
    this.initializeHolofuel()
    console.log("Completed");

    // await hClient.triggerLoginPrompt().then(() => {
    //   console.log('HOLO LOGIN is cooooomplete!!')
    //   this.initializeHolofuel()
    // })


    // this.props.fetch_agent_string();
    // this.props.get_ledger_state();
  }

  toggleTransferBtnBar = (txType: any) => {
    this.setState({
      chooseTxBtnBarOpen: !this.state.chooseTxBtnBarOpen,
      transactionType: txType
    });
  }


// Find a dynamic way to connect the ui to the dna >> play with info_instances && agent_string >> access prior to running?!?!
  public render() {
    const { classes, staticContext, ...newProps } = this.props; //TODO: Locate staticContext.. AND REMOVE from outer props
    const { location } = this.props.history;
    if(!this.props.ledger_state || !this.props.list_of_transactions){
      return <div/>
    }

    return (
      <div>
        <AppNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/>
        {/* <SubNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/> */}
        <main className={classes.content} style={{marginTop:'75px'}}>
          <div className={classes.appBarSpacer} />
          <div>
            {location.pathname === "/" || location.pathname === "/holofuelsummary" ?
            // default to HF Summary Page, if no path match
            <HoloFuelSummaryPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              {...newProps}
            />
          :
            location.pathname === "/holofuelrequest" ?
            // this should be the transaction creation form for HoloFuel
            <HoloFuelRequestPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              {...newProps}
              location={location.pathname}
            />
          :
            location.pathname === "/holofuelpromise" ?
            // this should be the HoloFuel Transaction Details Page
            <HoloFuelPromisePage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              {...this.props}
              location={location.pathname}
            />
          :
            location.pathname === "/holofueltransactiondetails" ?
              // this should be the HoloFuel Transaction Details Page
              <HoloFuelTransactionDetailPage
                transferBtnBar={this.state.chooseTxBtnBarOpen}
                showTransferBar={this.toggleTransferBtnBar}
                txType={this.state.transactionType}
                {...this.props}
              />
          :
            location.pathname === "/settings" ?
            // this should lead to the "settings" page for HoloFuel &/ Holo
            <SettingsHolo
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              {...this.props}
            />
          :
            // if matches none - route to the Profile Page
            <AgentProfile
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              {...this.props}
            />
          }
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(HoloFuelAppRouterContainer);
