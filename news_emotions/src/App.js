// import React from 'react'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg'
import './App.css'
import Header from './Components/Header'
import Landing from './Components/Landing'
import SourceList from './Components/SourceList'
import Toolbar from './Components/Toolbar'
import Source from './Components/Source'
import Sidebar from './Components/Sidebar'


class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }

  }

componentDidMount = async () => {
      const response = await fetch('http://localhost:3000/watson')
      const json = await response.json()
      console.log('json',json);
      this.setState({
        data: json
      })
    }








  render() {
    return (
      <div className="App">


        <Route exact path='/' render={() => (
          <div>
            <Landing />
        </div>
        )} />

        <Route exact path='/watson' render={() => (
          <div>
            <Header />
            <Toolbar data={this.state.data}/>
            <SourceList />
        </div>
        )} />

      </div>
    )
  }
}

export default App
