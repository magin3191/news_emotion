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



const Sidebar = ({data,toggleCheck,genericToggle, submitFunc}) => {


  let sourcesArr=['abc-news','new-york-times','bloomberg','bbc-news','fox-news',
  'msnbc','breitbart-news','al-jazeera-english','cnn','politico','cnbc']

  let selectedSources=[]







  return (

    <SideNav
      trigger={<Button>Select Sources</Button>}
      options={{ closeOnClick: false }}
    >
      <SideNavItem
      />
      Sources
      <SideNavItem>

        <form className='sidenav' onSubmit={submitFunc} >
        {sourcesArr.map((el,i)=>{//onchange for each element to set checked=true
          //sourceArr=sourceArr.filter() to remove items that arent checked. Then, setState().
          return(
            <div className='checkBoxItems'>
              <input type="checkbox" id={i}  value ={el} onChange={(event)=>
                genericToggle(event)
              } />
              <label for={i}>{el.split('-').join(' ')}</label>
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
