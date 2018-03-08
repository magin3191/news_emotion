import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import '../App.css'
import Sidebar from './Sidebar'

const Toolbar = ({
  data,
  filteredData,
  genericToggle,
  submitFunc,
  selectAll,
  checkedIt,
  sourceIds
}) => {
  return (
    <div className="toolbar">
      <div>
        <Sidebar
          data={data}
          filteredData={filteredData}
          genericToggle={genericToggle}
          submitFunc={submitFunc}
          selectAll={selectAll}
          checkedIt={checkedIt}
          sourceIds={sourceIds}
        />
      </div>
      Toolbar
    </div>
  )
}

export default Toolbar
