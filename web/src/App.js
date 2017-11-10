import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';
// eslint-disable-next-line
import ApiDemoPage from './ApiDemoPage';
// eslint-disable-next-line
import Footer from './Footer';
import FrontPage from './FrontPage';
import Header from './Header';
// eslint-disable-next-line
import ProfilePage from './ProfilePage';
import Dbpedia from './Dbpedia';
import NewNote from './NewNote';
import Collection from './Collection';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(inputText) {
    this.setState({
      inputText: inputText
    });
  };

  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
    // console.log('props', this.props);

    return (
      <div className="App">
        <Header {...this.props} />
        <section className="section">
          <div className="content">
            <Route exact path="/" component={props => <NewNote {... props} {...this.props} />}/>
            {/* send in props for router stuff; send in this.props for auth stuff */}
            <Route path="/api-demo" render={props => <ApiDemoPage {...props} {...this.props} />} />
            <Route path="/profile" render={props => <ProfilePage {...props} {...this.props} />} />

            <Route path="/Collection/:collectionId" component={Collection}/>
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(App);
