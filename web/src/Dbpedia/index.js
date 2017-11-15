import React, { Component } from 'react';
// eslint-disable-next-line
import NoteCardList from '../Collection';
import ModalContainer from '../ModalContainer';

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
      modal_notes: [],
      text: ''
    };

    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
    this.doSetNotes = this.doSetNotes.bind(this);
    this.handlePopulate = this.handlePopulate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchNew = this.fetchNew.bind(this);
  }

  handleDelete(event) {
    //call server side to add collection to database
    const target = event.target;
    const noteId = target.id;

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
            var notecards = json.noteCards;
            var collectionTitle = this.props.match.params.collectionId;
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
        var notecards = json.noteCards;
        var collectionTitle = this.props.match.params.collectionId;
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
                fetch('/api/db/newNote', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Id: this.props.match.params.collectionId,
                    notes: newAnnotations
                  })})
                  .then(
                    this.fetchNew()
                  );
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
                Id: this.props.match.params.collectionId,
                notes: this.state.annotations
              })
            }).then(
              this.fetchNew()
            );
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
      console.log(annotations)
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



  render() {
    let note_cards = this.state.modal_notes;
    return (
      <div className="FrontPage">
        <div className="field">
          <label className="label">Enter Text</label>
        </div>
        <div className="field">
          <form onSubmit={this.dbpedia}>
            <div className="field">
              <textarea className="textarea" name="textInput"></textarea>
            </div>
            <div className="field">
              <input className="button" type="submit" value="Transmutinate"/>
            </div>
          </form>
          </div>
        <h1 className="title">{this.state.title}</h1>
        <table>
          <tbody>
              <tr className="columns">
                <th className="column is-one-third">Original Text</th>
                <th className="column is-one-third">Translation</th>
                <th className="column is-one-third">Delete</th>
              </tr>
            {note_cards.map(note =>
              <tr className="columns" key={note._id}>
                <td className="column is-one-third">
                  <ModalContainer key={note._id} source_text={note.text} translation={note.translation} imgage={note.picture}/>
                </td>
                <td className="column is-one-third">
                  {note.translation}
                </td>
                <td className="column is-one-third"><button className="button is-danger" id={note._id} onClick={this.handleDelete}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dbpedia;
