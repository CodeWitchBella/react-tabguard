import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createClass from 'create-react-class'

const focusableElementsList = [
  'a[href]',
  'button:not([disabled])',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '*[tabindex]',
  '*[contenteditable]',
]

const focusableElementsSelector = focusableElementsList.join()

const TabGuard = createClass({
  displayName: 'TabGuard',

  propTypes: {
    className: PropTypes.string,
  },

  componentDidMount() {
    this._registerTabGuard()
  },

  componentDidUpdate() {
    this._registerTabGuard()
  },

  componentWillUpdate() {
    this._removeListeners()
  },

  componentWillUnmount() {
    this._removeListeners()
  },

  _firstElement: null,

  _lastElement: null,

  _registerTabGuard() {
    const parentNode = ReactDOM.findDOMNode(this)

    const elements = Array.from(
      parentNode.querySelectorAll(focusableElementsSelector)
    )
    const focusableElements = elements.filter(this._filterFocusableElements)

    // NOTE: if there are not any focusable elements return null
    if (!focusableElements?.length) {
      return null
    }

    this._firstElement = focusableElements[0]
    this._lastElement = focusableElements[focusableElements.length - 1]

    this._firstElement.addEventListener('keydown', this._handleFirstElement)
    this._lastElement.addEventListener('keydown', this._handleLastElement)
  },

  _isTabKeyEvent(event) {
    const tabCharCode = 9
    const result = event.keyCode === tabCharCode ? true : false
    return result
  },

  _filterFocusableElements(element) {
    const isVisible =
      element.style.display !== 'none' && element.style.visibility !== 'hidden'
    const isNonNegativeTabIndex = element.getAttribute('tabindex') !== '-1'

    return isVisible && isNonNegativeTabIndex
  },

  _handleFirstElement(event) {
    if (event.shiftKey && this._isTabKeyEvent(event)) {
      event.preventDefault()
      this._lastElement.focus()
    }
  },

  _handleLastElement(event) {
    if (!event.shiftKey && this._isTabKeyEvent(event)) {
      event.preventDefault()
      this._firstElement.focus()
    }
  },

  _removeListeners() {
    this._firstElement?.removeEventListener('keydown', this._handleFirstElement)
    this._lastElement?.removeEventListener('keydown', this._handleLastElement)
  },

  render() {
    return React.createElement('div', {
      className: this.props.className,
      children: this.props.children,
    })
  },
})

export default TabGuard
