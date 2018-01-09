import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Link, hashHistory } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import Detail from './components/Detail/Detail.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
  <div className="nav">
  <h1>movies</h1>
  <Router>
    <div>
    <h2><Link to="/" className="links">SEARCH</Link> <Link to="/gallery" className="links">GALLERY</Link></h2>
    </div>
  </Router>
  <Router history={hashHistory}>
    <div>
    <Route exact path='/' component={Home}/>,
    <Route exact path='/gallery' component={Gallery}/>,
    <Route exact path='/detail' component={Detail}/>
    </div>
  </Router>
  </div>,
  document.getElementById('app')
  // <Home />,
  // Define your router and replace <Home /> with it!
);
