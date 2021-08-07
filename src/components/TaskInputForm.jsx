import React, { useContext, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { LocalStorageFuncs, ToastFuncs } from '../pages/Main'

const TaskInputForm = memo((props) => {
  const {
    focusInfo,
    setFocusInfo,
    nullFocusInfo,
    inputItem,
    setInputItem,
    num,
    setNum,
    list,
    setList,
  } = props.data

  const { saveToDo } = useContext(LocalStorageFuncs)
  const showToast = useContext(ToastFuncs)

  const handleChange = useCallback(
    (e) => {
      setInputItem({ ...inputItem, text: e.target.value })
    },
    [inputItem]
  )

  const getLastId = useCallback(() => {
    if (!list || list?.length === 0) {
      return -1
    }
    const ids = list.map((item) => parseInt(item.id))
    let maxId = ids.reduce((accum, id) => {
      return Math.max(accum, parseInt(id))
    }, 0)
    return maxId
  }, [list])

  const registerItem = useCallback(
    (e) => {
      e.preventDefault()
      let newInputItem = { ...inputItem }
      if (newInputItem.text === '') {
        newInputItem.text = getRandomTask()
      }

      const newId = String(getLastId() + 1)
      setNum(newId)
      newInputItem.id = newId
      setInputItem(newInputItem)
      list.push(newInputItem)
      setInputItem({ ...inputItem, text: '' })
      saveToDo(list)
      showToast('「' + newInputItem.text + '」を追加しました。', 'success')
      setList([...list])
    },
    [inputItem, list]
  )

  const editItem = useCallback(
    (e) => {
      e.preventDefault()
      let currentItem = list.find((item) => item.id == focusInfo.id)
      currentItem.text = inputItem.text
      currentItem.isFocus = false
      setFocusInfo(nullFocusInfo)
      setInputItem({ ...inputItem, text: '' })
      saveToDo(list)
      showToast('「' + currentItem.text + '」に更新しました。', 'success')
    },
    [list, focusInfo, inputItem]
  )

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
})
TaskInputForm.displayName = 'TaskInputForm'

TaskInputForm.propTypes = {
  data: PropTypes.object,
}

export default TaskInputForm
