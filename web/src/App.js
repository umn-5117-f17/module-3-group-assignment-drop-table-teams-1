import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';
import FrontPage from './FrontPage';
import Header from './Header';
import NewNote from './NewNote';
import MyCollections from './MyCollections'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      profile: ''
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
          {withAuth(App)}
          <Route exact path="/" component={props => <FrontPage inputText={this.state.inputText} onUserInput={this.handleUserInput} {... props} {...this.props} />}/>
          <Route exact path="/myCollections" component={props => <MyCollections inputText={this.state.inputText} onUserInput={this.handleUserInput} {... props} {...this.props} />}/>
          <Route exact path="/NewNote" component={props => <NewNote {... props} {...this.props} />}/>
          {/* send in props for router stuff; send in this.props for auth stuff */}
          <Route path="/Collection/:collectionId" component={props => <NewNote {...props} {...this.props}/>}/>
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(App);
