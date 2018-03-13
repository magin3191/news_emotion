import React, { Component } from 'react'
import { Navbar, NavItem, Button, Dropdown } from 'react-materialize'
import '../App.css'
import Sidebar from './Sidebar'
import Sorting from './Sorting'


const Toolbar = ({
  data,
  filteredData,
  genericToggle,
  submitFunc,
  selectAll,
  checkedIt,
  sourceIds,
  sortFunc
}) => {
  return (
    <div className="toolbar">

        <Sidebar
          data={data}
          filteredData={filteredData}
          genericToggle={genericToggle}
          submitFunc={submitFunc}
          selectAll={selectAll}
          checkedIt={checkedIt}
          sourceIds={sourceIds}

        />
        <Sorting sortFunc={sortFunc} />



    </div>


  )
}

export default Toolbar
