import * as React from 'react';
// import { Link } from 'react-router-dom';
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
// import Typography from '@material-ui/core/Typography';

export interface OwnProps {
  // These are props the component has received from its parent component
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// The components optional internal state
}

class AboutHolo extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
  }

  public render () {
    console.log('Props in AboutHolo:', this.props);
    // const { classes } = this.props;
    return (
      <div>
        <h2>About HoloFuel</h2>
      </div>
    );
  }
}

export default withStyles(styles)(AboutHolo);
