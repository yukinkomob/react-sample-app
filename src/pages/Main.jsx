import React, { useState, createContext, useCallback, useMemo } from 'react'
import Header from '../components/Header'
import TaskInputForm from '../components/TaskInputForm'
import { Toaster } from 'react-hot-toast'
import AlertDialog, { DialogFuncs, openModal } from '../components/AlertDialog'
import WebListToggleSwitch from '../components/Main/WebListToggleSwitch'
import { saveToDo, loadToDo } from '../utils/LocalStorage'
import { NullFocusInfo } from '../utils/NullData'
import { showToast } from '../utils/Utils'
import ToDoDisplay from '../components/ToDoDisplay'

export const LocalStorageFuncs = createContext()
export const ToastFuncs = createContext()

const Main = () => {
  const tempList = loadToDo() ?? []
  const [list, setList] = useState(tempList ? [...tempList] : [])
  const [num, setNum] = useState('0')
  const [inputItem, setInputItem] = useState({
    id: -1,
    text: '',
    isComplete: false,
    isFocus: false,
  })

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
              <WebListToggleSwitch args={{ loadToDo, setList }} />
              <ToDoDisplay
                args={{
                  list,
                  setList,
                  inputItem,
                  setInputItem,
                  changeIsCompleted,
                  focusInfo,
                  setFocusInfo,
                  NullFocusInfo,
                }}
              />
            </LocalStorageFuncs.Provider>
          </div>
        </ToastFuncs.Provider>
      </DialogFuncs.Provider>
    </div>
  )
}

export default Main
