import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect,
withRouter } from 'react-router-dom'
import {Navbar, NavItem, Row, Input, Button, Collapsible, CollapsibleItem} from 'react-materialize'
import Header from '../Components/Header'
import '../App.css'


const Landing = ({handleSignIn,handleSignUp,isAuthenticated}) => {
  return (
    <div className='signInPage'>
    <div id='frontTitle'>News Interpreter</div>
    {isAuthenticated ? <Redirect to ='/watson'/> :
  <form onSubmit={handleSignIn}>
    <Input className='username' id='username' name='username' s={6} label="Username" />
    <Input className='password' id='password' name='password'  type="password" label="password" s={12} />

    <Button className='signInButton' waves='light'>
                Sign In
    </Button>
    <Link to = '/'>
    <Button className='logoutButton' waves='light'>
                Log Out
    </Button>
  </Link>
  </form>}
  <Collapsible className='collapsible'>
  <CollapsibleItem header='Sign Up' id='signup'>
    <form onSubmit={handleSignUp}>
      <Input className='username' placeholder="Pick a Username" name = 'username' s={10} label="Username" />
      <Input className='password' type="password" label="password" placeholder='Password' name='password' s={12} validate />
      <Input className='confirmPassword' placeholder='Confirm Password' label='ConfirmPassword' name='confirmPassword' type='password' name="confirmPassword" s={12} validate></Input>

      <Button type = 'submit' className='signInButton' waves='light'>
                  Sign Up
                </Button>
    </form>
  </CollapsibleItem>
</Collapsible>
</div>

  )
}

export default Landing
