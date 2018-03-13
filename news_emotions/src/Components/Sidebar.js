import React, { Component } from 'react'
import {
  Navbar,
  NavItem,
  SideNav,
  SideNavItem,
  Button
} from 'react-materialize'
import '../App.css'
import getNews from '../App.js'
import $ from 'jquery';



const Sidebar = ({data,filteredData,toggleCheck,genericToggle, submitFunc, selectAll,checkedIt,sourceIds}) => {







  return (

    <SideNav
      trigger={<Button>Select Sources</Button>}
      options={{ closeOnClick: false }}
    >
      <SideNavItem
      />
      Sources

      <SideNavItem>
        <button onClick={selectAll}>Select All</button>
        <form className='sidenav' onSubmit={submitFunc} >
        {sourceIds.map((el,i)=>{

          return(
            <div className='checkBoxItems'>
              <input type="checkbox" id={i} value ={el.name} checked={el.selected} onChange={(event)=>
                genericToggle(event)
              } />
              <label for={i}>{el.name}</label>
              <br />
            </div>
          )
        })}
          <button type='submit'>Submit</button>
        </form>

      </SideNavItem>
    </SideNav>


  )
}

export default Sidebar
