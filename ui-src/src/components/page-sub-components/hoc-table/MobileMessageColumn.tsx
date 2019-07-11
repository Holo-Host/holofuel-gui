// Main Imports
import * as React from 'react';
// MUI styles
import { withStyles } from '@material-ui/core/styles';
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any
  originEvent: string,
  rowInfo: any
};
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  originalTxTimestamp:string,
  eventTxTimestamp:string,
  txStatus:string,
  todo:string
};

class MobileMesssageColumn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalTxTimestamp:"",
      eventTxTimestamp:"",
      txStatus:"",
      todo:""
    }
  }

  public render() {
    const currentRowInfo = this.props.rowInfo.original;

    return (
      <div>
        <h5 style={{marginBottom:'10px'}}>
          {`${currentRowInfo.counterparty}`}
        </h5>

         {currentRowInfo.status.split("/")[0] === "incoming" ?
             <span className="increasedBalance" style={{color:"#00828d", margin: "2px"}}>
               + { currentRowInfo.amount } HF
             </span>

         : currentRowInfo.status.split("/")[0] === "outgoing" ?
             <span className="decreasedBalance" style={{color:"#b85eb3", margin: "2px"}}>
               - { currentRowInfo.amount } HF
             </span>

         : currentRowInfo.status.split("/")[0] === "pending" &&
           currentRowInfo.status.split("/")[1] === "spender" ?
             <span className="decreasedBalance" style={{color:"#b85eb3", margin: "2px"}}>
             - { currentRowInfo.amount } HF
             </span>

         :  currentRowInfo.status.split("/")[0] === "pending" &&
            currentRowInfo.status.split("/")[1] === "recipient" ?
             <span className="increasedBalance" style={{color:"#00828d", margin: "2px"}}>
             + { currentRowInfo.amount } HF
             </span>
         :
             <div/>
         }

      </div>
    )
  }
}

export default withStyles(styles)(MobileMesssageColumn);
