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
      words: "",
      imgURL: "",
      source_lang:"en",
      target_lang :"fr",
      translated_words:[]
    };
    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
  }


  translate(event) {
    event.preventDefault();
    const base_url = 'https://translation.googleapis.com/language/translate/v2';
    const google_url = base_url +"?q="+encodeURI(this.state.words)+
                       "&target="+this.state.target_lang+"&source="
                       +this.state.source_lang+"&key=AIzaSyAllxK-KhFvNMtTqkA59tfUkQCGAYNHi5I";

    fetch(google_url, {
          method:"POST"})
          .then(res => res.json())
          .then(json => {
          console.log(json.data.translations);
          this.setState({translated_words: json.data.translations});  /*this will cause an invoke of the render() function again */
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
      let max = 0.0;
      let similarPage = null;
      let words = [];
      responseJson.Resources.forEach((resource) => {
        if (resource['@similarityScore'] > max){
          max = resource['@similarityScore'];
          similarPage = resource;
        }
        words.push(resource["@surfaceForm"]);
      });
      this.setState({words: words});
      fetch(similarPage['@URI'],{
        method: "GET",
      })
      .then((response) => response.text())
      .then((text) => {
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
          let re = new RegExp('(<meta property="og:image".+)', 'i');
          let metaImg = text.match(re)[0];
          let contentRe = new RegExp('(content=".+")', 'i');
          let content = metaImg.match(contentRe)[0].slice(9,-1);
          this.setState({imgURL: content});
          this.translate(event);
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
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
          <textarea value={this.state.text} name="textInput">This is a spot for text</textarea>
          <input type="submit" value="Dbpedia"/>
        </form>
        <button type="button" className="translate btn" onClick={this.translate}></button>
        <pre>{JSON.stringify(this.state)}</pre>
        <pre><img src={this.state.imgURL} alt="Placeholder Text"/></pre>
      </div>
    );
  }
}

export default Frontpage;
