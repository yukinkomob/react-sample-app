import React, { useState, createContext, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import TaskInputForm from '../components/TaskInputForm'
import TaskList from '../components/TaskList'
import toast, { Toaster } from 'react-hot-toast'
import AlertDialog, {
  openModal,
  closeModal,
  DialogFuncs,
} from '../components/AlertDialog'
import ToggleSwitch from '../components/ToggleSwitch'
import axios from 'axios'

export const GoToFuncs = createContext()
export const LocalStorageFuncs = createContext()
export const ToastFuncs = createContext()

const toDoLabel = 'toDoData'

let enabledWebApi = false

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

export const saveToDo = (data) => {
  save(toDoLabel, data)
}

const loadToDo = () => {
  return load(toDoLabel)
}

const requestToDoList = async () => {
  return await axios.get('https://jsonplaceholder.typicode.com/todos')
}

let webList = []

const getListByApi = () => {
  requestToDoList()
    .then((res) => {
      const tempList = res.data
        .filter((item, i) => i < 10)
        .map((item, i) => {
          return {
            id: String(i),
            text: item.title,
            isComplete: false,
            isFocus: false,
          }
        })
      webList = [...tempList]
    })
    .catch((e) => {
      console.log('Error: ' + e)
    })
}
getListByApi()

const Main = () => {
  const tempList = enabledWebApi ? [...webList] : loadToDo() ?? []
  const [list, setList] = useState(tempList ? [...tempList] : [])
  const [num, setNum] = useState('0')
  const [inputItem, setInputItem] = useState({
    id: -1,
    text: '',
    isComplete: false,
    isFocus: false,
  })

  const uncompleted_num = useMemo(() => {
    if (!list || list.length === 0) {
      return 0
    }
    return list.filter((item) => item.isComplete === false).length
  }, [list])
  const completed_num = useMemo(() => {
    if (!list || list.length === 0) {
      return 0
    }
    return list.filter((item) => item.isComplete === true).length
  }, [list])

  const history = useHistory()

  const NullFocusInfo = {
    id: -1,
    isFocus: false,
  }

  const [focusInfo, setFocusInfo] = useState(NullFocusInfo)

  const changeIsCompleted = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      const item = list.find((item) => item.id == e.target.id)
      item.isComplete = !item.isComplete
      setList([...list])
      saveToDo(list)
    },
    [list]
  )

  const sampleData = {
    id: 100,
    title: '???????????????',
    category: '??????2',
    content:
      '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
    expiredDate: '2022-07-25',
    registeredDate: '2022-07-20',
  }

  const goToDetail = useCallback(
    (e, id) => {
      e.preventDefault()
      e.stopPropagation()
      history.push(`/temp/${id}`, { data: sampleData })
    },
    [sampleData]
  )

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

  const switchList = (enabled) => {
    enabledWebApi = enabled
    if (enabled) {
      setList([...webList])
    } else {
      const savedList = loadToDo()
      setList(savedList ? savedList : [])
    }
  }

  const toastFuncs = { showToast }

  const dialogFuncs = { openModal }

  return (
    <div className="App">
      <DialogFuncs.Provider value={dialogFuncs}>
        <ToastFuncs.Provider value={toastFuncs}>
          <div>
            <div>
              <Toaster />
            </div>
            <AlertDialog />
            <LocalStorageFuncs.Provider value={toDoFuncs}>
              <div className="text-center">
                <Header title={'ToDo?????????'} />
                <TaskInputForm
                  focusInfo={focusInfo}
                  setFocusInfo={setFocusInfo}
                  nullFocusInfo={NullFocusInfo}
                  inputItem={inputItem}
                  setInputItem={setInputItem}
                  num={num}
                  setNum={setNum}
                  list={list}
                  setList={setList}
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl p-2 m-2">Web API??????????????????</h2>
                <ToggleSwitch switchList={switchList} />
              </div>
              <div>
                <GoToFuncs.Provider value={goToDetail}>
                  <h2 className="text-2xl m-2 p-2 text-blue-800">
                    ????????????{uncompleted_num} ???
                  </h2>
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
                  <h2 className="text-2xl m-2 p-2 text-blue-800">
                    ?????????{completed_num} ???
                  </h2>
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
      </DialogFuncs.Provider>
    </div>
  )
}

export default Main
