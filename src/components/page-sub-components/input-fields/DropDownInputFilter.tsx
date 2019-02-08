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

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  dropDownHeader: string,
  dropdownListData: Array<any>,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  dataItem: string
}

class DropDownInputFilter extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      dataItem: '',
    };
  };

  handleChange = (name: any) => (event: any) => {
    console.log("NAME IN DROPDOWN BTN: ", event.target.value);
    let dataItem : string = event.target.value;
    this.setState({ dataItem });
    // this.setState({ [name]: Number(event.target.value) });
  };

  public render() {
    console.log("STATE IN DROPDOWN BTN: ", this.state);
    const { classes, dropdownListData, dropDownHeader } = this.props;
    const gutterBottom : boolean = true;
    const select : boolean = true;

    return (
      <FormControl variant="outlined" className={classes.filterFormControl}>
        <Typography className={classes.filterTextTitle} variant="subheading" gutterBottom={gutterBottom} component="h4" >
          Filter { dropDownHeader }
        </Typography>
        <TextField
          id="tx-state"
          name="tx-state"
          select={select}
          className={classnames(classes.margin, classes.selectFitlerInput)}
          label="Transaction State"
          aria-label="tx-state"
          value={this.state.dataItem}
          onChange={this.handleChange("dataItem")}
          SelectProps={{
              MenuProps: {
                className: classes.selectFitlerInput,
              },
            }}
            margin="normal"
            variant="outlined"
            style={{color: ' #799ab6', borderColor:' #799ab6'}}
         >
            {dropdownListData.map(dataItem => (
              <MenuItem key={dataItem.name + [dataItem]} value={dataItem.name}>
                {dataItem.name}
              </MenuItem>
            ))}
         </TextField>
      </FormControl>
  )};
}

export default withStyles(styles)(DropDownInputFilter);
