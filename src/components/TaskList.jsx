import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import { LocalStorageFuncs, ToastFuncs } from '../pages/Main'

const TaskList = (props) => {
  const list = props.list
  const setList = props.setList
  const inputItem = props.inputItem
  const setInputItem = props.setInputItem
  const changeIsCompleted = props.changeIsCompleted
  const type = props.type
  const focusInfo = props.focusInfo
  const setFocusInfo = props.setFocusInfo
  const nullFocusInfo = props.nullFocusInfo

  const toDoFuncs = useContext(LocalStorageFuncs)
  const toastFuncs = useContext(ToastFuncs)

  const deleteItem = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    const delItem = list.find((item) => item.id == id)
    setList(list.filter((item) => item.id != id))
    toDoFuncs.saveToDo(list)
    toastFuncs.showToast('「' + delItem.text + '」を削除しました。', 'success')
  }

  const removeAllFocus = () => {
    list.forEach((item) => (item.isFocus = false))
  }

  const setFocus = (id) => {
    const item = list.find((item) => item.id === id)
    const isFocusBefore = item.isFocus
    removeAllFocus()
    item.isFocus = !isFocusBefore

    setFocusInfo(item.isFocus ? { id: item.id, isFocus: true } : nullFocusInfo)
  }

  useEffect(() => {
    const updateInputItem = () => {
      if (focusInfo.isFocus) {
        const item = list.find((item) => item.id === focusInfo.id)
        setInputItem({ ...inputItem, text: item.text })
      } else {
        setInputItem({ ...inputItem, text: '' })
      }
    }
    updateInputItem()
  }, [focusInfo])

  return (
    <ul className="m-4 text-center">
      {list
        .filter((item) => item.isComplete === type.isComplete)
        .map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            setFocus={setFocus}
            type={type}
            changeIsCompleted={changeIsCompleted}
            deleteItem={deleteItem}
          />
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
