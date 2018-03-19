
import React, { Component } from 'react'
import {Navbar, NavItem, Row, Input, Button, Collapsible, CollapsibleItem} from 'react-materialize'
import '../App.css'



const Source = ({filteredData,title,author,description,url,publishedAt,joy,fear,anger,disgust,sadness, onClickSort}) => {



  return (

    <div className="source">
      <div className='title'>{title}</div>
      <div className='author'>{author}</div>
      <div className='description'>{description}</div>
      <a href={url} target="_blank" className='url'>{url}</a>
      <div className='publishedAt'>{publishedAt}</div>
    <div className='emotions' onClick={onClickSort} >
      <div className='joy' id='joy'>joy {joy}</div>
      <div className='sadness' id='sadness'>sadness {sadness}</div>
      <div className='fear' id='fear'>fear {fear}</div>
      <div className='anger' id='anger'>anger {anger}</div>
      <div className='disgust' id='disgust'>disgust {disgust}</div>
    </div>

    </div>


  )

}

export default Source
