import * as React from 'react';
import * as hClient from '../utils/hclient';
// local page-views imports :
import HoloFuelSummaryPage from '../components/page-views/HoloFuelSummaryPage';
// import HoloFuelTxSummary from '../components/page-views/HoloFuelTxSummary';
import HoloFuelRequestPage from '../components/page-views/HoloFuelRequestPage';
import HoloFuelPromisePage from '../components/page-views/HoloFuelPromisePage';
import SettingsHolo from "../components/page-views/SettingsHolo";
import AgentProfile from "../components/page-views/AgentProfile";
import SuccessPage from "../components/page-views/SuccessPage";
import HoloFuelTransactionDetailPage from '../components/page-views/HoloFuelTransactionDetailPage';

import { findPersistedState } from "../utils/global-helper-functions";
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

  // TODO: Finish adding this, once a zome is made for profiles
  refresh: boolean,
  awaitingResponse: boolean,
  agent_id: any,
  agent_profile: any,
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

    reset_refresh : () =>  void,
    set_agent_id: ({agent_id}: any) => void,
    // Set agent profile in-app (Prior to zome exisiting)
    update_profile:({profile_obj}: any) => void
}
export type Props =  StateProps & DispatchProps & OwnProps;

export interface State {
// The components optional internal state
  chooseTxBtnBarOpen: boolean,
  transactionType: string,
  prevProps: any,
  loggedIn: boolean,
  retrievedPersistedProfile:  {
    agentHash: string | null,
    agentName: string | null,
    email: string | null
  } | null
}

class HoloFuelAppRouterContainer extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      chooseTxBtnBarOpen: false,
      transactionType: "",
      prevProps: {},
      loggedIn: false,
      retrievedPersistedProfile:  {
        agentHash: null,
        agentName: null,
        email: null
      }
    }
  };

  // --------------------------------------
  // Holo Connection
  // --------------------------------------
  initializeHolofuel = async () => {
    this.setState({ loggedIn: true });
    console.log("INSIDE of initializeHolofuel >> current module state : ", this.state);

    try{
      this.props.fetch_agent_string();
      console.log("my_agent_string from HF DNA : ", this.props.my_agent_string);
    }catch(e){
      alert(e)
    }
    try{
      this.props.get_ledger_state();
    }catch(e){
      alert(e)
    }

    const persistedGlobalAppState = await findPersistedState();
    // console.log("persistedGlobalAppState : ", persistedGlobalAppState);
    // console.log('MY AGENT ID (registered) : ', this.props.agent_id.agent_id);
    // console.log('My AGENT STRING (registered) : ', this.props.my_agent_string);


    if(persistedGlobalAppState!.transactionReducer!) {
      console.log('My AGENT HASH (registered) : ',  persistedGlobalAppState!.transactionReducer!.agent_profile!.agentHash);
      console.log('My AGENT NAME (registered) : ',  persistedGlobalAppState!.transactionReducer!.agent_profile!.agentName);
    }

    if(persistedGlobalAppState!.transactionReducer &&
       persistedGlobalAppState!.transactionReducer!.agent_profile!.agentName &&
       (persistedGlobalAppState!.transactionReducer!.agent_profile!.agentHash === this.props.agent_id.agent_id!
       ||
       this.props.my_agent_string === 'Envoy Host')){
       this.setState({retrievedPersistedProfile:persistedGlobalAppState!.transactionReducer!.agent_profile});
    }
  }
  // --------------------------------------

  async componentDidMount () {
    // console.log("Agent ID CHECK : ", this.props.agent_id);
    // console.log("Agent HASH CHECK : ", this.props.my_agent_string);
    // if(this.props.agent_id && this.props.my_agent_string !== "Envoy Host"){
    //   console.log('User is *already* logged in as ', this.props.agent_id);
    //   return this.initializeHolofuel();
    // }
    // else {
    //NOTE: Only implement this if/else clause if using cache/cookies to courier email/pw to regen same agentID (not rec for security!)

      // await hClient.insertLoginHtml();
      // await hClient.registerLoginCallbacks();

      // NB: `installLoginDialog` "installs" the login dialog for hClient, allowing hClient to automatically detect when a user is trying to take an action that requires a keypair (such as making a commit) and modally display the login page. Completing the login will generate/regenerate the user's keypair stored in the browser.
      await hClient.installLoginDialog();

      // NB: `triggerLoginPrompt` manually triggers login dialog >> compare to `installLoginDialog`... :
      await hClient.triggerLoginPrompt().then(async() => {
        console.log('HOLO LOGIN is cooooomplete!!');

        const myAgentID = await hClient.getCurrentAgentId();
        this.props.set_agent_id({ agent_id: myAgentID });
        console.log("this.myAgentID >> from hClient :", myAgentID);

        this.initializeHolofuel();
      })

    // }
  }

  componentDidUpdate(prevProps:any, prevState:any ) {
    if (prevProps.list_of_transactions !== this.props.list_of_transactions || prevProps.list_of_pending !== this.props.list_of_pending ) {
      this.render();
    }
    else if (this.props.awaitingResponse && this.props.refresh) {
      console.log("inside awaitingResponse & refresh... ");
      this.render();
      this.props.reset_refresh();
    }
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
              newprofile={this.state.retrievedPersistedProfile!.agentName ? false : true}
              history = {this.props.history}
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

              location.pathname === "/success" ?
              // this should lead to the "settings" page for HoloFuel &/ Holo
              <SuccessPage
                transferBtnBar={this.state.chooseTxBtnBarOpen}
                showTransferBar={this.toggleTransferBtnBar}
                txType={this.state.transactionType}
                history = {this.props.history}
                {...newProps}
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
              newprofile={this.state.retrievedPersistedProfile!.agentName ? false : true}
              persistedAgentInfo={this.state.retrievedPersistedProfile || null}
              history = {this.props.history}
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
