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
    console.log("MobileMesssageColumn props", this.props);
    console.log("MobileMesssageColumn state", this.state);

    return (
      <div>
        <h5 style={{marginBottom:'10px'}}>{`${currentRowInfo.counterparty} ${currentRowInfo.originEvent}ed`}</h5>

        { currentRowInfo.originEvent === "Request" ?
            <h3 className="decreasedBalance" style={{color:"#af67ad", margin:'2px'}}>
              - { currentRowInfo.amount } HF
            </h3>
         :
            <h3 className="increasedBalance" style={{color:"#00828d", margin:'2px'}}>
              + { currentRowInfo.amount } HF
            </h3>
         }

        <hr/>
        <h5 style={{margin:'2px'}}>{currentRowInfo.originTimeStamp}</h5>

      </div>
    )
  }
}

export default withStyles(styles)(MobileMesssageColumn);
