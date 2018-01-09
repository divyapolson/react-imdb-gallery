import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import {render} from 'react-dom';
import { Divider, Card, Image, Button, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import styles from './Detail.scss'

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.id,
      movies: this.props.location.movies,
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
      if(this.state.id == (this.state.movies.size)) {
          return;
      }
      let increase = this.state.id + 1;
      this.setState(function() {
          return {
              id: increase
          }
      });
  }

  previous() {
      if(this.state.id == 0) {
          return;
      }
      let decrease = this.state.id - 1;
      this.setState(function() {
          return {
              id: decrease
          }
      });
  }

  render() {
    return(
      <div className="Detail">
        <div className="centerMe">
          <Button className="mybutton" onClick={function(){this.previous()}.bind(this)}>previous</Button>
          <Button className="mybutton" onClick={function(){this.next()}.bind(this)}>next</Button>
          <Divider hidden/>
          <Card.Group>
            <Card>
              <Card.Content>
                <Image size="medium" src={'https://image.tmdb.org/t/p/w500' + this.state.movies[this.state.id].poster_path} />
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image fluid src={'https://image.tmdb.org/t/p/w500' + this.state.movies[this.state.id].backdrop_path} />
                  <Divider hidden/>
                <Card.Header>
                  {this.state.movies[this.state.id].title}
                </Card.Header>
                <Card.Description>
                  {this.state.movies[this.state.id].overview}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Average Rating: {this.state.movies[this.state.id].vote_average}
              </Card.Content>
            </Card>
          </Card.Group>
          </div>
      </div>
      )
    }
  }

//PROPS TYPECHECKING

Detail.propTypes = {
    location: PropTypes.shape({
        id: PropTypes.number,
        movies: PropTypes.array
    })
}

export default Detail
