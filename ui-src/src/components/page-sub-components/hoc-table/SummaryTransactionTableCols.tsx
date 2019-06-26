// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";
import JdenticonSmall from "../avatar-generator/JdenticonSmall";
// MUI Custom Style Imports :
import Tooltip from '@material-ui/core/Tooltip';
import Today from '@material-ui/icons/Today';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Info from '@material-ui/icons/Info';
import '../../styles/page-styles/scaffold-styles.css';


export type Props = DispatchProps & StateProps;

/* Transaction Table Headers */
export const tx_table_columns = (props: Props, state: any, invokeTxCall:(txObj:any) => void, cb:() => void) => {
  const table_columns = [{
    Header: (row: any) => (<div><h4 style={{color:'#0e094b'}}>Date</h4><Tooltip title="Date" aria-label="Date"><Today style={{color:'#0e094b'}}/></Tooltip></div>),
    id: 'originTimeStamp',
    accessor: 'originTimeStamp',
     Cell: (row: any) => (
        <div style={{ padding: '5px', fontSize:".8rem" }}>
          { parseInt(moment(row.value).startOf('day').fromNow().split(" ")[0]) > 23 ?
            <h4>{ moment(row.value).format("LL")}</h4>

          :  parseInt(moment(row.value).startOf('day').fromNow().split(" ")[0]) > 1 ?
            <h4>{moment(row.value).calendar()}</h4>
          :
            <h4>{moment(row.value).startOf('hour').fromNow()}</h4>
          }
        </div>
     )
    }, {
    Header: (row: any) => (<div><h4 style={{color:'#0e094b'}}>Counterparty</h4><Tooltip title="Counterparty" aria-label="Counterparty"><AccountCircle style={{color:'#0e094b'}}/></Tooltip></div>),
    accessor: 'counterparty',
    id: 'counterparty',
    Cell: (row: any) => (
        <div style={{ padding: '5px', marginTop:'13px' }}>
          {row.value ?
            <span>
              <p style={{fontSize:'.8rem', margin:'0 auto', marginTop:'3px'}}>{ row.value }</p>
            </span>
          :
            <span/>
          }
        </div>
      )
    },{
    Header: (row: any) => (<div><h4 style={{color:'#0e094b'}}>Counterparty</h4><Tooltip title="Counterparty" aria-label="Counterparty"><AccountCircle style={{color:'#0e094b'}}/></Tooltip></div>),
    accessor: 'counterparty',
    id: 'counterparty',
    Cell: (row: any) => (
        <div style={{ padding: '5px', marginTop:'7px' }}>
          {row.value ?
            <span>
              <JdenticonSmall hash={row.value} size="35px" {...props}/>
            </span>
          :
            <span/>
          }
        </div>
      )
    },{
    Header: (row: any) => (<div><h4 style={{color:'#0e094b'}}>Status</h4><Tooltip title="Status" aria-label="Status"><Info style={{color:'#0e094b'}}/></Tooltip></div>),
    id: 'status',
    accessor: 'status',
    Cell: (row: any) => (
      <div style={{ padding: '5px', marginTop:'13px' }}>
        <TransactionDetailsButton
          {...props}
          invokeTxCall={invokeTxCall}
          transactionState={row.value}
          rowInfo={row}
          resetPage={() => cb()}
        />
      </div>
      )
    },
    // }, {
    // Header: (row: any) => (<SwapVerticalCircle style={{color:'#0e094b'}}/>),
    // id: 'originEvent',
    // accessor: 'originEvent',
    // Cell: (row: any) => (
    //   <div style={{ padding: '5px', marginTop:'13px', fontSize:".95rem" }}>
    //     {/* <p style={{fontSize:'1rem', margin:'0 auto', marginTop:'8px', textDecoration:'underline'}}>{row.original.status}</p> */}
    //
    //     {row.original.status === "incoming/requested" ?
    //         <span className="increasedBalance" style={{color:"#00828d"}}>
    //           was asked for
    //         </span>
    //
    //     : row.original.status.split("/")[0] === "incoming" ?
    //         <span className="increasedBalance" style={{color:"#00828d"}}>
    //           is offering
    //         </span>
    //
    //     : row.original.status.split("/")[0] === "outgoing" ?
    //         <span className="decreasedBalance" style={{color:"#b85eb3"}}>
    //           was offered
    //         </span>
    //
    //     : row.original.status.split("/")[0] === "pending" &&
    //       row.original.status.split("/")[1] === "spender" ?
    //         <span className="decreasedBalance" style={{color:"#b85eb3"}}>
    //           requested
    //         </span>
    //
    //     :  row.original.status.split("/")[0] === "pending" &&
    //        row.original.status.split("/")[1] === "recipient" ?
    //         <span className="increasedBalance" style={{color:"#00828d"}}>
    //           offered
    //         </span>
    //     :
    //         <span/>
    //     }
    //     </div>
    //   )
    // },
    {
    Header: (row: any) => (<div><h4 style={{color:'#0e094b'}}>Amount</h4><Tooltip title="Amount" aria-label="Amount"><ChangeHistory style={{color:'#0e094b'}}/></Tooltip></div>),
    id: "amount",
    accessor: (d:any) => d.amount,
    Cell: (row: any) => (
      <div style={{ padding:'5px', marginTop:'13px', fontSize:".9rem"}}>
        {row.original.status.split("/")[0] === "incoming" ?
            <span className="increasedBalance" style={{color:"#00828d"}}>
              +{ row.value } HF
            </span>

        : row.original.status.split("/")[0] === "outgoing" ?
            <span className="decreasedBalance" style={{color:"#b85eb3"}}>
              -{ row.value } HF
            </span>

        : row.original.status.split("/")[0] === "pending" &&
          row.original.status.split("/")[1] === "spender" ?
            <span className="decreasedBalance" style={{color:"#b85eb3"}}>
            -{ row.value } HF
            </span>

        :  row.original.status.split("/")[0] === "pending" &&
           row.original.status.split("/")[1] === "recipient" ?
            <span className="increasedBalance" style={{color:"#00828d"}}>
            +{ row.value } HF
            </span>
        :
            <span/>
        }
      </div>
      )
    }]
  return table_columns;
};
