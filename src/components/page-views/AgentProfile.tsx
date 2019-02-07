import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import QrGenerator from '../page-sub-components/qr-generator/QrGenerator';
import Jdenticon from '../page-sub-components/avatar-generator/Jdenticon';

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
  agentHash: string,
}

const CONTAINER_TESTER_AGENT_HASH = 'HoloTester2-----------------------------------------------------------------------AAAGy4WW9e';

class AgentProfile extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      agentHash: CONTAINER_TESTER_AGENT_HASH,
    }
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
    // set the this.state.agentHash value  !!!!
  }

  public render () {
    console.log('Props in AgentProfile:', this.props);
    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    return (
    <div>
      <div className={classnames(classes.flexContainer, classes.reducedJumbotron)}>
        <div className={classes.flexItem}>
          <Avatar className={classnames(classes.headerAvatar, classes.profile)}>
            <Jdenticon hash={CONTAINER_TESTER_AGENT_HASH} {...newProps} />
          </Avatar>
        </div>
        <div className={classes.verticalLine}/>
        <div className={classes.flexItem}>
          <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
            Agent Username
          </Typography>
        </div>
      </div>

        <div className={classes.jumbotronImg}>
          <h4 className={classes.h4}> Your HoloFuel ID</h4>
          <QrGenerator agentHash={this.state.agentHash}/>
        </div>



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
  );

    // /* TODO: return access (remove parethesis) the following once we have access to Agent_id and an agent's profile functions (create/update, etc.) */
    (
    // remove wrapping div once reintegrate code...
      <div>
        <hr className={classes.horizontalLine}/>

        <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
        Your Profile Details
        </Typography>
        <br/>
        <br/>
        <Card className={classes.cardBodyBackground}>
        <Avatar className={classnames(classes.descriptionAvatar, classes.profile)}>
        <Jdenticon hash={CONTAINER_TESTER_AGENT_HASH} {...newProps} />
        </Avatar>
        <CardContent className={classes.cardbodyContent}>
        <h4 className={classes.h4}>Agent Email</h4>
        <h3 className={classes.h3}>Full Agent Name</h3>
        <h4 className={classes.h4}>Username</h4>
        <hr/>
        <p className={classes.cardbodyContent}>
        General auto-bibliographical description goes here...
        </p>
        </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(AgentProfile);
