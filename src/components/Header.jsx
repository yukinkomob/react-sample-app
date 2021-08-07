import PropTypes from 'prop-types'
import React, { memo } from 'react'

const Header = memo((props) => {
  return (
    <h1 className="text-center text-3xl p-3 text-white bg-blue-800">
      {props.title}
    </h1>
  )
})
Header.displayName = 'Header'

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
