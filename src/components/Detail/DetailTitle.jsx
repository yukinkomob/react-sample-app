import PropTypes from 'prop-types'
import React from 'react'

const DetailTitle = (props) => {
  return <h2 className="p-4 text-center text-2xl">ID : {props.id} の内容</h2>
}
DetailTitle.propTypes = {
  id: PropTypes.string,
}

export default DetailTitle
