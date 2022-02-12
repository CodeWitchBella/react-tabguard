const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./app')

const element = React.createElement(App, null)
ReactDOM.render(element, document.getElementById('app'))
