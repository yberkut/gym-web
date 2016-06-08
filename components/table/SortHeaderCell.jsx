import React, {Component} from 'react';
import {Cell} from 'fixed-data-table';
import SortTypesFunc from './SortTypes';

let SortTypes = SortTypesFunc();

export default class SortHeaderCell extends Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    let {sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          this._reverseSortDirection(this.props.sortDir) :
          SortTypes().DESC
      );
    }
  }

  _reverseSortDirection(sortDir) {
    return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
  }
}

SortHeaderCell.propTypes = {
  onSortChange: React.PropTypes.func,
  columnKey: React.PropTypes.string,
  sortDir: React.PropTypes.string
};