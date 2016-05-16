import React, {PropTypes, Component} from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const defaultStyle = {
  marginLeft: 20
};

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    const menuTitle = 'Menu';

    return (
      <header className="header">
        <AppBar onLeftIconButtonTouchTap={this.handleToggle}/>
        <Drawer
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar title={menuTitle} onLeftIconButtonTouchTap={this.handleClose} />
          <MenuItem onTouchTap={this.handleClose}>Menu Item 1</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 3</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 4</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 5</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 6</MenuItem>
        </Drawer>
      </header>
    );
  }
}