// Main Imports
import * as React from 'react';
import * as matchSorter from 'match-sorter';
import Jdenticon from "../avatar-generator/Jdenticon";
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";
import SearchIcon from '@material-ui/icons/Search';
import Today from '@material-ui/icons/Today';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Info from '@material-ui/icons/Info';
import List from '@material-ui/icons/List';
// import Receipt from '@material-ui/icons/Receipt';

/* Transaction Table Headers */
const pending_transaction_table_columns = (props: any, state: any) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: (row: any) => (<Today/>),
    id: 'originTimeStamp',
    accessor: 'originTimeStamp',
    // accessor: (d:any) => d.originTimeStamp,
    filterable: true,
    Filter: ({filter, row, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon />
        </div>
     ),
     filterMethod: (filter:any, rows:any) =>
       matchSorter(rows, filter.value, { keys: ["originTimeStamp"] }),
     FilterAll: true,
     Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
        { row.value }
        </div>
     )
    }, {
    Header: (row: any) => (<AccountCircle/>),
    accessor: 'counterparty',
    id: 'counterparty',
    filterable: true,
    Filter: ({filter, rows, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon style={{color:"#799ab6"}} />
        </div>
    ),
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["counterparty"] }),
    FilterAll: true,
    Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
          {row.value ?
            <span>
              <Jdenticon hash={row.value} size="35px" {...props}/>
              <p style={{fontSize:'.5rem', margin:'0 auto', marginTop:'2px'}}>Name GOES HERE</p>
            </span>
          :
            <span/>
          }
        </div>
      )
    }, {
    Header: (row: any) => (<SwapVerticalCircle/>),
    id: 'originEvent',
    accessor: 'originEvent',
    filterable: true,
    Filter: ({filter, row, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon style={{color:"#799ab6"}} />
        </div>
    ),
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["originEvent"] }),
    FilterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
        {/* style={{ padding: '5px', color:{props.amountColor} }} */}
      { row.value === "Request" ? "Requested" : "Sent"}
      </div>
      )
    }, {
    Header: (row: any) => (<ChangeHistory/>),
    id: "amount",
    accessor: (d:any) => d.amount,
    filterable: true,
    Filter: ({filter, row, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon style={{color:"#799ab6"}} />
        </div>
    ),
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["amount"] }),
    FilterAll: true,
    Cell: (row: any) => (
      <div style={{ padding:'5px', fontSize:"1rem"}}>
        {row.original.event === "Request" ?
            <span className="decreasedBalance" style={{color:"#b85eb3"}}>
              - { row.value } HF
            </span>
          :
            <span className="increasedBalance" style={{color:"#00828d"}}>
              + { row.value } HF
            </span>
        }
      </div>
      )
    }, {
    Header: (row: any) => (<Info/>),
    id: 'status',
    accessor: 'status',
    filterable: true,
    Filter: ({filter, row, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon style={{color:"#799ab6"}} />
        </div>
    ),
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["status"] }),
    FilterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
        <TransactionDetailsButton
          column="status"
          transactionState={row.value}
          rowInfo={row}
        />
      </div>
      )
    }, {
      Header: (row: any) => (<List/>),
    id: 'todo',
    accessor: 'status', // change to "todo" once created
    filterable: true,
    Filter: ({filter, row, onChange}:any) => (
        <div style={{position: 'relative'}}>
          <input
            onChange={event => onChange(event.target.value)}
            value={filter ? filter.value : ''}
            style={{
              fontSize: '.8rem',
              width: '100%',
              backgroundColor: 'transparent'
            }}
          />
          <SearchIcon style={{color:"#799ab6"}} />
        </div>
    ),
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["todo"] }),
    FilterAll: true,
    Cell: (row: any) => (
      <div>
        <TransactionDetailsButton
          column="todo"
          transactionState={row.value}
          rowInfo={row}
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
    Header: 'Transaction Date',
    accessor: 'transaction_timestamp',
    filterMethod: (filter:any, rows:any) =>
      matchSorter(rows, filter.value, { keys: ["transaction_timestamp"] }),
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
