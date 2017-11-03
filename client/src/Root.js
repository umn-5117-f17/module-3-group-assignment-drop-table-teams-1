import 'bulma/css/bulma.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var amazingInlineJsStyle = {
  border: '1px solid purple',
  padding: '10px',
  backgroundColor: '#ffffcc'
}

class RootContainer extends Component {
  constructor() {
    super();
    this.state = { message: '' };
    //this.state = { movies : [] };
    //this.state = {another : "dddd"};
  }

  componentDidMount() {
    fetch('/api/example')
      .then(res => res.json())
      .then(json => {
        //const movies = res.data.data.children.map(obj => obj.data);
        //console.log("hereerreee");
        //var movies1 = json;
        //console.log(json);;
        //console.log(movies1);
        //this.setState({ movies : json.movies });
        console.log("in rooooot");
        //console.log(movies);
        console.log("in rooot!");;
        this.setState({message: json.message});  /*this will cause an invoke of the render() function again */
        //this.setState({another: json.another});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* Every time we change the value of a state variable, the render() function is called. That's why we need to make sure in the render() of
  the Root class below that we received the prop 'messageFromServer' (see the if-else condition in the Root class)*/
  render() {
    return (
      <MovieList/>
      //<Root messageFromServer={this.state.message} />
      //<Root messageFromServer = {this.state.movies} />
    );
  }
}

class MovieList extends Component {
  constructor() {
    super();
    this.state = {movies : []}
  }

  componentDidMount() {
    fetch('api/movies')
    .then(res => res.json())
    .then(json => {
        this.setState({movies : json.movieList});
        console.log(this.state.movies);
    })
    .catch(function(error){
        console.log(error);
    });
  }

    render() {
        const movieList = this.state.movies.map((movies) =>
          <div className = "box">
            <article className = "media">
              <div className = "media-content">
                <div className = "content">
                  <h1>{movies.title}</h1>
                  <p>Release year : {movies.releaseYear}</p>
                  <p>Average rating : {movies.avgRating}</p>
                  <p>Know more : <Link to = {'/movies/' + movies.movieId}> Know more </Link> </p>
                </div>
              </div>
            </article>
          </div>
      );
      return (
        <ul> {movieList} </ul>
      );
    }
}

class Root extends Component {

  render() {
    console.log("where ??? this will print twice");
    // console.log(this.props.another);
    if (this.props.messageFromServer) {
      return (
          <div className="Root">
            <p>
              Message from server:
              <span style={amazingInlineJsStyle}>{this.props.messageFromServer} </span>
            </p>
            <p>
              Root! <Link to={`/foo`}>a link to foo</Link>
            </p>
          </div>

        );
    } else {
      return null;
    }
  }
}

export default RootContainer;
