import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Collection.css';
import trash from './rubbish-bin.png';



class NotecardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    //call server side to add collection to database
    const target = event.target;
    const noteId = target.id;

    console.log("in delete, Id is " + noteId);

    fetch('/api/db/deleteNote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: noteId,
        })
      }).then(
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
                <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} src={trash} alt="delete button"/></a></td>
              </tr>
                );
            this.setState({notes: noteItems});  /*this will cause an invoke of the render() function again */
            this.setState({title: collectionTitle});
          })
          .catch(function (error) {
            console.log(error);
          })
      );
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
            <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} src={trash} alt="delete button"/></a></td>
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
          <div className="Collection">
            <h1 className="title">{this.state.title}</h1>
            <table>
              <thead>
                <tr>
                  <th>Original Text</th>
                  <th>Translation</th>
                  <th>Image</th>
                </tr>
              </thead>
            <tbody>
            {Object.keys(this.props.notes).map((key) => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{this.props.notes[key][1]}</td>
                        <td><img src={this.props.notes[key][0]} alt="" height="200"/></td>
                      </tr>
            )})}
            </tbody>
            </table>
          </div>);
    // } else {
      // return null;
    // }

  }
}

export default NotecardList;
