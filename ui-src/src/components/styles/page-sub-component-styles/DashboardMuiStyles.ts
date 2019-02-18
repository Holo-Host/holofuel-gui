import { Theme } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// MUI Custom Styling :
const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
      display: 'flex',
      // background: "#eee"
    },
    title: {
     flexGrow: 1,
     display: 'none',
     [theme.breakpoints.up('sm')]: {
        display: 'block',
     },
     color: "#eee", // #303341
     fontWeight: "lighter",
     fontFamily: 'Raleway'
    },
    grow: {
      flexGrow: 1,
    },
    // toolbar: {
    //   paddingRight: 24, // keep right padding when drawer closed
    // },
    mainHeader: {
      textAlign: "center",
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 3px',
      // color: "#0e88efde",
    },
    topNav: {
      // background: 'linear-gradient(45deg, #1a0231f2, #00017f)',
    },
    topNavShift: {
      // width: `100%`,
    },
    menuButton: {
      marginLeft: 0,
      marginRight: 0
    },
    menuButtonHidden: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      // background: 'linear-gradient(45deg, #00017fb3, #1a0231eb)',
      color: "white",
      width: `100%`,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    //  navAppLogo : {
    //   width: 105,
    //   height: 70,
    //   flex:"0 1 auto",
    //   marginTop: 15,
    //   padding: 0
    // },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '160%',
      [theme.breakpoints.up('sm')]: {
        maxWidth: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    navMenuItemsWrapper : {
      textAlign: 'center',
      justifyContent: 'center',
    },
    navMenuItems : {
      display: 'inline', // change to flex / inline-flex ??
    }
  });

  export default styles;
