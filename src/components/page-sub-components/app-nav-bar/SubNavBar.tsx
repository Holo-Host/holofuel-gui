import * as React from 'react';
import { Link } from 'react-router-dom';
// MUI Imports:
import { withStyles, Theme } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
// import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// import styles from '../../styles/page-sub-component-styles/DashboardMuiStyles';


const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    margin: '0 auto',
    flexGrow: 1,
    background: '#201e3d',
    // color:  '#057266f2',
    display: 'inline'
  },
  grow: {
    flexGrow: 1,
  }
});


export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any;
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  file: "",
  file_path: "",
  message: "",
  errorMessage: ""
}

const button : boolean = true;
const gutterBottom : boolean = true;

class SubNavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      file: "",
      file_path: "",
      message: "",
      errorMessage: ""
    };
  }

  public render(){
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{margin: '0 auto', marginTop:"64px", background: "#0e3658"}}>
          <Toolbar style={{margin: '0 auto'}}>
            <div>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button}>
              <Link to='/holofuelsummary'>
                <ListItemIcon style={{color:"#799ab6"}}>
                  <DashboardIcon />
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  Transaction Summary
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "45px"}} button={button}>
              <Link to='/holofuelrequest'>
                <ListItemIcon style={{color:"#799ab6"}}>
                  <LayersIcon />
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  Account Transfer
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "45px"}} button={button}>
              <Link to='/about'>
              <ListItemIcon style={{color:"#799ab6"}}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                About
              </Typography>
            </Link>
            </ListItem>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )}
};


export default withStyles(styles)(SubNavBar);
