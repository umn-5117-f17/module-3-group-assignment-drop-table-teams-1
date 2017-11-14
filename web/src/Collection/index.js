import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Collection.css';
import ModalContainer from '../ModalContainer';
import trash from './rubbish-bin.png';


<<<<<<< HEAD

class NotecardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
=======
class NotecardList extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '',
                   notes: '',
                   modal_notes: []

   }
>>>>>>> origin/fisch885_modal
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
            const noteItems = notecards.map((note) => {
              <tr>
                <td>{note.translation}</td>
                <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} src={trash} alt="delete button"/></a></td>
              </tr>
            });
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
        console.log("note caard check");
        console.log(notecards);

        var collectionTitle = this.props.match.params.collectionId;
        // const noteItems = notecards.map((note) =>
          // <tr>
          //   <td>{note.text}</td>
          //   <td>{note.translation}</td>
          //   <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} src={trash} alt="delete button"/></a></td>
          // </tr>
        // );
        // this.setState({notes: noteItems});  /*this will cause an invoke of the render() function again */
        this.setState({title: collectionTitle});
        this.setState({modal_notes: notecards});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
<<<<<<< Updated upstream
<<<<<<< HEAD
      let note_cards = this.state.modal_notes;
=======
    if(this.props.notes) {
>>>>>>> Stashed changes
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
            {note_cards.map(note =>
            <tbody>

              <td>
                <ModalContainer key={note._id} source_text={note.text} translation={note.translation} imgage={note.picture}/>
              </td>
              <td>
                <span>{note.translation}</span>
                </td>
              </tbody>
              )}
            </tbody>
=======
    console.log("this will print twice");
    if (this.state.title) {
      let note_cards = this.state.modal_notes;
      return (
          <div className="Collection">
          <h1 className="title">{this.state.title}</h1>

            <table>
            <thead>
            <tr>
              <th>Original Text</th>
              <th>Translation</th>
            </tr>
            </thead>
            {note_cards.map(note =>
            <tbody>

              <td>
                <ModalContainer key={note._id} source_text={note.text} translation={note.translation} imgage={note.picture}/>
              </td>
              <td>
                <span>{note.translation}</span>
                </td>
              </tbody>
              )}
>>>>>>> origin/fisch885_modal
            </table>
          </div>);
    } else {
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
            </table>
          </div>);
    }
  }
}

export default NotecardList;
