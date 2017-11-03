import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';

class Foo extends Component {
  constructor() {
    super();
    this.state = {movie: {genres:[]}}
  }
  componentDidMount() {
    fetch('/api/movies/'+this.props.match.params.movieId)
      .then(res => res.json())
      .then(json => {
        this.setState({movie: json});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container is-widescreen">
      <div className="notification">
        <h1>{this.state.movie.title}</h1>
        <p>release year :{ this.state.movie.releaseYear}</p>
        <p>average rating :{ this.state.movie.avgRating}</p>
        <p>mpaa:{ this.state.movie.mpaa}</p>
        <p>Summary :{ this.state.movie.plotSummary}</p>
        <p><a href={'http://www.imdb.com/title/tt'+this.state.movie.imdbMovieId}>IMBD Link</a></p>
        <strong>Genres :</strong><ul>
        {this.state.movie.genres.map((item, index) =>
            <li key={index}>{item}</li>
        )}
        </ul>
        <p><Link to={`/`}>back to home</Link></p>
      </div>
      </div>
    );
  }
}

export default Foo;
