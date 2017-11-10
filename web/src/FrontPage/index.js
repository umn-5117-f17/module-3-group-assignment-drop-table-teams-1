import React, { Component } from 'react';

// import frustratedMonkey from './frustrated-monkey.gif';
import './frontpage.css';


class Frontpage extends Component {
  constructor() {
    super();
    this.state = { isPrivate: false, collectionName:'', collections: '' }
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
