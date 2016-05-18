import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import Footer from './Footer';
import Clients from './Clients';

export default class MainSection extends Component {

  render() {

    const style = {
      width: '100%',
      minHeight: 30,
      margin: '10px 0',
      padding: 10,
      display: 'inline-block'
    };

    return (
      <section className="main">

        <Clients />

        <Paper style={style} zDepth={1}>
          <Footer />
        </Paper>

      </section>
    );
  }
}