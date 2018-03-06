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



const Sidebar = ({data}) => {

  let sourcesArr=['abc-news','new-york-times','bloomberg','bbc-news','fox-news',
  'msnbc','breitbart-news','al-jazeera-english','cnn','politico']


  return (

    <SideNav
      trigger={<Button>Select Sources</Button>}
      options={{ closeOnClick: false }}
    >
      <SideNavItem

        // userView
        // user={{
        //   background: 'img/office.jpg',
        //   image: 'img/yuna.jpg',
        //   name: 'John Doe',
        //   email: 'jdandturk@gmail.com'
        // }}
      />
      Sources
      <SideNavItem>

        <form className='sidenav' onSubmit={(e)=>{e.preventDefault()
          
          console.log('data',data);
      }}>
        {sourcesArr.map((el,i)=>{
          return(
            <div className='checkBoxItems'>
              <input type="checkbox" id={i}  value ={el} />
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
