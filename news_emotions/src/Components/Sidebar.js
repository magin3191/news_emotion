import React, { Component } from 'react'
import {
  Navbar,
  NavItem,
  SideNav,
  SideNavItem,
  Button,
  Input
} from 'react-materialize'
import '../App.css'
import getNews from '../App.js'
import $ from 'jquery'

const Sidebar = ({
  filteredData,
  toggleCheck,
  genericToggle,
  submitFunc,
  selectAll,
  checkedIt,
  sourceIds,
  sourceSearch
}) => {
  return (
    <SideNav
      trigger={<Button id="selectSourcesbtn">Select Sources</Button>}
      options={{ closeOnClick: false }}
    >

      {/* <SideNavItem> */}
        <form onSubmit={sourceSearch}>
        <Input
          className="search"
          name="search"
          s={10}
          label="Source Search"
        />
        <button type='submit'>Search</button>
      </form>


      <SideNavItem>
        <button id="selectAllbtn" onClick={selectAll}>
          Select All
        </button>
        <form className="sidenav" onSubmit={submitFunc}>
          {sourceIds.map((el, i) => {
            return (
              <div className="checkBoxItems">
                <input
                  type="checkbox"
                  id={i}
                  value={el.name}
                  checked={el.selected}
                  onChange={event => genericToggle(event)}
                />
                <label for={i}>{el.name}</label>
                <br />
              </div>
            )
          })}
          <button type="submit">Submit</button>
        </form>
      </SideNavItem>
    </SideNav>
  )
}

export default Sidebar
