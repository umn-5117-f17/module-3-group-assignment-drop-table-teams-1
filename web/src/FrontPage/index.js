import React, { Component } from 'react';

// import frustratedMonkey from './frustrated-monkey.gif';



class Frontpage extends Component {
  constructor(props) {
    super(props);
    this.state = { isPrivate: false, collectionName:'', collections: '' }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    //console.log("profile is " + JSON.stringify(this.props.profile.nickname));
    fetch('/api/db/collections')
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        var collects = json.collections;
        const collectItems = collects.map((collect) =>

        <div key={collect._id} className="column is-one-third" id={collect.name}>
        <a href={"/Collection/" + collect.name} $box-color = "grey" className="box" >
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
    console.log("on click name is " + JSON.stringify(this.props.profile.nickname));

    fetch('/api/db/newCollection', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.props.profile.nickname,
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
          <h1 className="title  has-text-centered">Public Collections Available</h1>
          <div className="addCollection box field">
            <form>
              <label class = "label"> Add new Collection </label>
                <input
                  className="input"
                  placeholder="New Collection"
                  name="collectionName"
                  type="text"
                  onChange={this.handleInputChange}/>
              <br/><br/>
              <label class = "checkbox">
              <input
                className="checkBox"
                name="isPrivate"
                type="checkbox"
                checked={this.state.isPrivate}
                onChange={this.handleInputChange} />
                  Is private
              </label>
              <br/><br/>
              <button className="button is-link" onClick={this.handleClick}>Add Collection</button>
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
