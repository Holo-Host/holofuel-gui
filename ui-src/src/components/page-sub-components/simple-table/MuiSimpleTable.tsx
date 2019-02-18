import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import MessageIcon from '@material-ui/icons/Message';
// local imports
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any,
}

let id = 0; // to allow for assining a uuid for the map key...
function createData(dueDate: string, notes:any) {
    id += 1;
    return { id, dueDate, notes };
}

// const CURRENT_ROW_DATA => REPLACE with the avail ROW data/info from within the Row SubComponent;
const currentRow = createData("due_date", "notes");
// const rowData = this.props.currentRowData.forEach(x => {return x});
// const currentRow = createData(rowData);

function SimpleTable(props: any) {
  const { classes } = props;
  return (
    <Paper className={classes.muiSimpleTableRoot}>
      {/* <Typography className={classes.subtableHeader} variant="display1" component="h4" >
        Transaction Details
      </Typography> */}
      <Table className={classes.muiSimpleTable}>
        <TableBody>
          <TableRow key={currentRow.id}>
            <TableCell align="center" scope="currentRow">
            <HourGlassIcon/> {currentRow.dueDate}
            </TableCell>
            <TableCell align="center">
              <MessageIcon/> {currentRow.notes}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
// {/* <TableCell align="center" */}
  // {/* component="th"  */}
  // scope="currentRow"
