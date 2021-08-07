import React from 'react'
import PropTypes from 'prop-types'

const CompleteButton = (props) => {
  const { id, type, changeIsCompleted } = props.args
  return (
    <button id={id} className="mx-2" onClick={changeIsCompleted}>
      {type.isComplete ? '✅' : '🔲'}
    </button>
  )
}
CompleteButton.propTypes = {
  args: PropTypes.object,
}
export default CompleteButton
