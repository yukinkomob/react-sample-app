import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {
  const title = props.title

  return (
    <h1 className="text-center text-3xl p-3 text-white bg-blue-800">
      {props.title}
    </h1>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
