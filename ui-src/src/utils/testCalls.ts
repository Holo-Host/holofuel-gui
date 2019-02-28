//
// const makeTestCalls(){
// //     ////////// NEW CALLS TX CALLS //////////////
// //     // Invoke get_ledger_state() (a ZOME Call) :
// //     console.log("calling : get_ledger_state >> ", this.props.get_ledger_state);
// //     this.props.get_ledger_state();
// //
// //   //   // Invoke list_requests() (a ZOME Call) :
// //   //   console.log("calling : list_requests >> ", this.props.list_requests);
// //   //   this.props.list_requests();
// //   //
// //   //   // Invoke list_proposals() (a ZOME Call) :
// //   //   console.log("calling : list_proposals >> ", this.props.list_proposals);
// //   //   this.props.list_proposals();
// //
// //     // Invoke get_single_request() (a ZOME Call) :
// //     console.log("calling : get_single_request >> ", this.props.get_single_request);
// //     // const request_address = this.props.list_of_requests[0];
// //     const request_address: any = createMockApiData.list_of_requests[0];
// //     this.props.get_single_request({request_address});
// //   ////
// //     // Invoke get_single_proposal() (a ZOME Call) :
// //     console.log("calling : get_single_proposal >> ", this.props.get_single_proposal);
// //     // const proposal_address = this.props.list_of_proposals[0];
// //     const proposal_address: any = createMockApiData.list_of_proposals[0];
// //     this.props.get_single_proposal({proposal_address});
// //
// // ///////////////////////////////////////////////////////////////////////////////////
// //   //                   MAKE TRANSACTIONS...                                     //
// // ///////////////////////////////////////////////////////////////////////////////////
// //     // Invoke request_payment() (a ZOME Call) :
// //     // const currentDateTime: DateTimeString | undefined = get_current_datetime();
// //     const request_tx_obj : RequestActionParam = {
// //       from: "Poison Ivy", // this will be the payment requestor's AGENT_ADDRESS
// //       amount:"0.0000000569066456676 HF",
// //       notes: "testing out the request_payment api call...",
// //       // deadline: currentDateTime
// //     }
// //     console.log("request_tx_obj", request_tx_obj);
// //     console.log("calling : request_payment >> ", this.props.request_payment);
// //     this.props.request_payment({request_tx_obj});
// //
// // ///////////////////////////////////////////////////////////////////////////////////
// // //// CHECK FOR Request Transaction Returned...
// //     // Invoke list_transactions() (a ZOME Call) :
// //     console.log("calling : list_transactions >>  inside handleClick... >> ");
// //     this.props.list_transactions({});
// // ///////////////////////////////////////////////////////////////////////////////////
// //
// //     // Invoke propose_payment() (a ZOME Call) :
// //     const propose_tx_obj: ProposalActionParam = {
// //       to: "Poison Ivy",// this will be the payment requestor's AGENT_ADDRESS
// //       amount:"0.0000000569066456676 HF",
// //       notes: "testing out the propose_payment api call...",
// //       // deadline: currentDateTime // ,
// //       // request?: "REQUEST'S COMMIT HASH goes here - if already exists (ie. if the initiating event was a request)"
// //     }
// //     console.log("propose_tx_obj", propose_tx_obj);
// //     console.log("calling : propose_payment >> ", this.props.propose_payment);
// //     this.props.propose_payment({propose_tx_obj});
// //
// //     // Invoke receive_payment() (a ZOME Call) :
// //     const committed_proposal_obj = {
// //       from: "AGENT 2 : PROPOSER", // this will be the payment proposer's AGENT_ADDRESS
// //       tx: propose_tx_obj // ,
// //       // request?: "REQUEST'S COMMIT HASH goes here - if already exists (ie. if the initiating event was a request)"
// //     }
// //
// //     // NOTE: Currently it appears as though the ONLY way to access the proposal_sig
// //     //  and proposal_hash is to record the commit_hash/address from the proposal
// //     //  within the TX-chain transaction obj, which we can use to call get_proposal and
// //     //  recive the AppEntryValue(which should include the sigs?) info needed...
// //     const payment_obj = {
// //       proposal: committed_proposal_obj // ,
// //       // proposal_sig:, // how will this be provided ? >> will be included into the list_transactions
// //       // proposal_hash: // how will this be provided ? >> will be included into the list_transactions
// //     }
// //     console.log("payment_obj", payment_obj);
// //     console.log("calling : receive_payment >> ", this.props.receive_payment);
// //     this.props.receive_payment({payment_obj});
//   }
