// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";
// import Jdenticon from "../avatar-generator/Jdenticon";
// MUI Custom Style Imports :
import Today from '@material-ui/icons/Today';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Info from '@material-ui/icons/Info';
import '../../styles/page-styles/scaffold-styles.css';

export type Props = DispatchProps & StateProps;

/* Transaction Table Headers */
export const tx_table_columns = (props: Props, state: any, cb:() => void) => {
  const table_columns = [{
    Header: (row: any) => (<Today/>),
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
    Header: (row: any) => (<AccountCircle/>),
    accessor: 'counterparty',
    id: 'counterparty',
    Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
          {row.value ?
            <span>
              {/* <Jdenticon hash={row.value} size="35px" {...props}/> */}
              <p style={{fontSize:'.5rem', margin:'0 auto', marginTop:'2px'}}>{ row.value }</p>
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
    Cell: (row: any) => (
      <div style={{ padding: '5px', marginTop:'13px', fontSize:".95rem" }}>
        {row.original.status.split("/")[0] === "incoming" ?
            <span className="increasedBalance" style={{color:"#00828d"}}>
              { row.value }
            </span>

        : row.original.status.split("/")[0] === "outgoing" ?
            <span className="decreasedBalance" style={{color:"#b85eb3"}}>
              { row.value }
            </span>

        : row.original.status.split("/")[0] === "pending" &&
          row.original.status.split("/")[1] === "spender" ?
            <span className="decreasedBalance" style={{color:"#b85eb3"}}>
          { row.value }
            </span>

        :  row.original.status.split("/")[0] === "pending" &&
           row.original.status.split("/")[1] === "recipient" ?
            <span className="increasedBalance" style={{color:"#00828d"}}>
            { row.value }
            </span>
        :
            <div/>
        }
        </div>
      )
    }, {
    Header: (row: any) => (<ChangeHistory/>),
    id: "amount",
    accessor: (d:any) => d.amount,
    Cell: (row: any) => (
      <div style={{ padding:'5px', marginTop:'13px', fontSize:".8rem"}}>
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
            <div/>
        }
      </div>
      )
    },{
    Header: (row: any) => (<Info/>),
    id: 'status',
    accessor: 'status',
    Cell: (row: any) => (
      <div style={{ padding: '5px', marginTop:'0px'}}>
        <TransactionDetailsButton
          {...props}
          transactionState={row.value}
          rowInfo={row}
          resetPage={() => cb()}
        />
      </div>
      )
    }]
  return table_columns;
};
