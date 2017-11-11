import React, { Component } from 'react';

class Dbpedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      words: "",
      translation: "",
      target_lang: "fr",
      source_lang: "en",
      annotations: "",
      translated_words:[]
    };

    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
  }
<<<<<<< HEAD

  componentDidMount() {
    console.log('FOO');
    console.log("stringify props")
    console.log(JSON.stringify(this.props.target_lang));
    let t_lang = this.props.target_lang;
    this.setState({target_lang: t_lang});
  }


  translate(event) {
    event.preventDefault();
    let t_lang = this.props.target_lang;
    this.setState({target_lang: t_lang});
    const base_url = 'https://translation.googleapis.com/language/translate/v2';
    const google_url = base_url +"?q="+encodeURI(this.state.words)+
                       "&target="+this.state.target_lang+"&source="
                       +this.state.source_lang+"&key=AIzaSyAllxK-KhFvNMtTqkA59tfUkQCGAYNHi5I";

    fetch(google_url, {
          method:"POST"})
          .then(res => res.json())
          .then(json => {
          this.setState({translated_words: json});  /*this will cause an invoke of the render() function again */
                         })
          .catch(function (error) {
          console.log(error);
                         });

=======
  translate(event) {
    event.preventDefault();
    const base_url = 'https://translation.googleapis.com/language/translate/v2';
    const google_url = base_url +"?q="+encodeURI(Object.keys(this.state.annotations).join(' '))+
                       "&target="+this.state.target_lang+"&source="
                       +this.state.source_lang+"&key=AIzaSyAllxK-KhFvNMtTqkA59tfUkQCGAYNHi5I";

    fetch(google_url, {
          method:"POST"})
          .then(res => res.json())
          .then(json => {
          // console.log(json.data.translations);
          this.setState({translated_words: json.data.translations});  /*this will cause an invoke of the render() function again */
                         })
          .catch(function (error) {
          console.log(error);
                         });

>>>>>>> wang4860_newnote
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
<<<<<<< HEAD
      this.setState({words: words});
      console.log(words);
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
=======
      this.setState({words: Object.keys(annotations)});
      this.setState({annotations: annotations});
      Object.keys(annotations).map((key) => {
        fetch(annotations[key],{
>>>>>>> wang4860_newnote
          method: "GET",
        })
        .then((response) => response.text())
        .then((text) => {
<<<<<<< HEAD
          let re = new RegExp('(<meta property="og:image".+)', 'i');
          let metaImg = text.match(re)[0];
          let contentRe = new RegExp('(content=".+")', 'i');
          let content = metaImg.match(contentRe)[0].slice(9,-1);
          this.setState({imgURL: content});
          this.translate(event);
=======
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
            annotations[key] = content;
            this.setState({annotations: annotations});
            console.log(Object.keys(this.state.annotations).join(' '));
            // this.translate(event);
          })
          .catch((error) => {
            console.error(error);
          });
>>>>>>> wang4860_newnote
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
<<<<<<< HEAD
          <textarea value={this.state.text} name="textInput">This is a spot for text</textarea>
          <input type="submit" value="Dbpedia"/>
        </form>
        <button type="button" className="translate btn" onClick={this.translate}></button>
        <pre>{JSON.stringify(this.state)}</pre>
        <pre><img src={this.state.imgURL} alt="Placeholder Text"/></pre>
=======
          <textarea value={this.state.text} name="textInput"></textarea>
          <input type="submit" value="Dbpedia"/>
        </form>
        <table>
          <tbody>
            {Object.keys(this.state.annotations).map((key) => {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td><img src={this.state.annotations[key]} alt="" /></td>
                      </tr>
            )})}
          </tbody>
        </table>
        <pre>{JSON.stringify(this.state.words)}</pre>
        <pre>{JSON.stringify(this.state.annotations)}</pre>
        {/*<pre><img src={this.state} alt="Placeholder Text"/></pre>*/}
>>>>>>> wang4860_newnote
      </div>
    );
  }
  }

export default Dbpedia;
