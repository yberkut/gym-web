//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {Table, Column, Cell} from 'fixed-data-table';

import TextCell from '../components/table/TextCell';
import LinkCell from '../components/table/LinkCell';
import ImageCell from '../components/table/ImageCell';
import DateCell from '../components/table/DateCell';
import SortHeaderCell from '../components/table/SortHeaderCell';
import SortTypes from '../components/table/SortTypes';

import FakeObjectDataListStore from '../helpers/FakeObjectDataListStore';
import DataListWrapper from '../helpers/DataListWrapper';

export default class Clients extends Component {

  constructor(props) {
    super(props);

    this._dataList = new FakeObjectDataListStore(2000);

    this._defaultSortIndexes = [];
    let size = this._dataList.getSize();
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      dataList: this._dataList,
      columnWidths: {
        firstName: 240,
        lastName: 150,
        city: 140,
        email: 260
      },
      colSortDirs: {}
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }));
  }

  _onFilterChange(e) {

    if (!e.target.value) {
      this.setState({
        dataList: this._dataList
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
      dataList: new DataListWrapper(filteredIndexes, this._dataList)
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
      dataList: new DataListWrapper(sortIndexes, this._dataList),
      colSortDirs: {
        [columnKey]: sortDir
      }
    });
  }

  render() {

    const {dataList, columnWidths, colSortDirs} = this.state;

    const inputStyle = {
      padding: '10px 8px',
      margin: '10px 0'
    };

    return (
      <div>
        <input style={inputStyle}
          onChange={this._onFilterChange}
          placeholder="Filter by First Name"
        />
        <br />

        <Table
          rowsCount={dataList.getSize()}
          rowHeight={50}
          headerHeight={50}
          width={1000}
          height={500}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          {...this.props}>
          <Column
            columnKey="avatar"
            cell={<ImageCell data={dataList}/>}
            fixed={true}
            width={50}
          />
          <Column
            columnKey="firstName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.firstName}>
                First Name
              </SortHeaderCell>
            }
            cell={<LinkCell data={dataList}/>}
            fixed={true}
            width={columnWidths.firstName}
            isResizable={true}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name</Cell>}
            cell={<TextCell data={dataList}/>}
            fixed={true}
            width={columnWidths.lastName}
            isResizable={true}
            minWidth={70}
            maxWidth={170}
          />
          <Column
            columnKey="city"
            header={<Cell>City</Cell>}
            cell={<TextCell data={dataList}/>}
            width={columnWidths.city}
            isResizable={true}
          />
          <Column
            columnKey="street"
            header={<Cell>Street</Cell>}
            cell={<TextCell data={dataList}/>}
            width={200}
          />
          <Column
            columnKey="zipCode"
            header={<Cell>Zip Code</Cell>}
            cell={<TextCell data={dataList}/>}
            width={200}
          />
          <Column
            columnKey="email"
            header={<Cell>Email</Cell>}
            cell={<LinkCell data={dataList}/>}
            width={columnWidths.email}
            isResizable={true}
          />
          <Column
            columnKey="date"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.date}>
                DOB
              </SortHeaderCell>
            }
            cell={<DateCell data={dataList}/>}
            width={200}
          />
        </Table>
      </div>
    );
  }

}