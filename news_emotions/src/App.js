// import React from 'react'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
      data: [],
      sourceIds:[{name: 'abc news', id: 'abc-news', selected: false},
                  {name: 'new york times', id: 'new-york-times', selected: false}]
    }

  }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:3000/watson')
    const json = await response.json()
    console.log('json', json)
    this.setState({
      data: json
    })
  }

genericToggle =(event)=>{
  let sourceIds = this.state.sourceIds.slice(0)
  sourceIds.map(ele => {
    if (ele.id === event.target.value) ele.selected = !ele.selected
  })
  this.setState({sourceIds: sourceIds})
  console.log(this.state.sourceIds)
}

submitFunc = async(e)=>{
  e.preventDefault()
  let sourceIds = this.state.sourceIds.slice(0)
  let filteredIds = []
  for(let i=0; i<sourceIds.length; i++) {
    if (sourceIds[i].selected) filteredIds.push(sourceIds[i].id)
  }

  //ajax post to /watson
  //success
  // let res = await fetch('localhost:3000/watson')
  // let res = await fetch(localhost:3000/filteredIds[0].id)
  console.log(filteredIds);
  return filteredIds
}

  // genericToggle = (message,key,command) => {
  //   if (command) {
  //
  //     let patchBody = {
  //       "messageIds": [message.id],
  //       "command": command,
  //       [command]: !message[key]
  //     }
  //
  //     this.sendPatch(patchBody)
  //   }
  //
  //   const index = this.state.messages.indexOf(message)
  //   this.setState({
  //     messages: [
  //      ...this.state.messages.slice(0, index),
  //      {...message, [key]: !message[key]},
  //      ...this.state.messages.slice(index + 1),
  //     ]
  //   })
  // }



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
              <Toolbar data={this.state.data} genericToggle={this.genericToggle} submitFunc={this.submitFunc}/>
              <SourceList />
            </div>
          )}
        />
      </div>
    )
  }
}

export default App
