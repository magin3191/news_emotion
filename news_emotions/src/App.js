// import React from 'react'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import logo from './logo.svg'
import './App.css'
import $ from 'jquery'
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
      data: [],
      filteredData: [],
      sourceIds: [
        { name: 'ABC News', id: 'abc-news', selected: false },
        { name: 'New York Times', id: 'new-york-times', selected: false },
        { name: 'BBC', id: 'bbc-news', selected: false },
        { name: 'Bloomberg', id: 'bloomberg', selected: false },
        { name: 'CNN', id: 'cnn', selected: false },
        { name: 'Fox News', id: 'fox-news', selected: false },
        { name: 'MSNBC', id: 'new-york-times', selected: false },
        { name: 'Brietbart', id: 'breitbart-news', selected: false },
        { name: 'Al Jazeera English',id: 'al-jazeera-english',selected: false},
        { name: 'New York Times', id: 'new-york-times', selected: false },
        { name: 'Associated Press', id: 'associated-press', selected: false },
        { name: 'CNBC', id: 'cnbc', selected: false },
        { name: 'Politico', id: 'politico', selected: false }
      ],
      filteredIds: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/watson', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.filteredIds
      })
    })
    const json1 = await response.json()
    console.log(json1, 'json1')
    this.setState({
      data: json1
    })
  }

  genericToggle = event => {
    let sourceIds = this.state.sourceIds.slice(0)
    sourceIds.map(ele => {
      if (ele.id === event.target.value) ele.selected = !ele.selected
    })
    this.setState({ sourceIds: sourceIds })

  }

  submitFunc = async e => {
    e.preventDefault()
    let sourceIds = this.state.sourceIds.slice(0)
    let filteredIds = []
    for (let i = 0; i < sourceIds.length; i++) {
      if (sourceIds[i].selected) filteredIds.push(sourceIds[i].id)
    }
    this.setState({ filteredIds })

    const response = await fetch('http://localhost:3000/watson', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: filteredIds
      })
    })
    const json2 = await response.json()
    this.setState({
      filteredData: json2
    })
    console.log(this.state.filteredData);

    return filteredIds
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Landing />
            </div>
          )}
        />

        <Route
          exact
          path="/watson"
          render={() => (
            <div>
              <Header />
              <Toolbar
                data={this.state.data}
                genericToggle={this.genericToggle}
                submitFunc={this.submitFunc}
                filteredData={this.state.filteredData}
              />
              <SourceList filteredData={this.state.filteredData} />
            </div>
          )}
        />
      </div>
    )
  }
}

export default App
