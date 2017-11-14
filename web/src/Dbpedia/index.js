import React, { Component } from 'react';
import NoteCardList from '../Collection';

class Dbpedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target_lang: "fr",
      source_lang: "en",
      annotations: "",
      translated_words:[]
    };

    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
    this.doSetNotes = this.doSetNotes.bind(this);
  }

  componentDidMount() {
    let t_lang = this.props.target_lang;
    this.setState({target_lang: t_lang});
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
    return (
      <div className="FrontPage">
        <form onSubmit={this.dbpedia}>
          <textarea value={this.state.text} name="textInput"></textarea>
          <input type="submit" value="Dbpedia"/>
        </form>
        <NoteCardList {...this.props} notes={this.state.annotations}/>
      </div>
    );
  }
  }

export default Dbpedia;
