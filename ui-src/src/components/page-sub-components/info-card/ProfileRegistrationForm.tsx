import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';
////////////////////////////////////////////////////////
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import DialogError from '../error-message/DialogError';
import QrGenerator from '../qr-generator/QrGenerator';
import Jdenticon from '../avatar-generator/Jdenticon';

const styles: StyleRulesCallback  = (theme: Theme) => ({
  card: {
    display: 'flex',
    minWidth: 375,
    maxWidth: 575,
    margin: '0 auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  content: {
   flex: '1 0 auto',
 },
 controls: {
   display: 'flex',
   alignItems: 'center',
   paddingLeft: theme.spacing.unit,
   paddingBottom: theme.spacing.unit,
 },
 details: {
   display: 'flex',
   flexDirection: 'column',
 },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  headerAvatar: {
    height: 130,
    width: 130,
    background: '#00838d',
  },
  typography: {
    marginBottom: '15px',
  },
  jumbotronImg:{
    display: 'block',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    border: '1rem',
    opacity: .9,
    borderRadius: 4,
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      padding: '1.2rem'
    }
  },
  h4: {
    color: '#d8dee3',
    fontSize: 18,
    fontWeight: 300,
    marginBottom: 3,
  },
  topProfileCard:{
    marginLeft: 30
  }
});

type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;

export interface OwnProps {
  classes: any,
  agentHash: string,
  email: string,
  agentData:{agentHash: string, agentString: string} | null,
  history: any
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  agentName: string,
  email: string,
  errorMessage: string,
  toTxDashboard: boolean
}


class ProfileRegistrationForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      agentName: "",
      email: this.props.email || "",
      errorMessage: "",
      toTxDashboard: false
    };
  }

  el: LabelRef = null;
  public handleRef (el: any) { // tslint:disable-line
    this.el = ReactDOM.findDOMNode(el!) as HTMLLabelElement | null;
  }

  public componentDidMount() {
    this.setState({toTxDashboard: false});
  }

  // public handleProfileChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   this.setState({ [name]: value });
  // }

  public handleProfileChange = (name: StateKeyType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'agentName':
        this.setState({
          agentName: event.target.value,
        });
        break;

      case 'email':
        this.setState({
          email: event.target.value.trim(),
        });
        break;

      default:
        return "";
    }
  };

  private handleClickSubmit = () => (event: any) => {
    console.log("this.state : ", this.state);

    let valid: boolean = true;
    // 1. verify all inputs are preent and valid
    if (this.state.email) {
       if (this.state.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
          valid = false;
        } else if (this.state.email.trim() === '') {
          valid = false;
        }

      if(valid === false){
        this.setState({ errorMessage: "Your email is currently blank or invalid. Please type in an valid email to continue."});
        return <DialogError errorMessage={this.state.errorMessage}/>
      }
    }

    if (!this.state.agentName || this.state.agentName.trim() === ""){
      valid = false;
      this.setState({errorMessage: "Your username is currently blank. Please type in a name to continue." })
      return <DialogError errorMessage={this.state.errorMessage}/>
    }

    // 2. submit profile updates, if have valid email and agentName
    if (valid === true ) {
      this.handleSubmitProfile()
    }
  }

  public handleSubmitProfile = async () => {
    const agent_profile = {
      agentHash: this.props.agentHash
    }
    const updatedProfile = { ...agent_profile, agentName: this.state.agentName.trim(), email: this.state.email.trim()}
    console.log("profile to be registered in holofuel", updatedProfile);

    // 3. refresh local state & redirect to the home dashboard
    let profileUpdated: any = null;
    profileUpdated = await this.props.update_profile( updatedProfile);

    if (profileUpdated !== null) {
      await this.clearProfileUpdates();
      await this.resetErrorMessage();
      // @ts-ignore
      // this.props.history.push('/')
      this.setState({toTxDashboard: true});
    }
  }

  public clearProfileUpdates = () => {
    this.setState({
      agentName: "",
      email: ""
    })
  };

  public resetErrorMessage = () => {
    this.setState({ errorMessage: "" });
  }

  public render() {
    const { classes, agentHash, email, ...newProps } = this. props;

    if (this.state.toTxDashboard === true) {
      return <Redirect to='/holofuelsummary' />
    }

    return (
      <main>
        <Card className={classes.card}>
          <Grid
            container={true}
            spacing={24}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <div className={classes.details}>
              <CardContent  className={classes.topProfileCard}>
                <h4 className={classnames(classes.typography, classes.balanceHeader)}> Your Digital ID</h4>
                <br/>

                <Tooltip title="This is not a profile picture.  It is actually a visual representaiton of your digial identity." aria-label="This is not a profile picture.  It is actually a visual representaiton of your digial identity." classes={{ tooltip: classes.lightTooltip }}>
                 <Avatar className={classnames(classes.headerAvatar, classes.profile)}>
                   <Jdenticon hash={ agentHash } size="105px" {...newProps} />
                 </Avatar>
               </Tooltip>
              </CardContent>
            </div>
            <CardContent className={classes.content}>
              <Grid item={true} xs={12}>
                <FormControl>
                  <TextField
                      id="agentName"
                      label="My Username"
                      value={this.state.agentName || ''}
                      onChange={this.handleProfileChange('agentName')}
                      className={classnames(classes.typography, classes.balanceHeader)}
                    />
                </FormControl>
              </Grid>

              <br/>
              <br/>

              <Grid item={true} xs={12}>
                <FormControl>
                  <TextField
                      id="email"
                      label={'My Email'}
                      value={this.state.email || ''}
                      onChange={this.handleProfileChange('email')}
                      className={classnames(classes.typography, classes.title)}
                    />
                </FormControl>
              </Grid>
              <br/>
              <Grid container={true} direction="column" alignItems="center" justify="center" className={classes.btn}>
              <Grid item={true} xs={12}>
                <Button variant="contained" size="large" color="primary" onClick={this.handleClickSubmit()}>
                    Submit
                </Button>
              </Grid>
            </Grid>
            </CardContent>
          </Grid>
        </Card>
        <br/>
        <Card className={classes.card}>
          <Grid
            container={true}
            spacing={24}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <CardContent className={classes.content}>
              <Tooltip title="This QR code is your digial fingerprint. It encodes your digital identity in a way that allows to you to transact with convenience and mobility through use of cellphone cameras." aria-label="This QR code is your digial fingerprint. It encodes your digital identity in a way that allows to you to transact with convenience and mobility through use of cellphone cameras." classes={{ tooltip: classes.lightTooltip }}>
                <div className={classes.jumbotronImg}>
                  <h4 className={classnames(classes.typography, classes.balanceHeader)}> Your Digital Fingerprint</h4>
                  <QrGenerator agentHash={agentHash}/>
                </div>
              </Tooltip>
            </CardContent>
          </Grid>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(ProfileRegistrationForm);
