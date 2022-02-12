const React = require('react')
const ReactDOM = require('react-dom-factories')
const createClass = require('create-react-class')

const TabGuard = React.createFactory(require('../src/'))

const { div, h1, p, input, button, select, option, textarea, a, fieldset } =
  ReactDOM

module.exports = createClass({
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

      TabGuard(
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

      TabGuard(
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
