import * as React from 'react';
// local page-views imports :
import HoloFuelSummaryPage from '../components/page-views/HoloFuelSummaryPage';
// import HoloFuelTxSummary from '../components/page-views/HoloFuelTxSummary';
import HoloFuelRequestPage from '../components/page-views/HoloFuelRequestPage';
import HoloFuelProposalPage from '../components/page-views/HoloFuelProposalPage';
import SettingsHolo from "../components/page-views/SettingsHolo";
import AgentProfile from "../components/page-views/AgentProfile";
import HoloFuelTransactionDetailPage from '../components/page-views/HoloFuelTransactionDetailPage';
// import Dashboard from '../components/page-sub-components/dashboard-header/Dashboard';
import createMockApiData, { instanceListData } from  '../utils/seed-data/mock-api-data'; //
import { Ledger, ListTransactionsResult } from '../utils/types'; // RequestActionParam, ProposalActionParam, Address, DateTimeString
import AppNavBar from '../components/page-sub-components/app-nav-bar/AppNavBar';
import SubNavBar from '../components/page-sub-components/app-nav-bar/SubNavBar';
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
  list_of_instance_info: typeof instanceListData,
  list_of_agents: Array<any>,
  my_agent_string: string,
// currently this is just using a hard-coded value that relates to the container.
  my_agent_hash: string,
  list_of_transactions : ListTransactionsResult,
  // list_of_transactions: typeof createMockApiData.list_of_request_transactions,
  list_of_requests: typeof createMockApiData.list_of_requests,
  list_of_proposals: typeof createMockApiData.list_of_proposals,
  view_specific_request: typeof createMockApiData.get_request_kv_store[0],
  view_specific_proposal: typeof createMockApiData.get_proposal_kv_store[0]
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
    list_requests: () => void,
    list_proposals: () => void,
    get_single_request: ({request_address}: any) => void,
    get_single_proposal: ({proposal_address}: any) => void,
    request_payment: ({request_tx_obj}: any) => void,
    propose_payment: ({propose_tx_obj}: any) => void,
    receive_payment: ({payment_obj}: any) => void,
    // not yet avail:
    // fetch_agent_hash: () => void,
    // pay_request: () => void,
    // decline_request: () => void,
    // reject_payment: () => void
}
export type Props =  StateProps & DispatchProps & OwnProps;

export interface State {
// The components optional internal state
  chooseTxBtnBarOpen: boolean,
  transactionType: string,
}

class HoloFuelAppRouterContainer extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      chooseTxBtnBarOpen: false,
      transactionType: "",
    }
  };

  componentDidMount () {
    // this.props.fetch_agent_string();
    this.props.get_ledger_state();
  }

  toggleTransferBtnBar = (txType: any) => {
    console.log("TRANSACTION TYPE arguments: ",txType)
    this.setState({
      chooseTxBtnBarOpen: !this.state.chooseTxBtnBarOpen,
      transactionType: txType
    });
  }

  public render() {
    console.log('State in HoloFuelAppContainer:', this.state);
    console.log('Props in HoloFuelAppContainer:', this.props);
    // const { classes } = this.props;
    const { classes, staticContext, ...newProps } = this.props; //TODO: Locate staticContext.. AND REMOVE from outer props
    const { location } = this.props.history;
    console.log(">>>> location: >>>", location);

    if(!this.props.ledger_state || !this.props.list_of_transactions){
      return <div/>
    }

    return (
      <div>
        <AppNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/>
        <SubNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div>
            {console.log("location.pathname",location.pathname)}
            {location.pathname === "/" || location.pathname === "/holofuelsummary" ?
            // default to HF Summary Page, if no path match
            <HoloFuelSummaryPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...newProps}
            />
          :
            location.pathname === "/holofuelrequest" ?
            // this should be the transaction creation form for HoloFuel
            <HoloFuelRequestPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...newProps}
            />
          :
            location.pathname === "/holofuelproposal" ?
            // this should be the HoloFuel Transaction Details Page
            <HoloFuelProposalPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable} {...this.props}
            />
          :
            location.pathname === "/holofueltransactiondetails" ?
              // this should be the HoloFuel Transaction Details Page
              <HoloFuelTransactionDetailPage
                transferBtnBar={this.state.chooseTxBtnBarOpen}
                showTransferBar={this.toggleTransferBtnBar}
                txType={this.state.transactionType}
                className={classes.appTable}
                {...this.props}
              />
          :
            location.pathname === "/settings" ?
            // this should lead to the "settings" page for HoloFuel &/ Holo
            <SettingsHolo
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...this.props}
            />
          :
            // if matches none - route to the Profile Page
            <AgentProfile
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
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
