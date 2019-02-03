import * as React from 'react';
// import { Link } from 'react-router-dom';
// import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// utils import :
// import { get_current_datetime } from '../../../utils/global-helper-functions';
import createMockApiData, { instanceListData } from '../../../utils/seed-data/mock-api-data';
import { ProposalActionParam, Ledger, RequestActionParam } from '../../../utils/types'; // ListTransactionsResult , DateTimeString, Address

export interface OwnProps { /* These are props the component has received from its parent component */ }
export interface StateProps {
// Props that are set by mapStateToProps
  ledger_state: Ledger,
  list_of_instance_info: typeof instanceListData,
  list_of_transactions: typeof  createMockApiData.list_of_request_transactions, // ListTransactionsResult,
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
export type Props = OwnProps & StateProps & DispatchProps;
export interface State { /*The components optional internal state */ }

class TransactionOverview extends React.Component<Props, State> {
  componentDidMount () {
    console.log("PROPS : ", this.props);
    // Invoke GET_INFO_INSTANCES()
    this.props.get_info_instances();
    // Invoke list_transactions() (a ZOME Call) :
    this.props.list_transactions();
  }

  handleClick = () => {
    // Invoke GET_INFO_INSTANCES()
    console.log("calling : get_info_instances >> inside handleClick... >> ");
    this.props.get_info_instances();
    // Invoke list_transactions() (a ZOME Call) :
    console.log("calling : list_transactions >>  inside handleClick... >> ");
    this.props.list_transactions();

////////// NEW CALLS //////////////
    // Invoke get_ledger_state() (a ZOME Call) :
    console.log("calling : get_ledger_state >> ", this.props.get_ledger_state);
    this.props.get_ledger_state();

    // Invoke list_requests() (a ZOME Call) :
    console.log("calling : list_requests >> ", this.props.list_requests);
    this.props.list_requests();

    // Invoke list_proposals() (a ZOME Call) :
    console.log("calling : list_proposals >> ", this.props.list_proposals);
    this.props.list_proposals();
////
    // Invoke get_single_request() (a ZOME Call) :
    console.log("calling : get_single_request >> ", this.props.get_single_request);
    // const request_address = this.props.list_of_requests[0];
    const request_address: any = createMockApiData.get_request_kv_store[0];
    this.props.get_single_request({request_address});
////
    // Invoke get_single_proposal() (a ZOME Call) :
    console.log("calling : get_single_proposal >> ", this.props.get_single_proposal);
    // const proposal_address = this.props.list_of_proposals[0];
    const proposal_address: any = createMockApiData.get_proposal_kv_store[0];
    this.props.get_single_proposal({proposal_address});

    // Invoke request_payment() (a ZOME Call) :
    // const currentDateTime: DateTimeString | undefined = get_current_datetime();
    const request_tx_obj : RequestActionParam = {
      to: "Poison Ivy", // this will be the payment requestor's AGENT_ADDRESS
      amount:"0.0000000569066456676 HF",
      notes: "testing out the request_payment api call...",
      // deadline: currentDateTime
    }
    console.log("request_tx_obj", request_tx_obj);
    console.log("calling : request_payment >> ", this.props.request_payment);
    this.props.request_payment({request_tx_obj});

    // Invoke propose_payment() (a ZOME Call) :
    const propose_tx_obj: ProposalActionParam = {
      from: "Poisin Ivy",// this will be the payment requestor's AGENT_ADDRESS
      amount:"0.0000000569066456676 HF",
      notes: "testing out the propose_payment api call...",
      // deadline: currentDateTime // ,
      // request?: "REQUEST'S COMMIT HASH goes here - if already exists (ie. if the initiating event was a request)"
    }
    console.log("propose_tx_obj", propose_tx_obj);
    console.log("calling : propose_payment >> ", this.props.propose_payment);
    this.props.propose_payment({propose_tx_obj});

    // Invoke receive_payment() (a ZOME Call) :
    const committed_proposal_obj = {
      from: "AGENT 2 : PROPOSER", // this will be the payment proposer's AGENT_ADDRESS
      tx: propose_tx_obj // ,
      // request?: "REQUEST'S COMMIT HASH goes here - if already exists (ie. if the initiating event was a request)"
    }

    // NOTE: Currently it appears as though the ONLY way to access the proposal_sig
    //  and proposal_hash is to record the commit_hash/address from the proposal
    //  within the TX-chain transaction obj, which we can use to call get_proposal and
    //  recive the AppEntryValue(which should include the sigs?) info needed...
    const payment_obj = {
      proposal: committed_proposal_obj // ,
      // proposal_sig:, // how will this be provided ? >> will be included into the list_transactions
      // proposal_hash: // how will this be provided ? >> will be included into the list_transactions
    }
    console.log("payment_obj", payment_obj);
    console.log("calling : receive_payment >> ", this.props.receive_payment);
    this.props.receive_payment({payment_obj});
  }

  handleNextPageClick = () => {
    console.log('Youpresed the button, and should be proceeding to a test app now...');
  }

  public render () {
    console.log('Props in TransactionOverview:', this.props);
    return (
      <div/>
      // <div>
      //   <h1 style={{textAlign:"center"}} >Welcome to the API Testing Page</h1>
      //   <h4 style={{textAlign:"center"}}>Check out the console for more info.</h4>
      //   <button onClick={() => this.handleClick()}>
      //     Test Out API Calls
      //   </button>
      //
      //   <br/>
      //   <br/>
      //
      //   <h4 style={{textAlign:"center"}}>Please also visit one (...orboth) of the test apps. =D</h4>
      //   <br/>
      //   <Link to='/bankstyleapp'>
      //     <button onClick={() => this.handleNextPageClick()}>
      //       Test Out the Bank App Style
      //     </button>
      //   </Link>
      //
      //   <br/>
      //   <Link to='/holofuelsummary'>
      //     <button onClick={() => this.handleNextPageClick()}>
      //       Test Out Fungi Wallet App Style
      //     </button>
      //   </Link>
      // </div>
    );
  }
}

export default withStyles(styles)(TransactionOverview);
