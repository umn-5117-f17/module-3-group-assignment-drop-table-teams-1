import React, { Component } from 'react';

// import frustratedMonkey from './frustrated-monkey.gif';
import './frontpage.css';


class Frontpage extends Component {
<<<<<<< HEAD

  constructor(props) {
    super(props);
    this.state = {
      words: "",
      imgURL: "",
      source_lang:"en",
      target_lang :"zh-CN",
      translated_words:[]
    };
    this.dbpedia = this.dbpedia.bind(this);
    this.translate = this.translate.bind(this);
=======
  constructor() {
    super();
    this.state = { isPrivate: false, collectionName:'', collections: '' }
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
>>>>>>> wang4860_newnote
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
<<<<<<< HEAD
          this.setState({translated_words: json});  /*this will cause an invoke of the render() function again */
                         })
          .catch(function (error) {
          console.log(error);
                         });
=======
            console.log(json);
            var collects = json.collections;
            const collectItems = collects.map((collect) =>
>>>>>>> wang4860_newnote

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

<<<<<<< HEAD
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
=======
  handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
>>>>>>> wang4860_newnote

  this.setState({
    [name]: value
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
          </div>);
    } else {
      return null;
    }

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
