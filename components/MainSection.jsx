import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import ReactDataGrid from 'react-data-grid';

import Footer from './Footer';


/* ------- React Data Grid -------------------------- */

//helper to generate a random date
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
};

let _rows = [];
for (let i = 1; i < 1000; i++) {
  _rows.push({
    id: i,
    task: 'Task ' + i,
    complete: Math.min(100, Math.round(Math.random() * 110)),
    priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
    issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
    startDate: randomDate(new Date(2015, 3, 1), new Date()),
    completeDate: randomDate(new Date(), new Date(2016, 0, 1))
  });
}
;

//function to retrieve a row for a given index
let rowGetter = function (i) {
  return _rows[i];
};


//Columns definition
let columns = [
  {
    key: 'id',
    name: 'ID',
    locked: true
  },
  {
    key: 'task',
    name: 'Title',
    width: 200
  },
  {
    key: 'priority',
    name: 'Priority',
    width: 200
  },
  {
    key: 'issueType',
    name: 'Issue Type',
    width: 200
  },
  {
    key: 'complete',
    name: '% Complete',
    width: 200
  },
  {
    key: 'startDate',
    name: 'Start Date',
    width: 200
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    width: 200
  },
  {
    key: 'completeDate',
    name: 'Expected Complete',
    width: 200
  }
];

/* -------------------------------------------------- */


const defaultStyle = {
  margin: 20
};


class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
  }

  renderFooter() {

    return (
      <Footer />
    );
  }

  render() {

    const style = {
      width: '100%',
      minHeight: 300,
      margin: '10 auto',
      padding: 10,
      display: 'inline-block'
    };

    const gridStyle = {
      width: '90%'
    };

    return (
      <section className="main" style={defaultStyle}>

        <ReactDataGrid
          style={gridStyle}
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={_rows.length}
          width={600}
          minHeight={500}/>

      </section>
    );
  }
}

export default MainSection;
