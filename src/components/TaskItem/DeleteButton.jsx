import React from 'react'
import PropTypes from 'prop-types'

const DeleteButton = (props) => {
  const { id, deleteItem } = props.args
  return (
    <button id={id} className="mx-2" onClick={deleteItem}>
      ✖
    </button>
  )
}
DeleteButton.propTypes = {
  args: PropTypes.object,
}
export default DeleteButton
