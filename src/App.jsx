import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import TaskInputForm from './components/TaskInputForm'
import TaskList from './components/TaskList'

let num = 0
let focusInfo = { id: -1, isFocus: false }

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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App2 />
        </Route>
      </Switch>
    </Router>
  )
}

function App2() {
  const [list, setList] = useState([])

  const [inputItem, setInputItem] = useState({
    id: -1,
    text: '',
    isComplete: false,
    isFocus: false,
  })

  const NullFocusInfo = {
    id: -1,
    isFocus: false,
  }

  const [focusInfo, setFocusInfo] = useState(NullFocusInfo)

  const handleChange = (e) => {
    setInputItem({ ...inputItem, text: e.target.value })
  }

  const getRandomTask = () => {
    const index = Math.floor(Math.random() * randomTask.length)
    return randomTask[index]
  }

  const registerItem = (e) => {
    e.preventDefault()
    let newInputItem = { ...inputItem }
    if (newInputItem.text === '') {
      newInputItem.text = getRandomTask()
    }
    newInputItem.id = num++
    setInputItem(newInputItem)
    list.push(newInputItem)
    setInputItem({ ...inputItem, text: '' })
  }

  const editItem = (e) => {
    e.preventDefault()
    let currentItem = list.find((item) => item.id == focusInfo.id)
    currentItem.text = inputItem.text
    currentItem.isFocus = false
    setFocusInfo(NullFocusInfo)
    setInputItem({ ...inputItem, text: '' })
  }

  const changeIsCompleted = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    const item = list.find((item) => item.id == id)
    item.isComplete = !item.isComplete
    setList([...list])
  }

  const deleteItem = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    setList(list.filter((item) => item.id != id))
  }

  const removeAllFocus = () => {
    list.forEach((item) => (item.isFocus = false))
  }

  const setFocus = (id) => {
    const item = list.find((item) => item.id === id)
    const focusState = item.isFocus
    removeAllFocus()
    item.isFocus = !focusState
    setFocusInfo(item.isFocus ? { id: item.id, isFocus: true } : NullFocusInfo)
    if (focusInfo.isFocus) {
      setInputItem({ ...inputItem, text: item.text })
    } else {
      setInputItem({ ...inputItem, text: '' })
    }
  }

  return (
    <div className="App">
      <div>
        <div className="text-center">
          <Header name={name} />
          <TaskInputForm
            focusInfo={focusInfo}
            item={inputItem}
            handleChange={handleChange}
            editItem={editItem}
            registerItem={registerItem}
          />
        </div>
        <div>
          <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
          <TaskList
            list={list}
            changeIsCompleted={changeIsCompleted}
            deleteItem={deleteItem}
            setFocus={setFocus}
            type={{ isComplete: false }}
          />
          <h2 className="text-2xl m-2 p-2 text-blue-800">完了</h2>
          <TaskList
            list={list}
            changeIsCompleted={changeIsCompleted}
            deleteItem={deleteItem}
            setFocus={setFocus}
            type={{ isComplete: true }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
