import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';
// import styles from '../../styles/page-styles/DefaultPageMuiStyles'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import QrGenerator from '../qr-generator/QrGenerator';
import Jdenticon from '../avatar-generator/Jdenticon';
import Tooltip from '@material-ui/core/Tooltip';

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


export interface OwnProps {
  classes: any,
  agentHash: string,
  name: string | null,
  email: string,
  dateJoined: string,
  agentData:{agentHash: string, agentString: string} | null,
}
export type Props = OwnProps & StateProps & DispatchProps;


function ProfileInfoCard(props: Props) {
  const { classes, agentHash, name, email, dateJoined,agentData, ...newProps } = props;
  // const bull = <span className={classes.bullet}>•</span>;
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
              <Typography className={classnames(classes.typography, classes.balanceHeader)} variant="h5" component="h2">
                {name}
              </Typography>
              <Typography className={classnames(classes.typography, classes.title)} color="textSecondary" gutterBottom>
                {email}
              </Typography>
              <hr/>
              <Typography className={classnames(classes.typography, classes.pos)} color="textSecondary">
                {dateJoined}
              </Typography>
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
                  <h4 className={classnames(classes.typography, classes.balanceHeader)}> Your Digital Fingrprint</h4>
                  <QrGenerator agentHash={agentHash}/>
                </div>
              </Tooltip>
            </CardContent>
          </Grid>
        </Card>
    </main>
  );
}

export default withStyles(styles)(ProfileInfoCard);
