import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { GoToFuncs } from '../../pages/Main'

const DetailButton = (props) => {
  const { id } = props.args
  const goToDetail = useContext(GoToFuncs)
  return (
    <button id={id} className="mx-2" onClick={(e) => goToDetail(e, id)}>
      📒
    </button>
  )
}
DetailButton.propTypes = {
  args: PropTypes.object,
}
export default DetailButton
