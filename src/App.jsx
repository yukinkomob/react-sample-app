import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import TaskInputForm from './components/TaskInputForm'
import TaskList from './components/TaskList'

let list = []
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
  const [item, setItem] = useState({
    id: -1,
    text: '',
    isComplete: false,
    isFocus: false,
  })
  const [dummy, setDummy] = useState({ text: '', isComplete: false })

  const handleChange = (e) => {
    setItem({ ...item, text: e.target.value })
  }

  const getRandomTask = () => {
    const index = Math.floor(Math.random() * randomTask.length)
    return randomTask[index]
  }

  const registerItem = (e) => {
    e.preventDefault()
    let newItem = { ...item }
    if (newItem.text === '') {
      newItem.text = getRandomTask()
    }
    newItem.id = num++
    setItem(newItem)
    list.push(newItem)
    setItem({ ...item, text: '' })
  }

  const editItem = (e) => {
    e.preventDefault()
    let currentItem = list.find((item) => item.id == focusInfo.id)
    currentItem.text = item.text
    currentItem.isFocus = false
    focusInfo = { id: -1, isFocus: false }
    setItem({ ...item, text: '' })
  }

  const changeIsCompleted = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    const item = list.find((item) => item.id == id)
    item.isComplete = !item.isComplete
    let newDummy = { ...dummy }
    setDummy(newDummy)
  }

  const deleteItem = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    list = list.filter((item) => item.id != id)
    let newDummy = { ...dummy }
    setDummy(newDummy)
  }

  const setFocus = (id) => {
    const targetItem = list.find((item) => item.id === id)
    const currentFocusState = targetItem.isFocus
    list.forEach((item) => (item.isFocus = false))
    targetItem.isFocus = !currentFocusState
    focusInfo = targetItem.isFocus
      ? { id: targetItem.id, isFocus: true }
      : { id: -1, isFocus: false }
    if (focusInfo.isFocus) {
      setItem({ ...item, text: targetItem.text })
    } else {
      setItem({ ...item, text: '' })
    }
    let newDummy = { ...dummy }
    setDummy(newDummy)
  }

  return (
    <div className="App">
      <div>
        <div className="text-center">
          <Header name={name} />
          <TaskInputForm
            focusInfo={focusInfo}
            item={item}
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
