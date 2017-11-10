import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Collection.css';




class NotecardList extends Component {
  constructor() {
    super();
    this.state = { title: '', notes: '' }
  }

  componentDidMount() {
    fetch('/api/db/notecards/' + this.props.match.params.collectionId)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        var notecards = json.noteCards;
        var collectionTitle = this.props.match.params.collectionId;
        const noteItems = notecards.map((note) =>
          <tr>
            <td><a href={"/notecard/" + note._id}>{note.text}</a></td>
            <td>{note.translation}</td>
          </tr>
            );
        this.setState({notes: noteItems});  /*this will cause an invoke of the render() function again */
        this.setState({title: collectionTitle});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Collection messageFromServer = {this.state} />
    );
  }
}

class Collection extends Component {

  render() {
    console.log("this will print twice");
    if (this.props.messageFromServer) {
      return (
          <div className="Collection">
          <h1 className="title">{this.props.messageFromServer.title}</h1>
            <table>
            <tr>
              <th>Original Text</th>
              <th>Translation</th>
            </tr>
              {this.props.messageFromServer.notes}
            </table>
            <div className="newNote">
              <a href="/notecard"><p className="button is-small is-info">Create a New Note</p></a>
            </div>
          </div>);
    } else {
      return null;
    }

  }
}

export default NotecardList;
