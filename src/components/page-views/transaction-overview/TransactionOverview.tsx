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
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
}
export interface StateProps {
// Props that are set by mapStateToProps
  list_of_instance_info: typeof constants.instanceListData,
  list_of_transactions: typeof constants.processedData
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
  get_info_instances: () => void,
  list_transactions: () => void
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// The components optional internal state
}

class TransactionOverview extends React.Component<Props, State> {
  componentDidMount () {
    console.log("PROPS : ", this.props);
    // Invoke GET_INFO_INSTANCES()
    this.props.get_info_instances();
    // this.props.get_info_instances().then(res => {
    //   console.log('Home props after get_info_instances() Invocation', this.props);
    // });

    // Invoke list_transactions() (a ZOME Call) :
    this.props.list_transactions();
    // this.props.list_transactions().then(res => {
    //   console.log('Home props after list_transactions() Invocation', this.props);
    // });
  }

  handleClick = () => {
    console.log("calling : get_info_instances >> ", this.props.get_info_instances);
    this.props.get_info_instances();
    console.log("calling : list_transactions >> ", this.props.list_transactions);
    this.props.list_transactions();

  // Invoke list_transactions() (a ZOME Call) :
    // this.props.list_transactions().then(res => {
    //   console.log('Home props after list_transactions() Invocation', this.props);
    // });
  }


  handleNextPageClick = () => {
    console.log('Youpresed the button, and should be proceeding to the test app now...');
  }

  public render () {
    console.log('Props in TransactionOverview:', this.props);
    return (
      <div>
        <h1 style={{textAlign:"center"}} >Welcome to the API Testing Page</h1>
        <h4 style={{textAlign:"center"}}>Check out the console for more info...</h4>
        <button onClick={() => this.handleClick()}>
          Test Out API Calls
        </button>

        <br/>
        <br/>

        <h4 style={{textAlign:"center"}}>Or visit the test app.</h4>
        <br/>
        <Link to='/testapp'>
          <button onClick={() => this.handleNextPageClick()}>
            Visit Test App
          </button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionOverview);
