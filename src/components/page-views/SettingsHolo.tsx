// import { Link } from 'react-router-dom';
import * as React from 'react';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  txType: string,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// The components optional internal state
}

class HoloSettings extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
  }

  public render () {
    console.log('Props in HoloFuelTransferFormPage:', this.props);
    const { classes, transferBtnBar, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    return (
    <div>
      <div className={classes.reducedJumbotron}>
        <h3 className={classes.h3}>Current Balance</h3>
        <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
          {this.props.ledger_state.balance} + 200 HF
        </Typography>
        <hr style={{color:"#0e094b"}} />
        <h3 className={classes.h3}>Credit limit : 80 HF {this.props.ledger_state.credit} </h3>
      </div>

      <div>
        <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Settings for HoloFuel Account
        </Typography>

        { transferBtnBar ?
          <Portal>
            <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
              <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
            </Slide>
          </Portal>
        :
          <div/>
        }
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(HoloSettings);
