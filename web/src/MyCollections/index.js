import React, { Component } from 'react';

// import frustratedMonkey from './frustrated-monkey.gif';
import './MyCollection.css';


class MyCollections extends Component {
  constructor(props) {
    super(props);
    this.state = { isPrivate: false, collectionName:'', collections: '' }

  }

  componentDidMount() {
    console.log("profile is " + JSON.stringify(this.props.profile.nickname));
    fetch('/api/db/myCollections/'+ this.props.profile.nickname)
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


  render() {
    console.log("this will print twice");

    if (this.state.collections) {
      return (
          <div className="CollectionHomePage">
          <h1 className="title">My Collections</h1>
          <div class="columns is-multiline">
            {this.state.collections}
          </div>
          </div>);
    } else {
      return null;
    }

  }
}

export default MyCollections;
