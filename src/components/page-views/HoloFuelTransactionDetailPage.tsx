import * as React from 'react';
// import { Link } from 'react-router-dom';
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import RequestProposalFormBtns from '../page-sub-components/input-fields/RequestProposalFormBtns';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Typography from '@material-ui/core/Typography';
// import Typography from '@material-ui/core/Typography';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// The components optional internal state
}

class HoloFuelTransactionDetaiPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
  }

  public render () {
    console.log('Props in HoloFuelTransactionDetaiPage:', this.props);
    const { classes } = this.props;
    const gutterBottom : boolean = true;
    return (
      <div>
        <br/>
        <br/>
        <div className={classes.jumbotronPicture}>
          <img src="/assests/background-prints/qr-code-temp.png" alt="Your QR Code" width="100px"/>
        </div>
        <div>
        <Typography className={classes.mainHeader} variant="display1" gutterBottom={gutterBottom} component="h1" >
            Payment Details
        </Typography>
        <RequestProposalFormBtns />
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(HoloFuelTransactionDetaiPage);
