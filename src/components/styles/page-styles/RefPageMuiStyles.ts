// MUI Custom Styling :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';

const styles: StyleRulesCallback  = (theme: Theme) => ({
    root: {
      display: 'flex',
      background: "linear-gradient(45deg, #341d40b3 10%, #6e6e96b)"  // #00017fb3
    },
    appBarSpacer:{
      minHeight: 95
    },
    title: {
      textTransform: "uppercase",
      flexGrow: 1,
      color: 'rgb(149, 185, 237)',
    },
    mainHeader: {
      marginTop: 160,
      textAlign: "center",
      color: 'rgb(149, 185, 237)',
    },
    tableContainer: {
      height: 320,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
      background: "#111a58eb" // 343752eb 111a58eb
      // background: 'linear-gradient(45deg,#47499063 10%, #111a58eb)', // #08125feb ; #030831eb
    },
    appTable : {
      marginTop: 50,
      border: '2px solid #282a2f',
      // border: '1px solid #999ca7',
      boxShadow:'2px solid whitesmoke'
    }
});

export default styles;
