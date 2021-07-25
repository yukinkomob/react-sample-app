import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { LocalStorageFuncs } from '../pages/Main'

const TaskInputForm = (props) => {
  const inputItem = props.inputItem
  const setInputItem = props.setInputItem
  const focusInfo = props.focusInfo
  const setFocusInfo = props.setFocusInfo
  const nullFocusInfo = props.nullFocusInfo
  const num = props.num
  const setNum = props.setNum
  const list = props.list

  const toDoFuncs = useContext(LocalStorageFuncs)

  const handleChange = (e) => {
    setInputItem({ ...inputItem, text: e.target.value })
  }

  const registerItem = (e) => {
    e.preventDefault()
    let newInputItem = { ...inputItem }
    if (newInputItem.text === '') {
      newInputItem.text = getRandomTask()
    }
    setNum(num + 1)
    newInputItem.id = num
    setInputItem(newInputItem)
    list.push(newInputItem)
    setInputItem({ ...inputItem, text: '' })
    toDoFuncs.saveToDo(list)
  }

  const editItem = (e) => {
    e.preventDefault()
    let currentItem = list.find((item) => item.id == focusInfo.id)
    currentItem.text = inputItem.text
    currentItem.isFocus = false
    setFocusInfo(nullFocusInfo)
    setInputItem({ ...inputItem, text: '' })
    toDoFuncs.saveToDo(list)
  }

  const randomTask = [
    '掃除をする',
    '歯を磨く',
    '整理整頓をする',
    '日記を書く',
    'ごみをまとめる',
    '食事をする',
    '課題をやる',
    '学習をする',
    '家計簿をつける',
  ]

  const getRandomTask = () => {
    const index = Math.floor(Math.random() * randomTask.length)
    return randomTask[index]
  }

  return (
    <form>
      <input
        onChange={handleChange}
        value={inputItem.text}
        className={
          focusInfo.isFocus
            ? 'm-2 p-2 border border-green-500 w-80'
            : 'm-2 p-2 border border-blue-500 w-80'
        }
        type="text"
        placeholder="例：買い物に行く"
      />
      <button
        onClick={focusInfo.isFocus ? editItem : registerItem}
        className="bg-blue-200 py-2 px-4 text-blue-500"
      >
        {focusInfo.isFocus ? 'Save' : '✙'}
      </button>
    </form>
  )
}

TaskInputForm.propTypes = {
  inputItem: PropTypes.object,
  setInputItem: PropTypes.func,
  focusInfo: PropTypes.object,
  setFocusInfo: PropTypes.func,
  nullFocusInfo: PropTypes.object,
  num: PropTypes.number,
  setNum: PropTypes.func,
  list: PropTypes.array,
}

export default TaskInputForm
