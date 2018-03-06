import React, { Component } from 'react'
import {Navbar, NavItem, Row, Input, Button, Collapsible, CollapsibleItem} from 'react-materialize'
import Header from '../Components/Header'
import '../App.css'


const Landing = ({handleSignIn,handleSignUp}) => {
  return (
    <div ClassName='signInPage'>
    <div>News Interpreter</div>
  <form onSubmit={handleSignIn}>
    <Input placeholder="Username" s={6} label="Username" />
    <Input type="password" label="password" s={12} />
    <Button className='signInButton' waves='light'>
                Sign In
    </Button>
    <Button className='logoutButton' waves='light'>
                Log Out
    </Button>
  </form>
  <Collapsible>
  <CollapsibleItem header='Sign Up'>
    <form onSubmit={handleSignIn}>
      <Input placeholder="Pick a Username" s={6} label="Username" />
      <Input type="password" label="password" s={12} />
      <Button className='signInButton' waves='light'>
                  Sign Up
                </Button>
    </form>
  </CollapsibleItem>
</Collapsible>
</div>

  )
}

export default Landing
