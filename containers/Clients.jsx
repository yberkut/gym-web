import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

import FakeObjectDataListStore from '../helpers/FakeObjectDataListStore';

let SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
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
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

export default class Clients extends Component {

  constructor(props, context) {
    super(props, context);

    this._dataList = new FakeObjectDataListStore(1000);

    this._defaultSortIndexes = [];
    let size = this._dataList.getSize();
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        firstName: 240,
        lastName: 150,
        sentence: 140,
        companyName: 60
      }
    };

    this._onSortChange = this._onSortChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  _onSortChange(columnKey, sortDir) {
    let sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      let valueA = this._dataList.getObjectAt(indexA)[columnKey];
      let valueB = this._dataList.getObjectAt(indexB)[columnKey];
      let sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir
      }
    });
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }));
  }

  render() {

    let {sortedDataList, colSortDirs, columnWidths} = this.state;

    return (

        <Table
          rowHeight={30}
          headerHeight={50}
          rowsCount={sortedDataList.getSize()}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="firstName"
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.firstName}>
              First Name
            </SortHeaderCell>}
            cell={<TextCell data={sortedDataList} />}
            fixed={true}
            width={columnWidths.firstName}
            isResizable={true}
          />
          <Column
            columnKey="lastName"
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.lastName}>
              Last Name (min/max constrained)
            </SortHeaderCell>}
            cell={<TextCell data={sortedDataList} />}
            width={columnWidths.lastName}
            isResizable={true}
            minWidth={70}
            maxWidth={170}
          />
          <Column
            columnKey="companyName"
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.companyName}>
              Company
            </SortHeaderCell>}
            cell={<TextCell data={sortedDataList} />}
            width={columnWidths.companyName}
            isResizable={true}
          />
          <Column
            columnKey="sentence"
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.sentence}>
              Sentence
            </SortHeaderCell>}
            cell={<TextCell data={sortedDataList} />}
            width={columnWidths.sentence}
            isResizable={true}
          />
        </Table>
    );
  }
}