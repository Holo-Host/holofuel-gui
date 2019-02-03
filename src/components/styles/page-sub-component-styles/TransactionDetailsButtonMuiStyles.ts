// MUI Custom Styling :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';

const styles: StyleRulesCallback  = (theme: Theme) => ({
button: {
   margin: theme.spacing.unit,
 },
 input: {
   display: 'none',
 },
});

export default styles;
