// MUI Custom Styling :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';

const styles: StyleRulesCallback  = (theme: Theme) => ({
    root: {
      display: 'flex',
      background: ""
    },
    appBarSpacer:{
      // minHeight: 95
    },
    title: {
      flexGrow: 1,
      color: '',
    },
    subtitle: {
      flexGrow: 1,
      color: '#5c7388',
    },
    mainHeader: {
      // marginTop: 160,
      textAlign: "center",
      color: '#00838d',
      fontWeight: 600,
      fontSize: 65
    },
    tableHeader: {
      marginTop: 25,
      textAlign: "center",
      color: '#d8dee3', // color : #d8dee3, // #909fb1 // rgba(0, 0, 0, 0.54)
      fontWeight: 400,
      fontSize: '2.125rem'
    },
    tableContainer: {
      display: 'block',
      boxSizing: 'border-box',
      margin: 20,
      marginTop: 20,
      marginBottom: 50,
      backgroundColor: 'transparent', // #c3cdd6
      border: 3,
      borderRadius: 4,
      zIndex: 2,
      overflow: 'hidden'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      background: '#4b6a7d',
      // background: "#111a58eb" // 343752eb 111a58eb
      // background: 'linear-gradient(45deg,#47499063 10%, #111a58eb)', // #08125feb ; #030831eb
    },
    appTable : {
      marginTop: 50,
      // border: '2px solid #282a2f',
      // border: '1px solid #999ca7',
      // boxShadow:'2px solid whitesmoke'
    },
    table : {
      border: 'none',
      color: '#d8dee3',
      fontWeight: 'bolder',
      fontSize: 18
    },
    jumbotron: {
      display: 'block',
      boxSizing: 'border-box',
      padding: '1rem',
      marginBottom: '2rem',
      backgroundColor: '#e9ecef',
      opacity: .9,
      border: '.3rem',
      borderRadius: 4,
      [theme.breakpoints.down('sm')]: {
        padding: '1.2rem'
      }
    },
    jumbotronFluid: {
      display: 'block',
      boxSizing: 'border-box',
      padding: '2rem 0rem',
      marginBottom: '2rem',
      backgroundColor: '#e9ecef',
      border: '.1rem',
      opacity: .9,
      borderRadius: 3,
      [theme.breakpoints.down('sm')]: {
        padding: '3.5rem'
      }
    },
    jumbotronPicture: {
      display: 'block',
      boxSizing: 'border-box',
      padding: '1rem',
      marginBottom: '2rem',
      backgroundColor: '#e9ecef',
      opacity: .9,
      border: '.3rem',
      borderRadius: 4,
      [theme.breakpoints.down('sm')]: {
        padding: '1.2rem'
      }
    },
    button: {
      color: '#d8dee3',
      margin: theme.spacing.unit,
      display: "inline",
      width: 'calc(100vw / 2.85)',
      border: '1px solid #d8dee3'
    },
    tableButtonBar : {

    },
    buttonMenu : {

    },
    overlay : {
      position: 'fixed',
      display: 'none',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 2,
      cursor: 'pointer'
    },
    overlayTop : {
      position: 'relative',
      top: 0,
      left: 0
    }
});

export default styles;
