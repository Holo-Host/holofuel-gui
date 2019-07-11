import * as React from 'react';
// MUI CUSTOM style imports
import { withStyles } from '@material-ui/core/styles';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import * as jdenticon from 'jdenticon';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  hash: string,
  size: string
}
export type Props = OwnProps & StateProps & DispatchProps;

class Jdenticon extends React.Component<Props, {}> {
  public render () {
    const { hash } = this.props;
    // console.log("size for jdenticon", size);

    const __html = jdenticon.toSvg(hash, 110);
    return <div dangerouslySetInnerHTML={{__html}} />
  }
}

export default withStyles(styles)(Jdenticon);
