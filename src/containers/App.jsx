import React, {Component, PropTypes} from "react";
import Header from "../components/Header";

export default class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
        <Header/>
        <div>{children}</div>
      </div>
    );
  }
}
