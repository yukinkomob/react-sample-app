import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import TaskInputForm from './components/TaskInputForm'
import TaskList from './components/TaskList'

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
  const [num, setNum] = useState(0)

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

  const changeIsCompleted = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const id = e.target.id
    const item = list.find((item) => item.id == id)
    item.isComplete = !item.isComplete
    setList([...list])
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
            setFocusInfo={setFocusInfo}
            inputItem={inputItem}
            setInputItem={setInputItem}
            num={num}
            setNum={setNum}
            list={list}
            nullFocusInfo={NullFocusInfo}
          />
        </div>
        <div>
          <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
          <TaskList
            list={list}
            setList={setList}
            changeIsCompleted={changeIsCompleted}
            setFocus={setFocus}
            type={{ isComplete: false }}
          />
          <h2 className="text-2xl m-2 p-2 text-blue-800">完了</h2>
          <TaskList
            list={list}
            setList={setList}
            changeIsCompleted={changeIsCompleted}
            setFocus={setFocus}
            type={{ isComplete: true }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
