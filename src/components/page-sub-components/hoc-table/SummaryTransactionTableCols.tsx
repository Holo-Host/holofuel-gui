// Main Imports
import * as React from 'react';
import * as matchSorter from 'match-sorter';
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";


/* Transaction Table Headers */
const pending_transaction_table_columns = (props: any, state: any) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: 'Origin Date',
    accessor: 'transaction_date',
      filterMethod: (filter:any, rows:any) =>
        matchSorter(rows, filter.value, { keys: ["transaction_date"] }),
      filterAll: true,
      Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
        { row.value }
        </div>
      )
    }, {
    Header: 'Amount',
    id: "amount",
    accessor: (d:any) => d.amount,
     filterMethod: (filter:any, rows:any) =>
        matchSorter(rows, filter.value, { keys: ["amount"] }),
     filterAll: true,

    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Action',
    accessor: 'action',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["action"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Counterparty',
    accessor: 'counterparty',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["counterparty"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Status',
    accessor: 'status',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["status"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div>
        <TransactionDetailsButton
          transactionState={row.value}
        />
      </div>
    )
  }]
  return table_columns;
};
export default pending_transaction_table_columns;


export const processed_transaction_table_columns = (props: any, state: any) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: 'Origin Date',
    accessor: 'transaction_date',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["transaction_date"] }),
    filterAll: true,
      Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
        { row.value }
        </div>
      )
    }, {
    Header: 'Amount',
    accessor: 'amount',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["amount"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Action',
    accessor: 'action',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["action"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Counterparty',
    accessor: 'counterparty',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["counterparty"] }),
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
    )
   }]
  return table_columns;
};
