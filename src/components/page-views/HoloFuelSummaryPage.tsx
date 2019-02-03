import * as React from 'react';
// import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
// import Typography from '@material-ui/core/Typography';
// local imports
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import TransactionTables from '../page-sub-components/hoc-table/SummaryTransactionTables';
import OutlinedButton from '../page-sub-components/outlined-button/OutlinedButton';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar'

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
}

class HoloFuelSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
  }

  public render () {
    // TODO: Comment out the following once dataRefactor & dataFilter are complete
    console.log('Props in HoloFuelSummaryPage:', this.props);
      const { classes, ...newProps } = this.props;
    return (
      <div>
        <div className={classes.tableButtonBar}>
          <OutlinedButton text="refresh" color="primary" />
          <OutlinedButton text="view more" color="primary" />
        </div>

        <TransactionTables {...newProps} />

        <BottomMenuBar {...newProps} />
      </div>
    );
  }
}

export default withStyles(styles)(HoloFuelSummaryPage);
