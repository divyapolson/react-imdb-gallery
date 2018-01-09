import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import {render} from 'react-dom';
import { Divider, Button, Image, Card } from 'semantic-ui-react'

import styles from './Gallery.scss'

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: null,
      name: null,
      resultsList: [],
      id: null,
      page: '1',
      genre: '',
    }
    this.loadGallery = this.loadGallery.bind(this);
    this.pushToDetail = this.pushToDetail.bind(this);
    this.filterGenre = this.filterGenre.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadGallery() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=498436b8e6387b11b0e81654d6830047&language=en-US&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${this.state.page}`)
      .then(function(response) {
          this.setState({
              resultsList: response.data.results,
          });
      }.bind(this),);
  }

  filterGenre(e) {
    var filterType = e.target.id;
    var currentPage = this.state.page;
    this.setState({
      genre: filterType,
      page: '1',
    }, () => this.loadGallery());
  }

  nextPage(e) {
    var currentPage = Number(this.state.page);
    this.setState({
      page: (currentPage + 1).toString(),
    }, () => this.loadMore());
  }

  loadMore() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=498436b8e6387b11b0e81654d6830047&language=en-US&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${this.state.page}`)
    .then(function(response) {
      this.setState({
        resultsList: this.state.resultsList.concat(response.data.results),
      });
    }.bind(this));
  }

  pushToDetail(index) {
    this.props.history.push ({
      pathname: '/detail',
      id: index,
      movies: this.state.resultsList
    });
  }

  componentDidMount() {
    this.loadGallery();
  }

  render() {
    return(
      <div className="Gallery">
        <Divider hidden/><Divider hidden/>
        <Button className="mybutton" id={this.props.genre} onClick={this.filterGenre}>All</Button>
        <Button id="28" className="mybutton" onClick={this.filterGenre}>Action</Button>
        <Button id="16" className="mybutton" onClick={this.filterGenre}>Animation</Button>
        <Button id="35" className="mybutton" onClick={this.filterGenre}>Comedy</Button>
        <Button id="99" className="mybutton" onClick={this.filterGenre}>Documentary</Button>
        <Button id="18" className="mybutton" onClick={this.filterGenre}>Drama</Button>
        <Button id="14" className="mybutton" onClick={this.filterGenre}>Fantasy</Button>
        <Button id="27" className="mybutton" onClick={this.filterGenre}>Horror</Button>
        <Button id="10749" className="mybutton" onClick={this.filterGenre}>Romance</Button>
        <Button id="878" className="mybutton" onClick={this.filterGenre}>Sci-Fi</Button>
        <Divider hidden/>
        <Card.Group className="moviesgallery" itemsPerRow={5}> {
          this.state.resultsList.map((movie, index) => {
            return (
              <Card className="hover" key={index+"card"}>
              <Image onClick={function(){this.pushToDetail(index)}.bind(this)} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} key={index + "poster"} />
              </Card>
            )
          })
        }
        </Card.Group>
        <Divider hidden/>
        <Button className="mybutton" onClick={this.nextPage}>Load more</Button>
        </div>
    )
  }
}

export default Gallery
