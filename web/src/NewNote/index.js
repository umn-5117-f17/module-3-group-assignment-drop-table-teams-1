import React, { Component } from 'react';
import Dbpedia from '../Dbpedia';
import Buttons from '../Button';

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: "",
      imgURL: "" };
  }

  render() {
    return (
      <div>
        <Dbpedia />
        <Buttons />
      </div>
    );
  }
}

export default NewNote;
