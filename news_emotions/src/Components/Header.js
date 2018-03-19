import React, { Component } from 'react'
import {Navbar, NavItem} from 'react-materialize'
import '../App.css'


const Header = () =>{

    return (<Navbar id='navbar' brand='TheNewsInterpreter' center>
  <NavItem id='logOut' href='/' onClick={()=>{localStorage.removeItem("username")}}>Log Out</NavItem>
</Navbar>);

}

export default Header
