// /* TODO: Add profile (with update ability) once the ZOME API funcationality exists....*/

import * as React from 'react';
import classnames from 'classnames';
import * as moment from 'moment';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
// import Avatar from '@material-ui/core/Avatar';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import ProfileInfoCard from '../page-sub-components/info-card/ProfileInfoCard';
import ProfileRegistrationForm from '../page-sub-components/info-card/ProfileRegistrationForm';
import { getDisplayName } from '../../utils/global-helper-functions';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  txType: string,
  newprofile: boolean,
  persistedAgentInfo : {
    agentHash: string | null,
    agentName: string | null,
    email: string | null
  } | null,
  history: any
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  agentData: {agentHash: string, agentString: string} | null,
  prevProps: any
}

class AgentProfile extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      agentData: {agentHash:"", agentString:""},
      prevProps: {},
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

  componentDidMount () {
    // instead of props API call to fetch Agent Hash (currently awaiting Profiles Zome), set state for moment..
    let newAccess = Object.assign({}, this.state.agentData);
    newAccess.agentHash = this.props.my_agent_hash;
    this.setState({agentData: newAccess});
  }

  public render () {
    console.log('newprofile : ', this.props.newprofile);

    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    let today = moment(new Date());
    const MOCK_AGENT_JOIN_DATE = today.toString().substring(0, 16);
    const DEFAULT_EMAIL = this.state.agentData!.agentString === 'Envoy Host' ? `envoyhost-${getDisplayName(this.state.agentData!.agentHash || '1')}@holo.host` : `${getDisplayName(this.state.agentData!.agentString || "Qm001")}@holo.host`;
    // const DEFAULT_NAME = this.props.persistedAgentInfo!.agentName || this.state.agentData!.agentString;

    return (
    <div>
      <Typography className={classnames(classes.tableHeader, classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
        HoloFuel Profile
      </Typography>
      <br/>
      <br/>
      <br/>

      {this.props.newprofile ?
        <ProfileRegistrationForm
          {...newProps}
          agentData={this.state.agentData || null}
          agentHash={this.state.agentData!.agentHash}
          email={DEFAULT_EMAIL}
          history = {this.props.history}
        />

      :
        <ProfileInfoCard
          {...newProps}
          agentData={this.state.agentData || null}
          agentHash={this.state.agentData!.agentHash}
          name={this.props.persistedAgentInfo!.agentName}
          email={this.props.persistedAgentInfo!.email || DEFAULT_EMAIL} dateJoined={MOCK_AGENT_JOIN_DATE}
        />
      }

      {/* <div className={classes.jumbotronImg}>
        <h4 className={classes.h4}> Your HoloFuel ID</h4>
        <QrGenerator agentHash={this.state.agentData!.agentHash}/>
      </div> */}

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
  )}
}

export default withStyles(styles)(AgentProfile);
