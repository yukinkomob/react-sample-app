import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const TaskList = (props) => {
  const deleteItem = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    props.setList(props.list.filter((item) => item.id != id))
  }

  const removeAllFocus = () => {
    props.list.forEach((item) => (item.isFocus = false))
  }

  useEffect(() => {
    const updateInputItem = () => {
      if (props.focusInfo.isFocus) {
        const item = props.list.find((item) => item.id === props.focusInfo.id)
        props.setInputItem({ ...props.inputItem, text: item.text })
      } else {
        props.setInputItem({ ...props.inputItem, text: '' })
      }
    }
    updateInputItem()
  }, [props.focusInfo])

  const setFocus = (id) => {
    const item = props.list.find((item) => item.id === id)
    const isFocusBefore = item.isFocus
    removeAllFocus()
    item.isFocus = !isFocusBefore

    props.setFocusInfo(
      item.isFocus ? { id: item.id, isFocus: true } : props.nullFocusInfo
    )
  }

  return (
    <ul className="m-4 text-center">
      {props.list
        .filter((item) => item.isComplete === props.type.isComplete)
        .map((item) => (
          <li
            onClick={() => {
              setFocus(item.id)
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
              <button id={item.id} className="mx-2" onClick={deleteItem}>
                ✖
              </button>
            </div>
          </li>
        ))}
    </ul>
  )
}

TaskList.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  inputItem: PropTypes.object,
  setInputItem: PropTypes.func,
  changeIsCompleted: PropTypes.func,
  type: PropTypes.object,
  focusInfo: PropTypes.object,
  setFocusInfo: PropTypes.func,
  nullFocusInfo: PropTypes.object,
}

export default TaskList
