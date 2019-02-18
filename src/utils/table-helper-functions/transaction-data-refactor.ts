// import { DateTime } from 'luxon';
// To Parse from IS0-8601 (date as supplied by Rust Code) through use of Luxon :
//   > DateTime.fromISO("2017-05-15")  //=> May 15, 2017 at midnight
//   > DateTime.fromISO("2017-05-15T08:30:00")  //=> May 15, 2017 at 8:30
// const dt = DateTime.local();
// Luxon examples with local DateTime (ie:dt)
  // dt.year     //=> 2017
  // dt.month    //=> 9
  // dt.day      //=> 14
  // dt.second   //=> 47
  // dt.weekday  //=> 4

/*/////////////////////////////////////////////////////////////////
   Table Data Generation Refactor Helper Function - Final Obj
 //////////////////////////////////////////////////////////////////*/
const dataRefactor = (transaction_details: any) => {
  console.log("APPDETAILS:-------------->",transaction_details);
  const APP_LIST_LENGTH = transaction_details.length;

  const insertAppDetails = (transaction: any) => {
    // console.log("transaction", transaction);
    if (transaction !== parseInt(transaction, 10)) {
      const newTxObj = {
        originTimeStamp: transaction.originTimeStamp, // timestamp of the intial Transaction
        originEvent: transaction.originEvent,
        counterparty: transaction.originCommitHash,
        amount:  transaction.amount,
        event: transaction.event,
        status: transaction.status,
        transaction_timestamp: transaction.transaction_timestamp, //timestamp of the current Transaction
        eventCommitHash:transaction.eventCommitHash,
        dueDate: transaction.dueDate,
        notes: transaction.notes,
        // originCommitHash: transaction.originCommitHash,
        // inResponseToTX?: transaction.inResponseToTX
        rowNumberType: transaction.rowNumberType
      };
      console.log("newTxObj", newTxObj);
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
          /* Data for Pending Transactions Table Overview */
//////////////////////////////////////////////////////////////////////////////////
const alternateEven = () => {
  let rowNumberType: string = 'odd';
  if (rowNumberType === "odd") {
    return rowNumberType ="even"
  }
  else {
    return rowNumberType ="odd"
  }
}

export const refactorListOfTransactions = (list_of_transactions: any) => {
  console.log("list_of_transactions >> check to see list of TRANSACTIONS : ", list_of_transactions);

  const list_of_refactored_transactions = MOCK_list_of_transactions_requests_only.transactions.map((tx: any) => {
    const event = tx.event;
    console.log("transaction.transactions.event", event);

    let txEvent:string | undefined = undefined;
    let originEvent:string | undefined = undefined;
    let amount: number | null = null;
    let counterparty: string | undefined = undefined;
    let dueDate: string | undefined = undefined;
    // let txTimestamp: string; // FIND way to get acess to this for all tx types...
    let notes: string | undefined = undefined;
    // let eventCommitHash : string; // FIND way to get acess to this for all tx types...
    let inResponseToTX: string | undefined = undefined;
    let rowNumberType: string | undefined = alternateEven();
    console.log("rowNumberType >> should oscilate between odd and even << :", rowNumberType);

    if (event.Request){
      txEvent = "Request";
      originEvent = "Request";
      amount =  event.Request.amount;
      counterparty = event.Request.to;
      dueDate = event.Request.deadline;
      notes = event.Request.notes;
      // eventCommitHash =  tx.origin; // FIND way to get acess to this for all tx types...
      inResponseToTX = undefined;
      // txTimestamp = ;

    }
    else if (event.Proposal){
      txEvent="Proposal"
      // if a request commit hash exists, then the request was the original transaction in tx-chain.
      originEvent = event.request ? "Request" : "Proposal";
      amount =  event.tx.amount;
      counterparty = event.tx.to;
      dueDate = event.tx.deadline;
      notes = event.tx.notes;
      inResponseToTX: tx.request;
      // txTimestamp = ;
      // eventCommitHash = ;
    }
        // case 'decline' :
        //   break;
        //
        // case 'reject' :
        //   break;
        //
        // case 'refund' :
        //   break;


      return {
        originTimeStamp: tx.timestamp,
        amount,
        originEvent,
        event: txEvent,
        counterparty,
        status: tx.state,
        originCommitHash: tx.origin,
        dueDate: dueDate,
        notes: notes,
        inResponseToTX,
        // eventCommitHash:, // commit hash for the currently displayed Transaction
        transaction_timestamp:"TBD", // timestamp of the currently displayed Transaction
        rowNumberType,
      };
    });

  console.log("list of current TRANSACTIONS", list_of_refactored_transactions);
  return dataRefactor(list_of_refactored_transactions);
};

// MOCK Data
export const MOCK_list_of_transactions_requests_only = {
  ledger: {
      balance: 20,
      credit: 41,
      payable: 24,
      receivable: 15
  },
  newer: {
      state: null,
      since: "2018-04-12",
      until: "2018-07-01",
      limit: 50
  },
  older: {
      state: null,
      since: "2018-04-12",
      until: "2018-07-01",
      limit: 50
  },
  transactions: [
    {
      timestamp: "2018-07-19",
      state: "outgoing/completed",
      origin: "1GxHKZ8HCxKUBN7tQHTu75FN82g4sx2zP6",
      event: {Request:{
        amount: 40,
        to: "Alice",
        deadline: "Friday",
        notes: "Today is Friday"
      }},
      adjustment: {
          balance: 13,
          payable: 80,
          receivable: 93
        }
    },
    {
      timestamp: "2019-05-09",
      state: "incoming/completed",
      origin: "asdfas8HCijlkmxKUBN7tQHTu75FNp439joi",
      event: {Request:{
        amount: 40,
        to: "Bob",
        deadline: "Friday",
        notes: "Today is Friday"
      }},
      adjustment: {
          balance: 59,
          payable: 68,
          receivable: 4.1
        }
    },
    {
      timestamp: "2018-12-11",
      state: "outgoing/approved",
      origin: "1DEiFZ1kThW4AVtDmL1w2oDyEKYKcqBcRB",
      event: {Request:{
        amount: 40,
        to: "Alice",
        deadline: "Friday",
        notes: "Today is Friday"
      }},
      adjustment: {
          balance: 84,
          payable: 8,
          receivable: 12
        }
    },
    {
      timestamp: "2018-04-27",
      state: "incoming/approved",
      origin: "1MNMQcEsd3BkQpaFUyZrViQ26axooErWtc",
      event: {Request:{
        amount: 40,
        to: "Bob",
        deadline: "Friday",
        notes: "Today is Friday"
      }},
      adjustment: {
          balance: 47,
          payable: 79,
          receivable: 61
      }
    }
  ]
}

// Locate Most Recent State for each Transaction : Helper Function
// const listTxByOriginAddress = (tx_list: any) => {
//   // iterate over tx_list, checking the Origin Commit Hash
//   let arrayOfTxChains: Array<any> = [];
//
//   for (let tx of tx_list) {
//     let transaction_obj = tx!.transactions;
//     let tx_origin_address = tx!.transactions.origin;
//     if (tx_origin_address !== [arrayOfTxChains]) {
//       arrayOfTxChains.push({tx_origin_address:[transaction_obj]});
//     }
//     else if (tx_origin_address === [arrayOfTxChains]) {
//         tx_origin_address.push({transaction_obj});
//     }
//   }
//   console.log(">>>>>>>>> arrayOfTxChains <<<<<<<<< : ", arrayOfTxChains);
// }


// const isoloateTxMostRecentState = (txListByOriginAddress: any) => {
//   let filtered_tx_list = [];
//   filtered_tx_list = txListByOriginAddress.filter((tx: any) => {
//       // currently sorting by date to locate the most recent event/state for each tx:
//       // Luxon: d1 < d2 // is d1 before d2?
//       // (Luxon Ref: https://moment.github.io/luxon/docs/manual/math.html#comparing-datetimes)
//       let most_recent_event : any;
//       let most_recent_event_date: any;
//       for(let tx_event of tx ) {
//         // let current_event_date = tx_event.timestamp.fromISO();
//         if(!most_recent_event_date){
//           most_recent_event_date = tx_event.timestamp;
//           most_recent_event = tx_event;
//         }
//         else if (tx_event.timestamp > most_recent_event_date){
//           most_recent_event_date = tx_event.timestamp;
//           most_recent_event = tx_event;
//         }
//       }
//       console.log("===>>>> most_recent_event_date", most_recent_event_date)
//       return most_recent_event;
//   });
//
//   console.log(" ====>>>> filtered_tx_list <<<===== ", filtered_tx_list);
//   return filtered_tx_list;
// }


// mostRecentEvent = tx.filter(tx_event => {
//   let current_event_date = tx_event.timestamp;
//     return current_event_date > most_recent_event_date
// });

// ref, from hc-admin
// const findDnaInstances = (dna_id, info_instances) => {
//   let dna_instances = [];
//   dna_instances = info_instances.filter(app => {
//       return app.dna === dna_id
//   });
//   return dna_instances;
// }



















//
