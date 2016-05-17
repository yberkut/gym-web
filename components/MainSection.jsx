import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import Footer from './Footer';

import {Table, Column, Cell} from 'fixed-data-table';

import FakeObjectDataListStore from './FakeObjectDataListStore';


const defaultStyle = {
  margin: 20
};

let self;



const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
);

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
    self = this;

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      columnWidths: {
        firstName: 240,
        lastName: 150,
        sentence: 140,
        companyName: 60
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

    const style = {
      width: '100%',
      minHeight: 30,
      margin: 10,
      padding: 10,
      display: 'inline-block'
    };5

    let {dataList, columnWidths} = this.state;

    return (
      <section className="main" style={defaultStyle}>

        <Table
          rowHeight={30}
          headerHeight={50}
          rowsCount={dataList.getSize()}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          width={1000}
          height={500}
          {...this.props}>
          <Column
            columnKey="firstName"
            header={<Cell>First Name</Cell>}
            cell={<TextCell data={dataList} />}
            fixed={true}
            width={columnWidths.firstName}
            isResizable={true}
          />
          <Column
            columnKey="lastName"
            header={<Cell>Last Name (min/max constrained)</Cell>}
            cell={<TextCell data={dataList} />}
            width={columnWidths.lastName}
            isResizable={true}
            minWidth={70}
            maxWidth={170}
          />
          <Column
            columnKey="companyName"
            header={<Cell>Company</Cell>}
            cell={<TextCell data={dataList} />}
            width={columnWidths.companyName}
            isResizable={true}
          />
          <Column
            columnKey="sentence"
            header={<Cell>Sentence</Cell>}
            cell={<TextCell data={dataList} />}
            width={columnWidths.sentence}
            isResizable={true}
          />
        </Table>

      <Paper style={style} zDepth={1}>
        <Footer />
      </Paper>

      </section>
    );
  }
}