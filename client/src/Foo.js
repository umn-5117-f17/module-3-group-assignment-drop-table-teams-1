import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

class Foo extends Component {

  componentDidMount() {
    console.log('FOO')
  }

  render() {
    return (
      <div className="Foo">
        <p>
          You are now on FOO! <Link to={`/`}>back to home</Link>
        </p>
        <div className="Foo-header">
          <img src={logo} className="Foo-logo" alt="logo" />
          <h2>Welcome to React FOO</h2>
        </div>
      </div>
    );
  }
}

export default Foo;
