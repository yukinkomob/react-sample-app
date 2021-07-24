import React from 'react'
import PropTypes from 'prop-types'

const TaskInputForm = (props) => {
  return (
    <form>
      <input
        onChange={props.handleChange}
        value={props.item.text}
        className={
          props.focusInfo.isFocus
            ? 'm-2 p-2 border border-green-500 w-80'
            : 'm-2 p-2 border border-blue-500 w-80'
        }
        type="text"
        placeholder="例：買い物に行く"
      />
      <button
        onClick={props.focusInfo.isFocus ? props.editItem : props.registerItem}
        className="bg-blue-200 py-2 px-4 text-blue-500"
      >
        {props.focusInfo.isFocus ? 'Save' : '✙'}
      </button>
    </form>
  )
}

TaskInputForm.propTypes = {
  handleChange: PropTypes.func,
  item: PropTypes.object,
  focusInfo: PropTypes.object,
  editItem: PropTypes.object,
  registerItem: PropTypes.object,
}

export default TaskInputForm
