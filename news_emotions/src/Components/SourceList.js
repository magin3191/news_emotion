import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'
import '../App.css'
import Source from './Source'

const SourceList = ({ filteredData, sortFunc, onClickSort }) => {
  let selectSource = !filteredData.length ? 'Sources Listed Here' : ''
  return (
    <div className="sourcelist">
      {selectSource}
      {filteredData.map(el => {
        if (!el.emotion) return
        if (el.emotion)
          return (
            <div>
              <Source
                filteredData={filteredData}
                title={el.title}
                author={el.author}
                description={el.description}
                url={el.url}
                publishedAt={el.publishedAt}
                joy={el.emotion.joy}
                anger={el.emotion.anger}
                fear={el.emotion.fear}
                sadness={el.emotion.sadness}
                disgust={el.emotion.disgust}
                onClickSort={onClickSort}
              />
            </div>
          )
      })}
    </div>
  )
}

export default SourceList
