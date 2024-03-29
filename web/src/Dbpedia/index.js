import React, { Component } from 'react';
import NoteCardList from '../Collection';
import ModalContainer from '../ModalContainer';
import './dbpedia.css';

class Dbpedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target_lang: "fr",
      source_lang: "en",
      annotations: "",
      translated_words:[],
      title: '',
      notes: '',
      modal_notes: []
    };

    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
    this.doSetNotes = this.doSetNotes.bind(this);
    this.handlePopulate = this.handlePopulate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchNew = this.fetchNew.bind(this);
    this.isAuthenticated = this.props.isAuthenticated.bind(this);
  }

  // componentDidMount() {
  //   let t_lang = this.props.target_lang;
  //   this.setState({target_lang: t_lang});
  // }

  handleDelete(event) {
    //call server side to add collection to database
    const target = event.target;
    const noteId = target.id;

    if(!this.isLoggedIn()) {
      return;
    }

    console.log("in delete, Id is " + noteId);

    fetch('/api/db/deleteNote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Id: noteId,
          user: this.props.profile.nickname
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
    let t_lang = this.props.target_lang;
    this.setState({target_lang: t_lang});
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

  doSetNotes(notes){
    this.props.setNotes(notes);
  }


  translate() {
    let t_lang = this.props.target_lang;
    this.setState({target_lang: t_lang});
    const base_url = 'https://translation.googleapis.com/language/translate/v2';
    Object.keys(this.state.annotations).map((word) => {
      const google_url = base_url +"?q="+encodeURI(word)+
                         "&target="+this.state.target_lang+"&source="
                         +this.state.source_lang+"&key=AIzaSyAllxK-KhFvNMtTqkA59tfUkQCGAYNHi5I";
      fetch(google_url, {
            method:"POST"})
            .then(res => res.json())
            .then(json => {
              if(this.state.annotations[word].length !== 2){
                let newAnnotations = {};
                Object.assign(newAnnotations, this.state.annotations);
                newAnnotations[word].push(json.data.translations[0].translatedText);
                this.setState({test: newAnnotations});
              }
            })
            .catch(function (error) {
              console.error(error);
            });
      return null;
    });
  }

  handlePopulate() {
    fetch('/api/db/newNote', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: this.props.profile.nickname,
                Id: this.props.match.params.collectionId,
                notes: this.state.annotations
              })
            }).then(
              this.fetchNew()
            )
  }

  fetchNew() {
    fetch('/api/db/notecards/' + this.props.match.params.collectionId)
      .then(res => res.json())
      .then(json => {
        var notecards = json.noteCards;
        var collectionTitle = this.props.match.params.collectionId;

        this.setState({title: collectionTitle});
        this.setState({modal_notes: notecards});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  dbpedia(event) {
    event.preventDefault();
    fetch(
      "http://model.dbpedia-spotlight.org/en/annotate?text=" + encodeURI(event.target.textInput.value), {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let annotations = {};
      responseJson.Resources.forEach((resource) => {
        if (Object.keys(annotations).indexOf(resource["@surfaceForm"]) === -1){
          annotations[resource["@surfaceForm"]] = [resource["@URI"]];
        }
      });
      this.setState({annotations: annotations});
      // console.log("annotations is " + JSON.stringify(this.state.annotations));
      Object.keys(annotations).map((key) => {
        fetch(annotations[key],{
          method: "GET",
        })
        .then((response) => response.text())
        .then((text) => {
          // eslint-disable-next-line
          let re = new RegExp('(dbo:wikiPageID.+<\/span><small>)', 'i');
          let wikiPageIdString = text.match(re)[0];
          wikiPageIdString = wikiPageIdString.slice(0,-14);
          let wikiPageId = wikiPageIdString.slice(wikiPageIdString.lastIndexOf('>')+1);
          let proxyurl = "https://cors-anywhere.herokuapp.com/";
          fetch(proxyurl + "http://en.wikipedia.org/?curid=" + wikiPageId, {
            method: "GET",
          })
          .then((response) => response.text())
          .then((text) => {
            // eslint-disable-next-line
            let re = new RegExp('(<meta property="og:image".+)', 'i');
            let metaImg = text.match(re)[0];
            let contentRe = new RegExp('(content=".+")', 'i');
            let content = metaImg.match(contentRe)[0].slice(9,-1);
            annotations[key] = [content];
            this.setState({annotations: annotations});
            this.translate();
            // this.handlePopulate();
          })
          .catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.error(error);
        });
        return null;
      });

    })
    .catch((error) => {
      console.error(error);
    });

  }

  isLoggedIn() {
    return this.isAuthenticated() && !!this.props.profile;
  }



  render() {
    let note_cards = this.state.modal_notes;
    const userDisplay = this.isLoggedIn()
      ? (
        <div>
        <div className="field">
          <label className="label">Enter Text</label>
        </div>
        <div className="field">
          <form onSubmit={this.dbpedia}>
            <div className="field">
              <textarea className="textarea" value={this.state.text} name="textInput"></textarea>
            </div>
            <div className="field">
              <input className="button is-but" type="submit" value="Generate Notes"/>
              <button className="button is-but" onClick={this.handlePopulate}>Populate Notes</button>
            </div>
          </form>
          </div>
          </div>
      ) : null;

    return (

      <div className="FrontPage">
        {userDisplay}
        <h1 className="title">{this.state.title}</h1>
        <table>
          <thead>
            <tr>
              <th>Original Text</th>
              <th>Translation</th>
            </tr>
          </thead>
          <tbody>
          {/*Object.keys(this.props.notes).map((key) => {
                  return (
                    <tr key={key}>
                      <ModalContainer key={key} source_text={key} translation={this.props.notes[key][1]} imgage={this.props.notes[key][0]}/>
                      <td>{this.props.notes[key][1]}</td>
                    </tr>
          )})*/}
        {note_cards.map(note =>
            <tr>
              <td>
                <ModalContainer key={note._id} source_text={note.text} translation={note.translation} imgage={note.picture}/>
              </td>
              <td>
                {note.translation}
              </td>
              <td id={note._id}><a id={note._id} onClick={this.handleDelete}><button id={note._id} className="button is-danger is-small">Delete</button></a></td>
            </tr>
        )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dbpedia;
