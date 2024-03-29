import React, { Component } from 'react';

class LoginLogout extends Component {

  constructor(props) {
    super(props);

    this.isAuthenticated = this.props.isAuthenticated.bind(this);
    this.login = this.props.login.bind(this);
    this.logout = this.props.logout.bind(this);
  }

  isLoggedIn() {
    return this.isAuthenticated() && !!this.props.profile;
  }

  render() {
    const userDisplay = this.isLoggedIn()
      ? (
        <div className="navbar-item">
          <a className="myCollect" href="/myCollections">
            My collections
          </a>
          <span>{this.props.profile.name}</span>
        </div>
      ) : null;

    const loginLogoutButton = this.isLoggedIn()
      ? (
        <div>
          <button className="button" onClick={this.logout}>
            Log Out
          </button>
          </div>
      ) : (
        <button className="button" onClick={this.login}>
          Log In
        </button>
      );

    return (
      <div className="navbar-start">
        {userDisplay}
        <div className="navbar-item">
          {loginLogoutButton}
        </div>
      </div>
    )
  }
}

export default LoginLogout;
