import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import { withAuth } from './Auth';
import ApiDemoPage from './ApiDemoPage';
// eslint-disable-next-line
import FrontPage from './FrontPage';
import Header from './Header';
import ProfilePage from './ProfilePage';
<<<<<<< HEAD
=======

>>>>>>> origin/fisch885_modal
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


  //withAuth(App)

  render() {

    // this.props has a bunch of stuff in it related to auth0 (from `withAuth` below)
     console.log('props', this.props);

    return (

      <div className="App">
        <Header {...this.props} />
        <section className="section">

          <div className="content">
<<<<<<< HEAD
            {withAuth(App)}
            <Route exact path="/" component={props => <NewNote inputText={this.state.inputText} onUserInput={this.handleUserInput} {... props} {...this.props} />}/>
            {/*<Route exact path="/" component={props => <FrontPage inputText={this.state.inputText} onUserInput={this.handleUserInput} {... props} {...this.props} />}/>*/}
            <Route exact path="/NewNote" component={props => <NewNote {... props} {...this.props} />}/>
            {/* send in props for router stuff; send in this.props for auth stuff */}
            <Route path="/api-demo" render={props => <ApiDemoPage {...props} {...this.props} />} />
            <Route path="/profile" render={props => <ProfilePage {...props} {...this.props} />} />
=======
          {withAuth(App)}

          <Route exact path="/" component={props => <FrontPage inputText={this.state.inputText} onUserInput={this.handleUserInput} {... props} {...this.props} />}/>
          <Route exact path="/NewNote" component={props => <NewNote {... props} {...this.props} />}/>
          {/* send in props for router stuff; send in this.props for auth stuff */}
          <Route path="/api-demo" render={props => <ApiDemoPage {...props} {...this.props} />} />
          <Route path="/profile" render={props => <ProfilePage {...props} {...this.props} />} />

>>>>>>> origin/fisch885_modal
            <Route path="/Collection/:collectionId" component={Collection}/>
          </div>
        </section>
      </div>
    );
  }
}

export default withAuth(App);
