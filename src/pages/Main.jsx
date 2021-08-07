import React, { useState, createContext, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import TaskInputForm from '../components/TaskInputForm'
import TaskList from '../components/TaskList'
import toast, { Toaster } from 'react-hot-toast'
import AlertDialog, { DialogFuncs, openModal } from '../components/AlertDialog'
import ToggleSwitch from '../components/ToggleSwitch'
import { UseToDoData } from '../hooks/useToDoData'
import { useEffect } from 'react'

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

const saveToDo = (data) => {
  save(toDoLabel, data)
}

const loadToDo = () => {
  return load(toDoLabel)
}

const Main = () => {
  const { webList, isLoading, fetch } = UseToDoData()
  useEffect(() => {
    fetch()
  }, [fetch])
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
    title: '掃除をする',
    category: '家事2',
    content:
      '最近溜まっていた部分の掃除をする。掃除には掃除道具を利用して、効率的に進める。２',
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
      console.log('sL', webList)
      setList([...webList])
    } else {
      const savedList = loadToDo()
      setList(savedList ? savedList : [])
    }
  }

  return (
    <div className="App">
      <DialogFuncs.Provider value={openModal}>
        <ToastFuncs.Provider value={showToast}>
          <div>
            <div>
              <Toaster />
            </div>
            <AlertDialog
              data={{
                title: '確認',
                text: '選択した ToDo 項目を削除しても良いですか？',
                ok: 'OK',
                cancel: 'Cancel',
              }}
            />
            <LocalStorageFuncs.Provider value={{ saveToDo, loadToDo }}>
              <div className="text-center">
                <Header title={'ToDoアプリ'} />
                <TaskInputForm
                  data={{
                    focusInfo,
                    setFocusInfo,
                    nullFocusInfo: NullFocusInfo,
                    inputItem,
                    setInputItem,
                    num,
                    setNum,
                    list,
                    setList,
                  }}
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl p-2 m-2">Web APIでデータ取得</h2>
                <ToggleSwitch switchList={switchList} />
              </div>
              <div>
                <GoToFuncs.Provider value={goToDetail}>
                  <h2 className="text-2xl m-2 p-2 text-blue-800">
                    未完了：{uncompleted_num} 件
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
                    完了：{completed_num} 件
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
