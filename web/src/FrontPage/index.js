import React, { Component } from 'react';

// eslint-disable-next-line
import frustratedMonkey from './frustrated-monkey.gif';
import './frontpage.css';

// eslint-disable-next-line
const countStyle = {
  color: 'brown',
};

class Frontpage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
      text: ""
    };
    this.foo = this.foo.bind(this);
    this.dbpedia = this.dbpedia.bind(this);
  }

  foo() {
    this.setState(prevState => {
      return {clickCount: prevState.clickCount + 1}
    })
  }
  dbpedia(event) {
    event.preventDefault();
    // console.log(this.refs.TextInput.value);
    // console.log("http://model.dbpedia-spotlight.org/en/annotate?text=" + encodeURI(this.refs.TextInput.value));
    fetch(
      "http://model.dbpedia-spotlight.org/en/annotate?text=" + encodeURI(this.refs.TextInput.value), {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      },
    })
    .then((response) => response.json())
   .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
    // this.props.onUserInput(
    //   this.refs.TextInput.value
    // );
  }

  render() {
    return (
      <div className="FrontPage">
        {/*<h1>
          <span className="icon"><i className="fa fa-home"></i></span>
          &nbsp;
          the front page!
        </h1>

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <button className="button" onClick={this.foo}>example button</button>
            </div>
            <div className="level-item" style={countStyle}>
              click count: {this.state.clickCount}
            </div>
          </div>
        </div> */}
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.inputText}
            ref="TextInput"
          />
          <button onClick={this.dbpedia}>DBPEDIA</button>
        </form>
        {/*<div className="columns is-multiline is-centered">
          <div className="column is-one-quarter">
            <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
          </div>
          <div className="column is-one-quarter">
            <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
          </div>
          <div className="column is-one-quarter">
            <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
          </div>
          <div className="column is-one-quarter">
            <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
          </div>
        </div>*/}
      </div>
    );
  }
}

export default Frontpage;
