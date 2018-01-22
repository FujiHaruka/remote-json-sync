import {withState, compose} from 'recompose'
import React, { Component } from 'react'
import './App.css'
import JsonTree from './JsonTree'
import io from 'socket.io-client'
import deepAssign from 'deep-assign'

const getSinglePath = (obj) => {
  if (typeof obj !== 'object') {
    throw new Error('Invalid arg')
  }
  let o = obj
  let paths = []
  while (true) {
    const key = Object.keys(o)[0]
    const subObj = o[key]
    paths.push(key)
    if (typeof subObj === 'object') {
      o = subObj
    } else {
      break
    }
  }
  return paths.join('.')
}

const withData = withState('data', 'setData', {})
const withUpdatedPath = withState('updatedPath', 'setUpdatedPath', '')

class App extends Component {
  render () {
    const {data, updatedPath} = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to remote-json-sync</h1>
        </header>
        <div className='App-content'>
          <code>
            <JsonTree json={data} highlightPath={updatedPath} />
          </code>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const {setData, setUpdatedPath} = this.props
    const socket = io('http://localhost:3001')
    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('init', (data) => {
      setData(data)
    })
    socket.on('update', (diff) => {
      const {data} = this.props
      const nextData = deepAssign({}, data, diff)
      setUpdatedPath(getSinglePath(diff))
      setData(nextData)
    })
  }
}

export default compose(
  withData,
  withUpdatedPath
)(App)
