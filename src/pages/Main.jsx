import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import TaskInputForm from '../components/TaskInputForm'
import TaskList from '../components/TaskList'
import toast, { Toaster } from 'react-hot-toast'

export const GoToFuncs = createContext()
export const LocalStorageFuncs = createContext()
export const ToastFuncs = createContext()

const Main = () => {
  const [num, setNum] = useState(0)
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
    saveToDo(list)
  }

  const sampleData = {
    id: 100,
    title: '掃除をする',
    category: '家事2',
    content:
      '最近溜まっていた部分の掃除をする。掃除には掃除道具を利用して、効率的に進める。２',
    expiredDate: '2022-07-25',
    registeredDate: '2022-07-20',
  }

  const goToDetail = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('gotodetail' + id)
    history.push(`/temp/${id}`, { data: sampleData })
  }

  const toDoLabel = 'toDoData'

  const save = (key, data) => {
    const json = JSON.stringify(data)
    localStorage.setItem(key, json)
  }

  const load = (key) => {
    let getjson
    try {
      getjson = localStorage.getItem(key)
      return JSON.parse(getjson)
    } catch (e) {
      console.log(e.message)
      return []
    }
  }

  const saveToDo = (data) => {
    console.log('saveToDo')
    save(toDoLabel, data)
  }

  const loadToDo = () => {
    console.log('loadToDo')
    return load(toDoLabel)
  }

  const [list, setList] = useState(loadToDo())

  const toDoFuncs = { saveToDo, loadToDo }

  const showToast = (msg, type) => {
    switch (type) {
      case 'success':
        toast.success(msg)
        break
      case 'error':
        toast.error(msg)
        break
      default:
        toast(msg)
        break
    }
  }

  const toastFuncs = { showToast }

  return (
    <div className="App">
      <ToastFuncs.Provider value={toastFuncs}>
        <div>
          <div>
            <Toaster />
          </div>
          <LocalStorageFuncs.Provider value={toDoFuncs}>
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
          </LocalStorageFuncs.Provider>
        </div>
      </ToastFuncs.Provider>
    </div>
  )
}

export default Main
