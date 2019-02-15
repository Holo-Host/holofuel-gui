import * as React from 'react';
import classnames from 'classnames';
import { compose } from 'recompose';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import withInfiniteScroll from './HocWithInfiniteScroll';
import List, { withLoading } from './List';
// import styles from '../../styles/page-styles/DefaultPageMuiStyles'

const InfiniteScrollList = compose(
  withInfiniteScroll,
  withLoading,
)(List);

export interface OwnProps {
classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  tx: any,
  page: number | null,
  isLoading: boolean
}

class InfiniteScrollPageParsing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tx: [],
      page: null,
      isLoading:false,
    };
  }

  applySetResult = (txResult: any) => (prevState: any) => ({
    tx: [...prevState.tx, txResult.tx],
    page: txResult.page,
    isLoading: false
  });

  applyUpdateResult = (txResult: any) => (prevState: any) => ({
    tx: [...prevState.tx, ...txResult.tx],
    page: txResult.page,
    isLoading: false
  });

  fetchNewBatch = async (tx: any, page: any) => {
    this.setState({ isLoading: true })
    const txResults = await this.props.list_transactions({});
    this.onSetResult(txResults, page);
  }

  onPaginatedSearch = () => {
    this.fetchNewBatch({}, this.state.page! + 1)
  }

  onSetResult = (txResult: any, page: any) =>
    page === 0
      ? this.setState(this.applySetResult(txResult))
      : this.setState(this.applyUpdateResult(txResult));

  public render() {
    const { classes } = this.props;

    return (
      <div className={classnames(classes.root, classes.page)}>
        <InfiniteScrollList
          list={this.state.tx}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScrollPageParsing);

const styles : StyleRulesCallback  = (theme: Theme) => ({
  root: {
    color: '#222',
    background: '#f4f4f4',
    font: '400 14px CoreSans, Arial,sans-serif',
  },
  page: {
    margin: 20;
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
  focus: {
    outline: 'none',
  }
});
