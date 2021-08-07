import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { GoToFuncs } from '../../components/ToDoDisplay'
import { useHistory } from 'react-router-dom'

const DetailButton = (props) => {
  const { id } = props.args
  const goToDetail = useContext(GoToFuncs)
  const history = useHistory()
  return (
    <button
      id={id}
      className="mx-2"
      onClick={(e) => goToDetail(e, id, history)}
    >
      📒
    </button>
  )
}
DetailButton.propTypes = {
  args: PropTypes.object,
}
export default DetailButton
