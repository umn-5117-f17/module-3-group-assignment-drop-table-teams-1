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
        // console.log(json);
        var collects = json.collections;
        const collectItems = collects.map((collect) =>

        <div key={collect._id} className="column is-one-third" id={collect.name}>
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
            // console.log(json);
            var collects = json.collections;
            const collectItems = collects.map((collect) =>

            <div key={collect._id}className="column is-one-third" id={collect.name}>
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
    // console.log("this will print twice");
    console.log(this.props.profile);
    if (this.state.collections) {
      return (
          <div className="CollectionHomePage">
          <h1 className="title">Public Collections Available</h1>
          <div className="addCollection box">
            <form>
              <label>
                <input
                  className="newCollectInput"
                  placeholder="New Collection"
                  name="collectionName"
                  type="text"
                  onChange={this.handleInputChange}/>
              </label>
              <label>
                Is private:
                <input
                  className="checkBox"
                  name="isPrivate"
                  type="checkbox"
                  checked={this.state.isPrivate}
                  onChange={this.handleInputChange} />
              </label>
              <button className="submit button is-small is-info newColBut" onClick={this.handleClick}>Add</button>
              <br/>
            </form>
          </div>
          <div className="columns is-multiline">
            {this.state.collections}
          </div>
          </div>);
    } else {
      return null;
    }

  }
}

export default Frontpage;
