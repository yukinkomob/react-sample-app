import React from 'react'
import PropTypes from 'prop-types'

const TaskList = (props) => {
  return (
    <ul className="m-4 text-center">
      {props.list
        .filter((item) => item.isComplete === props.type.isComplete)
        .map((item) => (
          <li
            onClick={() => {
              props.setFocus(item.id)
            }}
            key={item.id}
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
                onClick={props.changeIsCompleted}
              >
                {props.type.isComplete ? '✅' : '🔲'}
              </button>
              <button id={item.id} className="mx-2" onClick={props.deleteItem}>
                ✖
              </button>
            </div>
          </li>
        ))}
    </ul>
  )
}

TaskList.propTypes = {
  list: PropTypes.object,
  changeIsCompleted: PropTypes.func,
  deleteItem: PropTypes.func,
  setFocus: PropTypes.func,
  type: PropTypes.object,
}

export default TaskList
