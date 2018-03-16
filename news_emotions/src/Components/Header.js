import React, { Component } from 'react'
import {Navbar, NavItem} from 'react-materialize'
import '../App.css'


const Header = () =>{

    return (<Navbar brand='NewsEmotion' center>
  <NavItem href='/'>Log Out</NavItem>
</Navbar>);

}

export default Header
