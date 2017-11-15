import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './Collection.css';
import ModalContainer from '../ModalContainer';

class NotecardList extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '',
                   notes: '',
                   modal_notes: []

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
            // const noteItems = notecards.map((note) => {
            //   <tr>
            //     <td>{note.translation}</td>
            //     <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} src={trash} alt="delete button"/></a></td>
            //   </tr>
            // });
            // this.setState({notes: noteItems});  /*this will cause an invoke of the render() function again */
            this.setState({title: collectionTitle});
            this.setState({modal_notes: notecards});
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
        // console.log(json);
        var notecards = json.noteCards;
        // console.log("note caard check");
        // console.log(notecards);

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
      let note_cards = this.state.modal_notes;
      <h1>{this.props.notes}</h1>
      return (
        <div className="Collection">
          <h1 className="title">{this.state.title}</h1>
          <table className="table is-bordered is-striped is-fullwidth">
            <thead>
              <tr>
                <th className="has-text-centered">Original Text</th>
                <th className="has-text-centered">Translation</th>
              </tr>
            </thead>
            <tbody>
            {note_cards.map(note =>
              <tr>
                <td class = "has-text-centered subtitle is-5">
                  <ModalContainer key={note._id} source_text={note.text} translation={note.translation} imgage={note.picture}/>
                </td>
                <td class = "has-text-centered subtitle is-5">{note.translation}</td>
                <td id={note._id}><a id={note._id} onClick={this.handleDelete}><img id={note._id} alt="delete button"/></a></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      );
  }
}

export default NotecardList;
