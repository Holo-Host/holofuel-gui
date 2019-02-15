import * as React from 'react';
// import { Subtract } from 'utility-types';
// local imports :
// import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  onPaginatedSearch: () => void,
  isLoading: boolean,
  list: any
}
// export type Props = OwnProps & StateProps & DispatchProps;
// export interface State {};

const withInfiniteScroll= <OwnProps extends object>(Component: React.ComponentType<OwnProps>) => {
  class WithInfiniteScrollList extends React.Component < OwnProps> {
    constructor(props: OwnProps) {
      super(props);
    }
    componentDidMount(){
      (window as any).addEventListener('scroll', this.onScroll, false);
    }

    componentDidUnmount() {
      (window as any).addEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (( window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
        && this.props.list.length && !this.props.isLoading) {
          this.props.onPaginatedSearch();
        }
    }

    public render() {
      return(
        <Component {...this.props}/>
    }
  }
};

export default withInfiniteScroll;
