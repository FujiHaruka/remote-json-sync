import {pure} from 'recompose'
import './JsonTree.css'
import React from 'react'

const JsonTree = pure(({json, spaces = 0, highlightPath, highlight = false}) => {
  if (typeof json === 'object' && typeof json[Object.keys(json)[0]] === 'object') {
    const highlightPathHead = highlightPath.split('.')[0]
    const nextHighlightPath = highlightPath.split('.').slice(1).join('.')
    return Object.keys(json)
    .map((key) =>
      <span key={key}>
        <span>"{key}": {'{'}</span>
        <JsonTree
          json={json[key]}
          spaces={spaces + 2}
          highlightPath={highlightPathHead === key ? nextHighlightPath : ''}
          highlight={highlightPathHead === key}
        />
        <span>{'}'}</span>
      </span>
    )
  } else {
    const key = Object.keys(json)[0]
    return <span className={`JsonTree ${highlight && 'JsonTree-highlight'}`}>"{key}": "{json[key]}"</span>
  }
})

export default JsonTree
