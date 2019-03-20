/*/////////////////////////////////////////////////////////////////
   Table Data Generation Refactor Helper Function - Final Obj
 //////////////////////////////////////////////////////////////////*/
const dataRefactor = (transaction_details: any) => {
  const APP_LIST_LENGTH = transaction_details.length;

  const insertAppDetails = (transaction: any) => {
    if (transaction !== parseInt(transaction, 10)) {
      const newTxObj = {
        originTimeStamp: transaction.originTimeStamp, // timestamp of the intial Transaction
        originEvent: transaction.originEvent === "Request" ? "Requested" : "Sent",
        counterparty: transaction.counterparty,
        txAuthor: transaction.txAuthor || undefined,
        amount:  transaction.amount,
        event: transaction.event,
        status: transaction.status,
        transaction_timestamp: transaction.transactionTimestamp, //timestamp of the current Transaction
        eventCommitHash:transaction.eventCommitHash,
        dueDate: transaction.dueDate,
        notes: transaction.notes,
        originCommitHash: transaction.originCommitHash,
        proposalCommitSignature: transaction.proposalCommitSignature || undefined,
        inResponseToTX: transaction.inResponseToTX,
        rowNumberType: transaction.rowNumberType
      };
      return newTxObj;
    }
    else {
      return "";
    }
  }

  const range = (length: number) => {
    const lengthArray: Array < any > = [];
    for (let i = 0; i < length; i++) {
      lengthArray.push(i);
    }
    return lengthArray;
  }

  const dataGenerate = (length: number = APP_LIST_LENGTH) => {
    return transaction_details.map((transaction: any) => {
      return {
        ...insertAppDetails(transaction),
        children: range(length - 1).map(insertAppDetails) // # per page...
      };
    })
  }
  return dataGenerate()
}

//////////////////////////////////////////////////////////////////////////////////
          /* Data for Transactions Table Overview */
//////////////////////////////////////////////////////////////////////////////////
let rowNumberType: string = 'odd';
const alternateEven = () => {
  if (rowNumberType === "odd") {
    return rowNumberType ="even"
  }
  else {
    return rowNumberType ="odd"
  }
}

const refactorListOfPending = (list_of_pending:any) => {
  const  list_of_proposals =  list_of_pending.proposals.map((p:any) => {
    return {
      originTimeStamp: p[0][1],
      amount:p[0][2].Proposal.tx.amount,
      originEvent:p[0][2].Proposal.request ? "Request" : "Proposal",
      event: "Proposal",
      counterparty:p[0][2].Proposal.tx.from,
      txAuthor: p[0][2].Proposal.tx.to,
      status: "pending/recipient",
      dueDate: p[0][2].Proposal.tx.deadline,
      notes:  p[0][2].Proposal.tx.notes,
      originCommitHash: p[0][2].Proposal.request ? p[0][2].Proposal.request : p[0][0], // the tx origin commit hash
      eventCommitHash: p[0][0], // the 'origin' proposal commit hash
      inResponseToTX:p[0][2].Proposal.request || undefined, // the request hash that the proposal is in response to, should it exist...
      transactionTimestamp: p[0][1],
      proposalCommitSignature: p[1][1],
      rowNumberType
    };
  });

  const  list_of_requests =  list_of_pending.requests.map((r:any) => {
      return {
      originTimeStamp: r[0][1],
      amount:r[0][2].Request.amount,
      originEvent:"Request",
      event: "Request",
      counterparty:r[0][2].Request.to,
      txAuthor: r[0][2].Request.from,
      status: "pending/spender",
      dueDate: r[0][2].Request.deadline,
      notes:  r[0][2].Request.notes,
      originCommitHash: r[0][0],
      eventCommitHash: r[0][0], // commit hash for the currently displayed Transaction === the origin commit hash in this cirumstance
      inResponseToTX: undefined,
      transactionTimestamp: r[0][1],
      requestCommitSignature: r[1][1],
      rowNumberType
    };
  });

  const refactored_transactions = list_of_proposals.concat(list_of_requests);
  return refactored_transactions;
}


export const refactorListOfTransactions = (list_of_transactions: any, list_of_pending: any) => {
  const list_of_refactored_tx_unprocessed = refactorListOfPending(list_of_pending);

  const list_of_refactored_transactions = list_of_transactions.transactions.map((tx: any) => {
    const event = tx.event;
    let txEvent:string | undefined = undefined;
    let originEvent:string | undefined = undefined;
    let amount: number | null = null;
    let counterparty: string | undefined = undefined;
    let dueDate: string | undefined = undefined;
    let notes: string | undefined = undefined;
    let originCommitHash : string | undefined = undefined; // FIND way to get acess to this for all tx types...
    let inResponseToTX: string | undefined = undefined;
    let rowNumberType: string | undefined = alternateEven();
    if (event.Request){
      txEvent = "Request";
      originEvent = "Request";
      amount =  event.Request.amount;
      counterparty = event.Request.from;
      dueDate = event.Request.deadline;
      notes = event.Request.notes;
      inResponseToTX = undefined;
      originCommitHash =  tx.timestamp.origin;
    }
    else if (event.Proposal){
      txEvent="Proposal"
      originEvent = event.Proposal.request ? "Request" : "Proposal";
      amount =  event.Proposal.tx.amount;
      counterparty = event.Proposal.tx.to;
      dueDate = event.Proposal.tx.deadline;
      notes = event.Proposal.tx.notes;
      inResponseToTX = event.Proposal.request;// the request hash that the proposal is in response to, should it exist...
      originCommitHash = event.Proposal.request ? event.Proposal.request : tx.timestamp.origin; // tx origin commit hash
    }

        // case 'decline' :
        //   break;

        // case 'reject' :
        //   break;

        // case 'refund' :
        //   break;


      return {
        originCommitHash, // tx origin commit hash
        eventCommitHash: tx.origin, // 'origin' commit hash for the currently displayed Transaction
        amount,
        originEvent,
        event: txEvent,
        counterparty,
        status: tx.state,
        originTimeStamp: tx.timestamp.origin,
        dueDate: dueDate,
        notes: notes,
        inResponseToTX,
        transactionTimestamp: tx.timestamp.event,
        rowNumberType,
      };
    });

    const list_of_processed_tx = list_of_refactored_transactions.filter((tx:any)=>{
      return status === "refunded" ||
      status === "rejected" ||
      status === "declined" ||
      status === "completed" ||
      status === "recovered"
    })
    const list_of_pending_tx = list_of_refactored_transactions.filter((tx:any)=>{
      return status !== "refunded" &&
      status !== "rejected" &&
      status !== "declined" &&
      status !== "completed" &&
      status !== "recovered"
    })

    const all_unprocessed_tx = list_of_pending_tx.concat(list_of_refactored_tx_unprocessed);
    const all_transactions = all_unprocessed_tx.concat(list_of_processed_tx);
    return dataRefactor(all_transactions);
};
