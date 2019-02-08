import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// local imports
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any,
}

let id = 0; // to allow for assining a uuid for the map key...
function createData(originDate: string, completionDate: string, counterparty:any, adjustment:any, notes:any) {
    id += 1;
    return { id, originDate, completionDate, counterparty, adjustment, notes };
}

// const CURRENT_ROW_DATA => REPLACE with the avail ROW data/info from within the Row SubComponent;
const currentRow = createData("origin_date", "completion_date", "counterparty", "adjustment", "notes");

function SimpleTable(props: any) {
  const { classes } = props;
  return (
    <Paper className={classes.muiSimpleTableRoot}>
      <Table className={classes.muiSimpleTable}>
        <TableHead>
          <TableRow>
            <TableCell>Origin Date</TableCell>
            <TableCell align="right">Completed Date</TableCell>
            <TableCell align="right">Counterparty</TableCell>
            <TableCell align="right">Balance Adjustment</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow key={currentRow.id}>
            <TableCell component="th" scope="currentRow">{currentRow.originDate}</TableCell>
            <TableCell align="right">{currentRow.completionDate}</TableCell>
            <TableCell align="right">{currentRow.counterparty}</TableCell>
            <TableCell align="right">{currentRow.adjustment}</TableCell>
            <TableCell align="right">{currentRow.notes}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
