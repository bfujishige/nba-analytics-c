import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/signup' render={(props) =>
            <SignupPage
              {...props}
            />
          }/>
        </Router>
      </div>
    );
  }
}

export default App;
