import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

class HelloWorld extends Component {

  render() {
    return <div>
      <h1>Hello, World!</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/todos">TODOS</Link></li>
        <li><Link to="/hello">Hello</Link></li>
      </ul>
    </div>
  }
}

export default HelloWorld;
