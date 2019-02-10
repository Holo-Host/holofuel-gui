import * as React from 'react';
import classnames from 'classnames';
// react-day-picker imports :
import * as moment from 'moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// local imports
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
import DropDownInputFilter from '../input-fields/DropDownInputFilter';
// import DialogFilterInput from '../input-fields/DialogFilterInput';
// import { get_current_datetime } from '../../utils/global-helper-functions';

// const CURRENT_DATE = get_current_datetime().toString();
// const today = new Date();
// const yesterday = today.getDate() - 1;
// const lastRecord= new Date(today.getFullYear() - 7, today.getMonth(), today.getDate());

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  setDateFilter: (startDate: string, endDate:string) => void,
  setTxTypeFilter: (txBatchType: string) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  startDate: string | undefined,
  endDate: string | undefined,
  txState: string | undefined,
}

class DayTimePicker extends React.Component {
  constructor(props:Props){
    super(props);
    this.state = {
      startDate: undefined,
      endDate: undefined,
      txState: undefined
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  };

  showStartingMonth() {
    const { startDate, endDate } = this.state;
    if (!startDate) {
      return;
    }
    if (moment(endDate).diff(moment(startDate), 'months') < 2) {
      this.endDate.getDayPicker().showMonth(startDate);
    }
   }
   handleStartDateChange(startDate) {
      // Change the startDate date and focus the "endDate" input field
      this.setState({ startDate });
   }
   handleEndDateChange(endDate) {
      this.setState({ endDate }, this.showStartingMonth);
    }

    handleNewType = () => {
      console.log("Day Time Picker STATE: ", this.state);
      this.props.setTxTypeFilter(this.state.txState);
    };

    handleNewDuration = () => {
      console.log("Day Time Picker STATE: ", this.state);
      this.props.setDateFilter(this.state.endDate, this.state.startDate);
    };

    render () {
     const { classes } = this.props;
     const { startDate, endDate } = this.state;
     const modifiers = { start: startDate, end: endDate };
     const gutterBottom : boolean = true;

     const txStatesdropDownHeader : string = "Transactions by Type";
     const txStatesDropDownList : Array<any> = [
       {name: 'all'},
       {name: 'requests'},
       {name: 'proposals'},
       {name: 'rejected'}
     ];

     return (
      <div className={classnames(classes.datetimeinputdiv,"InputFromTo")}>
        <div className={classnames(classes.flexContainer, classes.flexItem)}>
          <DropDownInputFilter dropdownListData={txStatesDropDownList} dropDownHeader={txStatesdropDownHeader} />
          <Button variant="outlined" color="primary"
          className={classnames(classes.button, classes.overlayTop, classes.smallButton)}
          onClick={this.handleNewType}>
            Apply Type
          </Button>

          <div className={classes.flexItem}>
            <Typography className={classes.filterTextTitle} variant="subheading" gutterBottom={gutterBottom} component="h4" >
              Filter Transactions by Day
            </Typography>
            <DayPickerInput
             onDayChange={this.handleStartDateChange}
             className={classnames(classes.settingsInput, classes.dateInput)}
             value={startDate}
             placeholder="From"
             format="LL"
             formatDate={formatDate}
             parseDate={parseDate}
             dayPickerProps={{
               selectedDays: [startDate, { startDate, endDate }],
               disabledDays: { after: endDate },
               toMonth: endDate,
               modifiers,
               numberOfMonths: 2,
               onDayClick: () => this.endDate.getInput().focus(),
             }}
            />
            {' '}  {' '}
            <span className="InputFromTo-to">
             <DayPickerInput
               onDayChange={this.handleEndDateChange}
               className={classnames(classes.settingsInput, classes.dateInput)}
               ref={el => (this.endDate = el)}
               value={endDate}
               placeholder="Until"
               format="LL"
               formatDate={formatDate}
               parseDate={parseDate}
               dayPickerProps={{
                 selectedDays: [startDate, { startDate, endDate }],
                 disabledDays: { before: startDate },
                 modifiers,
                 month: startDate,
                 fromMonth: startDate,
                 numberOfMonths: 2,
               }}
              />
            </span>
            <Button variant="outlined" color="primary"
            className={classnames(classes.button, classes.overlayTop, classes.smallButton)}
            onClick={this.handleNewDuration}>
              Apply Dates
            </Button>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DayTimePicker);
