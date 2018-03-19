// import React from 'react'
import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import {
  Navbar,
  NavItem,
  Row,
  Input,
  Button,
  Collapsible,
  CollapsibleItem
} from 'react-materialize'
import logo from './logo.svg'
import './App.css'
import $ from 'jquery'
import { collapsible } from 'jquery'
import Header from './Components/Header'
import Landing from './Components/Landing'
import SourceList from './Components/SourceList'
import Toolbar from './Components/Toolbar'
import Source from './Components/Source'
import Sidebar from './Components/Sidebar'
import Sorting from './Components/Sorting'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      filteredData: [], //data that is displayed on sourcelist
      sourceIds: [
        { name: 'ABC News', id: 'abc-news', selected: false },
        { name: 'BBC News', id: 'bbc-news', selected: false },
        { name: 'New York Times', id: 'new-york-times', selected: false },
        { name: 'Bloomberg', id: 'bloomberg', selected: false },
        { name: 'CNN', id: 'cnn', selected: false },
        { name: 'Fox News', id: 'fox-news', selected: false },
        // { name: 'MSNBC', id: 'new-york-times', selected: false },
        { name: 'Breitbart News', id: 'breitbart-news', selected: false },
        { name: 'Al Jazeera English',id: 'al-jazeera-english',selected: false},
        // { name: 'New York Times', id: 'new-york-times', selected: false },
        { name: 'Associated Press', id: 'associated-press', selected: false },
        { name: 'CNBC', id: 'cnbc', selected: false },
        { name: 'Politico', id: 'politico', selected: false }
      ],
      filteredIds: [],
      isAuthenticated : false,
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
    console.log(json1, 'json1') //load sources from userdb

    this.setState({
      data: json1
    })
  }

  genericToggle = event => {
    let sourceIds = this.state.sourceIds.slice(0)
    sourceIds.map(ele => {
      let eleId = ele.id.split('-').join(' ')
      let etv = event.target.value.toLowerCase()
      if (eleId === etv) ele.selected = !ele.selected
    }) //insert to userdb
    console.log(sourceIds)
    this.setState({ sourceIds: sourceIds })
  }

  selectAll = () => {
    let selectedArr = this.state.sourceIds.slice(0)
    function isSelected(ele) {
      return ele.selected
    }

    if (selectedArr.every(isSelected)) {
      selectedArr.forEach(ele => {
        ele['selected'] = false
      })

      this.setState({ sourceIds: selectedArr })
    } else {
      selectedArr.forEach(ele => {
        ele['selected'] = true
      })
      this.setState({ sourceIds: selectedArr })
    }
  }

  submitFunc = async e => {
    e.preventDefault()
    $('.emotions')
      .children()
      .css('background-color', 'white')
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
    }) //patch to userdb
    console.log(json2, 'json2')
    return filteredIds
  }

  //calback patch request for submitfunc


  sortFunc = (
    e,
    upDown = $('input[name=group1]:checked').val(),
    emo = $('input[name=emo]:checked').val()
  ) => {
    e.preventDefault()
    if (!this.state.filteredData) return
    let emoSelector = `${emo}`
    $('.emotions')
      .children()
      .css('background-color', '#DDDDDD')
    $(`.${emoSelector}`).css('background-color', '#a2b9bc')
    let filteredData = this.state.filteredData.slice(0)
    let sortArr = filteredData.sort(function(a, b) {
      if (a.emotion && b.emotion) {
        if (upDown === 'acsending') return a.emotion[emo] - b.emotion[emo]
        if (upDown === 'decsending') return b.emotion[emo] - a.emotion[emo]
      }
    })

    this.setState({ filteredData: sortArr })
  }

  async handleSignUp(e, handleSignIn) {
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value
    let confirmPassword = e.target.confirmPassword.value
    if (password !== confirmPassword) {
      window.Materialize.toast('Password doesnt match', 3000)
      e.target.password.value = ''
      e.target.confirmPassword.value = ''
      return
    }
    if (username.length === 0 || password.length === 0) {
      window.Materialize.toast('No fields may be blank', 3000)
      return
    }
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if (response.status === 200) {
      $('#username').val(`${username}`)
      $('#password').val(`${password}`)
      // $('.collapsible').collapsible({
      //   collapsed: true
      // })

      window.Materialize.toast('Account created', 2000)
    } else window.Materialize.toast('username taken', 2000)
  }

   handleSignIn = async(e) => {
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    console.log(response.body)
    if (response.status !== 200) {
      console.log('not 200')
      window.Materialize.toast('please check your credentials', 3000)
      return
    }
    const user = await response.json()
    if (response.status === 200) {
      console.log('signed in ');
      this.setState({isAuthenticated : true})
      window.Materialize.toast('logged in', 1000)
      localStorage.setItem('token', user.token)

    }
  }

  render() {
    // if (this.state.authenticated) {
    //   return <Redirect to='/watson' />;
    // }
    console.log('is authenticated', this.state.isAuthenticated);
    return (
      <div>
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Landing
                  handleSignUp={this.handleSignUp}
                  handleSignIn={this.handleSignIn}
                  isAuthenticated={this.state.isAuthenticated}
                />
              </div>
            )}
          />
          <Route path= '/watson' render = {() => (
            <div>
              <Header />
              <Toolbar
                data={this.state.data}
                genericToggle={this.genericToggle}
                submitFunc={this.submitFunc}
                selectAll={this.selectAll}
                filteredData={this.state.filteredData}
                checkedIt={this.checkedIt}
                sourceIds={this.state.sourceIds}
                sortFunc={this.sortFunc}
                filteredIds={this.state.filteredIds}
              />
              <SourceList filteredData={this.state.filteredData} />
            </div>
          )} />
          </div>
        </Router>
        </div>
        /* {this.state.authenticated ?
        // <Route
        //   exact
        //   path="/watson"
        //   render={() => (
            <div>
              <Header />
              <Toolbar
                data={this.state.data}
                genericToggle={this.genericToggle}
                submitFunc={this.submitFunc}
                selectAll={this.selectAll}
                filteredData={this.state.filteredData}
                checkedIt={this.checkedIt}
                sourceIds={this.state.sourceIds}
                sortFunc={this.sortFunc}
                filteredIds={this.state.filteredIds}
              />
              <SourceList filteredData={this.state.filteredData} />
            </div>
          // )}
        // />
        : null }
      </Router> */

    )
  }
}

export default App
