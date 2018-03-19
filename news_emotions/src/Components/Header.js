import React, { Component } from 'react'
import {Navbar, NavItem} from 'react-materialize'
import '../App.css'


const Header = () =>{

    return (<Navbar id='navbar' brand='NewsEmotion' center>
  <NavItem id='logOut' href='/'>Log Out</NavItem>
</Navbar>);

}

export default Header
