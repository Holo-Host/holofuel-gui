import * as React from 'react';
import { Link } from 'react-router-dom';
import * as constants from '../../../utils/seed-data/mock-data';
// import classnames from 'classnames';
import { StyleRulesCallback } from '@material-ui/core/';
import { withStyles, Theme } from '@material-ui/core/styles';
// local page-views imports
// local sub-component imports :
// utils import :
// custom mui styles :

// autoCompleteTransactionField

const styles: StyleRulesCallback = (theme: Theme) => ({
 // mui style obj goes here...
});

export interface OwnProps {
  // These are props the component creates and maintains within itself &&/ from its parent component
  // e.g. what you write in <ExampleComponent ...>
}
export interface StateProps {
// Props that are set by mapStateToProps
  list_of_instance_info: typeof constants.instanceListData,
  list_of_transactions: typeof constants.processedData
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
  get_info_instances: () => Promise<any>,
  list_transactions: () => Promise<any>
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// The components optional internal state
}

class TransactionOverview extends React.Component<Props, State> {

  componentDidMount () {
    // Invoke GET_INFO_INSTANCES()
    this.props.get_info_instances().then(res => {
      console.log("Home props after INFO/INSTANCES call", this.props);
    });

    // Invoke list_transactions() (a ZOME Call) :
    this.props.list_transactions().then(res => {
      console.log("Home props after list_transactions() Invocation", this.props);
    });
  }

  handleClick = () => {
    // Invoke list_transactions() (a ZOME Call) :
    this.props.list_transactions().then(res => {
      console.log("Home props after list_transactions() Invocation", this.props);
    });
    console.log('Youpresed the button, and should be proceeding to the test app now...');
  }

  public render () {
    console.log("Props in TransactionOverview:", this.props);
    return (
      <div>
        <h1>Welcome to the API Testing Page</h1>
        <h4>Check out the console for more info...</h4>

        <br/>
        <br/>

        <h4>Or visit the test app.</h4>
        <br/>
        <Link to='/testapp'>
          <button onClick={() => this.handleClick()}>
            Visit Test App
          </button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionOverview);
