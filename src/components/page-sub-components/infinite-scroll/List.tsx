import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import InfinteScrollList from ''
// import styles from '../../styles/page-styles/DefaultPageMuiStyles'

const styles : StyleRulesCallback  = (theme: Theme) => ({
  root: {
    color: '#222',
    background: '#f4f4f4',
    font: '400 14px CoreSans, Arial,sans-serif',
  },
  page: {
    margin: 20;
  },
  interactions: {
    textAlign: 'center',
  },
  list: {
    margin:' 20px 0px',
  },
  listRow: {
    display:'flex',
    lineHeight: 24,
    whiteSpace: 'nowrap',
    margin: '10px 0px',
    padding: 10,
    background: '#ffffff',
    border: '1px solid #e3e3e3',
  },
  a: {
    color: '#222',
    "&:hover": {
      textDecoration: 'underline',
    }
  },
  input: {
    padding: 10,
    borderRadius: 5,
    outline: 'none',
    margin-right: 10,
    border: '1px solid #dddddd',
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    border:' 1px solid #dddddd',
    background: 'transparent',
    color: '#808080',
    cursor: 'pointer',
    "&:hover": {
      color: '#222',
    }
  },
  focus: {
    outline: 'none',
  }
});

export interface OwnProps {
  classes: any,
  onPaginatedSearch: () => void,
  isLoading: boolean,
  list: any
}

export const withLoading = (Component: React.ComponentType<any>) => (props:OwnProps) =>
<div>
  <Component {...props} />

  <div className="interactions">
    {props.isLoading && <span>Loading...</span>}
  </div>
</div>
//////////////////////////////////////////////////////////////////////

const List = (props: OwnProps) => {
  <div>
    <div className={classes.list}>
      {props.list.map((item: any) => console.log("!_!_!_!_! item inside scroll list !_!_!_!_!_!", item))}
    </div>
    </div>
  </div>
}
export default List;
//////////////////////////////////////////////////////////////////////
