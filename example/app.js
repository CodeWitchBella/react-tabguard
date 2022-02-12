import React from 'react'
import ReactDOM from 'react-dom-factories'
import createClass from 'create-react-class'
import TabGuard from '../src/tabguard.js'

const { div, h1, p, input, button, select, option, textarea, a, fieldset } =
  ReactDOM

export const App = createClass({
  displayName: 'App',

  getInitialState() {
    return { isHidden: false }
  },

  _handleClick() {
    this.setState({ isHidden: true })
  },

  render() {
    return div(
      null,

      h1(null, 'First form'),

      React.createElement(
        TabGuard,
        null,
        div(
          null,

          !this.state.isHidden
            ? fieldset(
                null,
                input({
                  type: 'text',
                  placeholder: 'Your name',
                })
              )
            : undefined,

          fieldset(
            null,
            input({
              type: 'number',
              placeholder: 'Age',
            })
          ),

          fieldset(
            null,
            textarea({
              placeholder: 'Additional info',
            })
          ),

          fieldset(null, button({ onClick: this._handleClick }, 'Send'))
        )
      ),

      h1(null, 'Second form'),

      React.createElement(
        TabGuard,
        null,
        div(
          null,

          fieldset(
            null,
            input({
              type: 'text',
              placeholder: 'Your name',
            })
          ),

          fieldset(
            null,
            input({
              type: 'number',
              placeholder: 'Age',
            })
          ),

          fieldset(
            null,
            textarea({
              placeholder: 'Additional info',
            })
          ),

          fieldset(null, button(null, 'Send'))
        )
      )
    )
  },
})
