import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import TaskInputForm from '../components/TaskInputForm'
import TaskList from '../components/TaskList'

export const GoToFuncs = createContext()

const Main = () => {
  const [num, setNum] = useState(0)
  const [list, setList] = useState([])
  const [inputItem, setInputItem] = useState({
    id: -1,
    text: '',
    isComplete: false,
    isFocus: false,
  })

  const history = useHistory()

  const NullFocusInfo = {
    id: -1,
    isFocus: false,
  }

  const [focusInfo, setFocusInfo] = useState(NullFocusInfo)

  const changeIsCompleted = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const item = list.find((item) => item.id == e.target.id)
    item.isComplete = !item.isComplete
    setList([...list])
  }

  const goToDetail = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('gotodetail' + id)
    history.push(`/temp/${id}`)
  }

  return (
    <div className="App">
      <div>
        <div className="text-center">
          <Header title={'ToDoアプリ'} />
          <TaskInputForm
            focusInfo={focusInfo}
            setFocusInfo={setFocusInfo}
            nullFocusInfo={NullFocusInfo}
            inputItem={inputItem}
            setInputItem={setInputItem}
            num={num}
            setNum={setNum}
            list={list}
          />
        </div>
        <div>
          <GoToFuncs.Provider value={goToDetail}>
            <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
            <TaskList
              list={list}
              setList={setList}
              inputItem={inputItem}
              setInputItem={setInputItem}
              changeIsCompleted={changeIsCompleted}
              type={{ isComplete: false }}
              focusInfo={focusInfo}
              setFocusInfo={setFocusInfo}
              nullFocusInfo={NullFocusInfo}
            />
            <h2 className="text-2xl m-2 p-2 text-blue-800">完了</h2>
            <TaskList
              list={list}
              setList={setList}
              inputItem={inputItem}
              setInputItem={setInputItem}
              changeIsCompleted={changeIsCompleted}
              type={{ isComplete: true }}
              focusInfo={focusInfo}
              setFocusInfo={setFocusInfo}
              nullFocusInfo={NullFocusInfo}
            />
          </GoToFuncs.Provider>
        </div>
      </div>
    </div>
  )
}

export default Main
