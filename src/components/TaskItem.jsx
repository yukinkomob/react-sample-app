import PropTypes from 'prop-types'
import React, { memo } from 'react'
import CompleteButton from './TaskItem/CompleteButton'
import DeleteButton from './TaskItem/DeleteButton'
import DetailButton from './TaskItem/DetailButton'

const TaskItem = memo((props) => {
  const { item, type, changeIsCompleted, deleteItem, setFocus } = props.args

  return (
    <li
      onClick={() => {
        setFocus(item.id)
      }}
      className={
        'w-1/2 p-2 mr-2 inline-block border ' +
        (item.isFocus ? 'border-blue-300' : '')
      }
    >
      <div className="flex justify-evenly">
        <span className="text-center w-3/4">{item.text}</span>
        <DetailButton args={{ id: item.id }} />
        <CompleteButton args={{ id: item.id, type, changeIsCompleted }} />
        <DeleteButton args={{ id: item.id, deleteItem }} />
      </div>
    </li>
  )
})
TaskItem.displayName = 'TaskItem'

TaskItem.propTypes = {
  args: PropTypes.object,
}

export default TaskItem
