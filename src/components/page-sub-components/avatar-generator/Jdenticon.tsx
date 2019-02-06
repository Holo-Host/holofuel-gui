import * as React from 'react';
// MUI CUSTOM style imports
import { withStyles } from '@material-ui/core/styles';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  hash: string,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State { /* The components optional internal state */ };

class Jdenticon extends React.Component<Props, State> {
  el: any = null

  componentDidUpdate() {
    (window as any).jdenticon.update(this.el)
  }

  componentDidMount() {
    (window as any).jdenticon.update(this.el)
  }

  handleRef (el: any) { // tslint:disable-line
    this.el = el
  }

  public render () {
    const { hash } = this.props; // style ===> (..if wish to concat styles with parent styles)
    return <svg
      { ...this.props }
      style={{verticalAlign: 'middle', maxWidth:'100%'}} // style={...styles} style ===> (..if wish to concat styles with parent styles)
      ref={(el) => this.handleRef(el)} // tslint:disable-line
      data-jdenticon-value={hash}
      />
  }
}

export default withStyles(styles)(Jdenticon);
