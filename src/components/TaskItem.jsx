import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { GoToFuncs } from '../pages/Main'

const TaskItem = (props) => {
  const item = props.item
  const type = props.type
  const changeIsCompleted = props.changeIsCompleted
  const deleteItem = props.deleteItem
  const setFocus = props.setFocus

  const goToDetail = useContext(GoToFuncs)

  return (
    <li
      onClick={() => {
        setFocus(item.id)
      }}
      className={
        item.isFocus
          ? 'w-1/2 p-2 mr-2 inline-block border border-blue-300'
          : 'w-1/2 p-2 mr-2 inline-block border'
      }
    >
      <div className="flex justify-evenly">
        <span className="text-center w-3/4">{item.text}</span>
        <button
          id={item.id}
          className="mx-2"
          onClick={(e) => goToDetail(e, item.id)}
        >
          📒
        </button>
        <button id={item.id} className="mx-2" onClick={changeIsCompleted}>
          {type.isComplete ? '✅' : '🔲'}
        </button>
        <button id={item.id} className="mx-2" onClick={deleteItem}>
          ✖
        </button>
      </div>
    </li>
  )
}

TaskItem.propTypes = {
  item: PropTypes.object,
  setFocus: PropTypes.func,
  type: PropTypes.object,
  changeIsCompleted: PropTypes.func,
  deleteItem: PropTypes.func,
}

export default TaskItem
