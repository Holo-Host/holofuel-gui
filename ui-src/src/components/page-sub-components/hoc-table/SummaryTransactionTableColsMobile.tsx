// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// import Jdenticon from "../avatar-generator/Jdenticon";
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";
import MobileMessageColumn from "./MobileMessageColumn";
// mui styles
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import Today from '@material-ui/icons/Today';
import Info from '@material-ui/icons/Info';

/* Transaction Table Headers */
const mobile_tx_table_columns = (props: any, state: any, cb:() => void) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
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
    Header: (row: any) => (<SwapVerticalCircle/>),
    id: 'originEvent',
    accessor: 'originEvent',
    Cell: (row: any) => (
      <div style={{ padding: '5px', marginTop:'-12px' }}>
        <MobileMessageColumn originEvent={row.value.display_value} rowInfo={row} {...props} />
      </div>
      )
    }, {
    Header: (row: any) => (<Info/>),
    id: 'status',
    accessor: 'status',
    Cell: (row: any) => (
      <div style={{ padding: '5px'}}>
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
export default mobile_tx_table_columns;
