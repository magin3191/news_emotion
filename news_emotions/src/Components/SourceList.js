import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import '../App.css'
import Source from './Source'

const SourceList = ({ filteredData }) => {
  return (
    <div className="sourcelist">
      sourcelist
      {filteredData.map(el => {
        if(!el.emotion)return''
        return (
          <div>
            <Source
              filteredData={filteredData}
              title={el.title}
              author={el.author}
              description={el.description}
              url={el.url}
              publishedAt={el.publishedAt}
              joy={(el.emotion.joy)}
              anger={(el.emotion.anger)}
              fear={(el.emotion.fear)}
              sadness={(el.emotion.sadness)}
              disgust={(el.emotion.disgust)}

            />
          </div>
        )
      })}
    </div>
  )
}

export default SourceList
