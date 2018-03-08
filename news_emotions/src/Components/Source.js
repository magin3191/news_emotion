
import React, { Component } from 'react'
import {Navbar, NavItem, Row, Input, Button, Collapsible, CollapsibleItem} from 'react-materialize'
import '../App.css'



const Source = ({filteredData,title,author,description,url,publishedAt,joy,fear,anger,disgust,sadness}) => {



  return (

    <div className="source">
      <div className='title'>{title}</div>
      <div className='author'>{author}</div>
      <div className='description'>{description}</div>
      <a href={url} target="_blank" className='url'>{url}</a>
      <div className='publishedAt'>{publishedAt}</div>
    <div className='emotions'>
      <div className='joy'>joy {joy}</div>
      <div className='sadness'>sadness {sadness}</div>
      <div className='fear'>fear {fear}</div>
      <div className='anger'>anger {anger}</div>
      <div className='disgust'>disgust {disgust}</div>
    </div>

    </div>


  )

}

export default Source
