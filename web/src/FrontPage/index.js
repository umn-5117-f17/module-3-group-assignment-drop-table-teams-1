import React, { Component } from 'react';

// import frustratedMonkey from './frustrated-monkey.gif';
import './frontpage.css';


class Frontpage extends Component {
  constructor() {
    super();
    this.state = { isPrivate: false, collectionName:'', collections: '' }

<<<<<<< HEAD
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

    );
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/db/collections')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        var collects = json.collections;
        const collectItems = collects.map((collect) =>

        <div class="column is-one-third" id={collect.name}>
        <a href={"/Collection/" + collect.name} className="box">
          <p>{collect.name}</p>
        </a>
        </div>
            );
        this.setState({collections: collectItems});  /*this will cause an invoke of the render() function again */
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleClick(event) {
    //call server side to add collection to database
    console.log('Your collection is: ' + this.state.collectionName);

    fetch('/api/db/newCollection', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collectionName: this.state.collectionName,
          isPrivate: this.state.isPrivate
        })
      }).then(
        fetch('/api/db/collections')
          .then(res => res.json())
          .then(json => {
            console.log(json);
            var collects = json.collections;
            const collectItems = collects.map((collect) =>

            <div class="column is-one-third" id={collect.name}>
            <a href={"/Collection/" + collect.name} className="box">
              <p>{collect.name}</p>
            </a>
            </div>
                );
            this.setState({collections: collectItems});  /*this will cause an invoke of the render() function again */
          })
          .catch(function (error) {
            console.log(error);
          })
      );
      event.preventDefault();
  }

  handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
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
    console.log("this will print twice");
    if (this.state.collections) {
      return (
          <div className="CollectionHomePage">
          <h1 className="title">Collections Available</h1>
          <div className="addCollection box">
            <form>
              <label>
                <input
                  placeholder="New Collection"
                  name="collectionName"
                  type="text"
                  onChange={this.handleInputChange}/>
              </label>
              <label className="label">
                Is private:
                <input
                  className="checkbox"
                  name="isPrivate"
                  type="checkbox"
                  checked={this.state.isPrivate}
                  onChange={this.handleInputChange} />
              </label>
              <button className="submit button is-small is-info" onClick={this.handleClick}>Add</button>
              <br/>
            </form>
          </div>
          <div class="columns is-multiline">
            {this.state.collections}
          </div>
          <div className="FrontPage">
            <form onSubmit={this.dbpedia}>
              <textarea value={this.state.text} name="textInput">This is a spot for text</textarea>
              <input type="submit" value="Dbpedia"/>
            </form>
            <button type="button" className="translate btn" onClick={this.translate}></button>
            <pre>{JSON.stringify(this.state)}</pre>
            <pre><img src={this.state.imgURL} alt="Placeholder Text"/></pre>
          </div>
          </div>);
    } else {
      return null;
    }

>>>>>>> origin/mccro016_branch
  }
}


// class Frontpage extends Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       clickCount: 0
//     }
//     this.foo = this.foo.bind(this);
//   }
//
//   foo() {
//     this.setState(prevState => {
//       return {collections: prevState.collections + 1}
//     })
//   }
//
//   render() {
//     return (
//       <div className="FrontPage">
//
//         <h1>
//           <span className="icon"><i className="fa fa-home"></i></span>
//           &nbsp;
//           the front page!
//         </h1>
//
//         <div className="level">
//           <div className="level-left">
//             <div className="level-item">
//               <button className="button" onClick={this.foo}>example button</button>
//             </div>
//             <div className="level-item" style={countStyle}>
//               click count: {this.state.clickCount}
//             </div>
//           </div>
//         </div>
//
//         <div>
//           <img src={frustratedMonkey} alt="animated gif of a monkey shoving a laptop off the table" />
//         </div>
//
//       </div>
//     );
//   }
// }

export default Frontpage;
