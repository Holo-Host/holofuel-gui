import * as React from 'react';
import classnames from 'classnames';
// import * as ReactDOM from 'react-dom';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import OutlinedInput from '@material-ui/core/OutlinedInput';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  txState: string
}

const txStates = [
  {name: 'all'},
  {name: 'requests'},
  {name: 'proposals'},
  {name: 'rejected'}
]

class DropDownInputFilter extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txState: '',
    };
  };

  handleChange = (name: any) => (event: any) => {
    console.log("NAME IN DROPDOWN BTN: ", event.target.value);
    let txState : string = event.target.value;
    this.setState({ txState });
    // this.setState({ [name]: Number(event.target.value) });
  };

  public render() {
    console.log("STATE IN DROPDOWN BTN: ", this.state);
    const { classes } = this.props;
    const gutterBottom : boolean = true;
    const select : boolean = true;

    return (
      <FormControl variant="outlined" className={classes.filterFormControl}>
        <Typography className={classes.filterTextTitle} variant="subheading" gutterBottom={gutterBottom} component="h4" >
          Filter Transactions by Type
        </Typography>
        <TextField
          id="tx-state"
          name="tx-state"
          select={select}
          className={classnames(classes.margin, classes.selectFitlerInput)}
          label="Transaction State"
          aria-label="tx-state"
          value={this.state.txState}
          onChange={this.handleChange("txState")}
          SelectProps={{
              MenuProps: {
                className: classes.selectFitlerInput,
              },
            }}
            margin="normal"
            variant="outlined"
            style={{color: ' #799ab6', borderColor:' #799ab6'}}
         >
            {txStates.map(txType => (
              <MenuItem key={txType.name + [txType]} value={txType.name}>
                {txType.name}
              </MenuItem>
            ))}
         </TextField>
      </FormControl>
  )};
}

export default withStyles(styles)(DropDownInputFilter);
