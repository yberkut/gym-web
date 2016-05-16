import React, {Component} from 'react';
import Footer from './Footer';

const defaultStyle = {
  width: 300,
  marginLeft: 20
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

    return (
      <section className="main" style={defaultStyle}>

        {this.renderFooter()}

      </section>
    );
  }
}

export default MainSection;
