//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {Table, Column, Cell} from 'fixed-data-table';

import TextCell from '../components/table/TextCell';
import LinkCell from '../components/table/LinkCell';
import ImageCell from '../components/table/ImageCell';
import DateCell from '../components/table/DateCell';

import FakeObjectDataListStore from '../helpers/FakeObjectDataListStore';

export default class Clients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnWidths: {
        firstName: 240,
        lastName: 150,
        city: 140,
        email: 260
      }
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
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

    const {dataList, columnWidths} = this.state;

    return (
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
          cell={<ImageCell data={dataList} />}
          fixed={true}
          width={50}
        />
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList} />}
          fixed={true}
          width={columnWidths.firstName}
          isResizable={true}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
          fixed={true}
          width={columnWidths.lastName}
          isResizable={true}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          columnKey="city"
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.city}
          isResizable={true}
        />
        <Column
          columnKey="firstName"
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} col="street" />}
          width={200}
        />
        <Column
          columnKey="zipCode"
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} />}
          width={200}
        />
        <Column
          columnKey="email"
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} />}
          width={columnWidths.email}
          isResizable={true}
        />
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} />}
          width={200}
        />
      </Table>
    );
  }

}