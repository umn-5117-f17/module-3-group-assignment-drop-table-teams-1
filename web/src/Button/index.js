import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: null
    }

    // this.saveNote = this.saveNote.bind(this);
  }
  // saveNote() {
  //   fetch('/api/save');
  // }

  render() {
    return (
      <div className="ButtonContainer">
        <div className="columns">
          <div className="column is-one-third has-text-centered">
            <form onSubmit={this.saveNote}>
              <input type="submit" value="Save"/>
            </form>
          </div>
          <div className="column is-one-third has-text-centered">
            <form onSubmit={this.Transmutinate}>
              <input type="submit" value="Transmutinate"/>
            </form>
          </div>
          <div className="column is-one-third has-text-centered">
            <form onSubmit={this.editNote}>
              <input type="submit" value="Edit"/>
            </form>
          </div>
        </div>
        <div className="columns">
            <div className="column"></div>
            <div className="column is-one-third has-text-centered">
              <form onSubmit={this.deleteNote}>
                <input type="submit" value="Delete"/>
              </form>
            </div>
            <div className="column is-one-third has-text-centered">
              <form onSubmit={this.anotherOne}>
                <input type="submit" value="Anotha One"/>
              </form>
            </div>
            <div className="column"></div>
          </div>
        </div>
    );
  }

}

export default Buttons;
