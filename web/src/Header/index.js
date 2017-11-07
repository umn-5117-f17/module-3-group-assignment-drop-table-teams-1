import React, { Component } from 'react';

import LoginLogout from './LoginLogout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {active: "navbar-item has-dropdown" }
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({active: (this.state.active.indexOf('is-active') === -1) ? "navbar-item has-dropdown is-active" : "navbar-item has-dropdown"});
  }

  render() {
    return (
      <nav className="navbar is-light" aria-label="dropdown navigation">
        <div className="navbar-start">
          <a className="navbar-item title" href="/">Transmutinator</a>
        </div>
        <div className="navbar-menu">
          <div className={this.state.active}>
            <a className="navbar-link" onClick={this.toggleActive}>
              Menu
            </a>
            <div className="navbar-dropdown">
              <a className="navbar-item">
                New Note
              </a>
              <a className="navbar-item">
                Browse Collections
              </a>
              <a className="navbar-item">
                Bookmarks
              </a>
              <hr className="navbar-divider" />
              <div className="navbar-item">
                <LoginLogout {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

}

export default Header;
