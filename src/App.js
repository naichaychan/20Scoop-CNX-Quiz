import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import searchUser from './searchUser';
import viewUserDetail from './viewUserDetail';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route 
          path="/searchUser" 
          component={searchUser} 
        />
        <Route
          path='/viewUserDetail'
          component={viewUserDetail} 
          // render={(props) => <ViewUserDetail gitUser="naichaychan" />}
        />
      </div>
    )
  }
}

export default App