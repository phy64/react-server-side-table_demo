import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Basic, Custom } from './pages';

function App () {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <nav className="navbar navbar-expand navbar-dark bg-dark" style={{minWidth: '1140px'}}>
        <a href={`${process.env.PUBLIC_URL}/`} className="navbar-brand">
          REACT SERVER SIDE TABLE
        </a>
         <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              BASIC
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/custom"} className="nav-link">
              CUSTOM
            </Link>
          </li>
        </div> 
      </nav>
      <div className="container mt-3" style={{width: '1140px', maxWidth: 'none'}}>
        <Switch>
          <Route exact path="/" component={Basic}/>
          <Route exact path="/custom" component={Custom}/>
        </Switch>
      </div>
    </Router>
  )
};

export default App;
