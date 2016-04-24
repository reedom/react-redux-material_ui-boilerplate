import React, {PropTypes, Component} from "react";
import {AppBar, Styles} from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as MyRawTheme from "../material_ui_raw_theme_file";

class Header extends Component {
  static get childContextTypes() {
    return {muiTheme: React.PropTypes.object};
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(MyRawTheme)};
  }

  render() {
    return (
      <header className="header">
        <AppBar title="React + Redux + Material UI Boilerplate"/>
      </header>
    );
  }
}


export default Header;
