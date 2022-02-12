import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

const element = React.createElement(App, null)
ReactDOM.render(element, document.getElementById('app'))
