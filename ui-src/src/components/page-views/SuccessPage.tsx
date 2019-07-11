import * as React from 'react';
import { Redirect } from 'react-router-dom';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
// import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import InformativeModal from '../page-sub-components/modal/InformativeModal';

export interface OwnProps {
  classes: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  txType: string,
  history: any
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  agentData: {agentHash: string, agentString: string} | null,
  prevProps: any,
  messageObj: {message: string},
  showModal: boolean,
  toTxDashboard: boolean
}

class SuccessPage extends React.Component<Props, State> {
    constructor(props:Props){
      super(props);
      this.state = {
        agentData: {agentHash:"", agentString:""},
        prevProps: {},
        messageObj: {message: ""},
        showModal: false,
        toTxDashboard: false
      }
    };

    static getDerivedStateFromProps(props: Props, state: State) {
      const { my_agent_hash, my_agent_string } = props;
      if (!my_agent_hash) {
        return null;
      }
      else {
        const data = { agentHash: my_agent_hash, agentString: my_agent_string };
        const prevProps = state.prevProps || {};
        const agentData = prevProps.value !== data ? data : state.agentData
        return ({ agentData, prevProps: agentData });
      }
    }

    public componentDidMount () {
      // instead of props call (while awaiting completion), set state for moment..
      let newAccess = Object.assign({}, this.state.agentData);
      newAccess.agentHash = this.props.my_agent_hash;
      this.setState({
        agentData: newAccess,
         messageObj: {message: "Success!"},
         showModal: true
      });
    }

    public reroutePage = () => {
      console.log("Rerouting page to TX TABLE dash PAGE >> ", this.state.toTxDashboard);
      this.setState({toTxDashboard: true});
      this.resetMessage();
    };

    public resetMessage = () => {
      this.setState({ messageObj: {message: ""} });
    }


  public render () {
    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;

    if (this.state.toTxDashboard === true) {
      this.setState({toTxDashboard: false});
      return <Redirect to='/holofuelsummary' />
    }

    return (
    <div>
      <br/>
      {/* Toggle Confirmation Message (aka. InformativeModal) */}
        { this.state.showModal ?
          <InformativeModal
            handleReroute={this.reroutePage}
            confirmMessage={JSON.stringify(this.state.messageObj)}
            {...newProps}
          />
        :
          <div/>
        }

        <div>
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
  )};
}

export default withStyles(styles)(SuccessPage);
