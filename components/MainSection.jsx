import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Footer from './Footer';

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

    return (
      <section className="main" style={defaultStyle}>

        <Paper style={style} zDepth={1} rounded={false}>
          Some text in main section
        </Paper>

      </section>
    );
  }
}

export default MainSection;
