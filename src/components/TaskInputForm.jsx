import React from 'react'
import PropTypes from 'prop-types'

const TaskInputForm = (props) => {
  const handleChange = (e) => {
    props.setInputItem({ ...props.inputItem, text: e.target.value })
  }

  const registerItem = (e) => {
    e.preventDefault()
    let newInputItem = { ...props.inputItem }
    if (newInputItem.text === '') {
      newInputItem.text = getRandomTask()
    }
    props.setNum(props.num + 1)
    newInputItem.id = props.num
    props.setInputItem(newInputItem)
    props.list.push(newInputItem)
    props.setInputItem({ ...props.inputItem, text: '' })
  }

  const editItem = (e) => {
    e.preventDefault()
    let currentItem = props.list.find((item) => item.id == props.focusInfo.id)
    currentItem.text = props.inputItem.text
    currentItem.isFocus = false
    props.setFocusInfo(props.nullFocusInfo)
    props.setInputItem({ ...props.inputItem, text: '' })
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
        value={props.inputItem.text}
        className={
          props.focusInfo.isFocus
            ? 'm-2 p-2 border border-green-500 w-80'
            : 'm-2 p-2 border border-blue-500 w-80'
        }
        type="text"
        placeholder="例：買い物に行く"
      />
      <button
        onClick={props.focusInfo.isFocus ? editItem : registerItem}
        className="bg-blue-200 py-2 px-4 text-blue-500"
      >
        {props.focusInfo.isFocus ? 'Save' : '✙'}
      </button>
    </form>
  )
}

TaskInputForm.propTypes = {
  inputItem: PropTypes.object,
  setInputItem: PropTypes.func,
  focusInfo: PropTypes.object,
  setFocusInfo: PropTypes.func,
  num: PropTypes.number,
  setNum: PropTypes.func,
  list: PropTypes.object,
  nullFocusInfo: PropTypes.object,
}

export default TaskInputForm
