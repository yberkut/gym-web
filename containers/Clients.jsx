import React, {Component} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import SortTypesFunc from '../components/table/SortTypes';
import SortHeaderCell from '../components/table/SortHeaderCell';

let SortTypes = SortTypesFunc();

import FakeObjectDataListStore from '../helpers/FakeObjectDataListStore';

import ExampleImage from '../helpers/ExampleImage';

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <ExampleImage
    src={data.getObjectAt(rowIndex)[col]}
  />
);

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
      processedDataList: this._dataList,
      colSortDirs: {},
      columnWidths: {
        avartar: 50,
        firstName: 240,
        lastName: 150,
        sentence: 140,
        companyName: 60
      }
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        processedDataList: this._dataList
      });
    }

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      let {firstName} = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      processedDataList: new DataListWrapper(filteredIndexes, this._dataList)
    });
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
      processedDataList: new DataListWrapper(sortIndexes, this._dataList),
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

    let {processedDataList, colSortDirs, columnWidths} = this.state;

    return (
      <div>
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />
        <Table
          rowHeight={30}
          headerHeight={50}
          rowsCount={processedDataList.getSize()}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            cell={<ImageCell data={processedDataList} col="avartar" />}
            fixed={true}
            width={columnWidths.avartar}
          />
          <Column
            columnKey="firstName"
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.firstName}>
              First Name
            </SortHeaderCell>}
            cell={<TextCell data={processedDataList} />}
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
            cell={<TextCell data={processedDataList} />}
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
            cell={<TextCell data={processedDataList} />}
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
            cell={<TextCell data={processedDataList} />}
            width={columnWidths.sentence}
            isResizable={true}
          />
        </Table>
      </div>
    );
  }
}