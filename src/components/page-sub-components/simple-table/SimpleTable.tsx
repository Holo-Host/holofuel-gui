import * as React from 'react';
// custom stylesheet :
import '../../styles/page-sub-component-styles/scaffold-styles.css';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  data: any
}
export interface StateProps {
// Props that are set by mapStateToProps
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
}
export type Props = OwnProps & StateProps;

export interface State {
// The components optional internal state
  header: Array<any>
}

export type Column = {
  columnQuantity: number
};

class SimpleTable extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      header: []
    };
  }

  componentWillMount () {
    this.setState({
      header: Object.getOwnPropertyNames(this.props.data[0])
    });
  }

  renderHeader (columns: any) {
    return(
      <thead>
        <tr>
          {columns.map((columnHeader: any, index: number) => {
            return(
              <td key={index}>
                {columnHeader}
              </td>
            );
          })}
        </tr>
      </thead>
    );
  }

  renderBody (rows: any, columns: any) {
    return(
      <tbody>
        {rows.map((row: any, index: number) => {
          return(
            <tr key={index}>
              {columns.map((columnData: any, innerIndex: number) => {
                return (
                  <td key={innerIndex}>
                    {row[columnData]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  render () {
    if (this.state.header.length === 0) return false;
    return(
      <div className='transfer-activity-table'>
        <table className=''>
          {this.renderHeader(this.state.header)}
          {this.renderBody(this.props.data,this.state.header)}
        </table>
      </div>
    );
  }
}

export default SimpleTable;
