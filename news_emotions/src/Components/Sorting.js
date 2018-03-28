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
import $ from 'jquery'

const Sorting = ({sortFunc, filteredData, filteredIds}) => {
  return (
    <div className="sorting">
      <form id='sortForm' action="#" onSubmit={sortFunc}>


        <div className="emo">
          <p>
            <input name="emo" type="radio" id="sadness" value='sadness' />
            <label id='sadnessSort' for="sadness">Sadness</label>
          </p>
          <p>
            <input name="emo" type="radio" id="joy" value="joy" />
            <label id='joySort' for="joy">Joy</label>
          </p>
          <p>
            <input name="emo" type="radio" id="fear" value="fear" onChange={()=>{
            }}/>
            <label id='fearSort' for="fear">Fear</label>
          </p>
          <p>
            <input name="emo" type="radio" id="disgust" value="disgust" />
            <label id='disgustSort' for="disgust">Disgust</label>
          </p>
          <p>
            <input name="emo" type="radio" id="anger" value="anger" />
            <label id='angerSort' for="anger">Anger</label>
          </p>
        </div>
        <div className="upOrDown">

            <input name="group1" type="radio" value='acsending' id="Acsending" />
            <label id='acsendingSort' for="Acsending">Acsending</label>

            <input name="group1" type="radio" value='decsending' id="Decsending" />
            <label id='decsendingSort' for="Decsending">Descending</label>


        </div>
        <button className="sortButton" type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default Sorting
