import React, { Component } from 'react'
import {Navbar, NavItem} from 'react-materialize'
import '../App.css'
import Sidebar from './Sidebar'


const Toolbar = ({data}) => {
  return (
   <div className='toolbar'>
     <div>
       <Sidebar data={data}/>
   </div>
   Toolbar
 </div>
  )
}

export default Toolbar
