import React, { useState } from 'react'

let list = []
let num = 0
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
    const item = list.find((item) => item.id === id)
    const currentFocusState = item.isFocus
    list.forEach((item) => (item.isFocus = false))
    item.isFocus = !currentFocusState
    let newDummy = { ...dummy }
    setDummy(newDummy)
  }

  return (
    <div className="App">
      <div>
        <div className="text-center">
          <h1 className="text-center text-3xl p-3 text-white bg-blue-800">
            ToDoアプリ
          </h1>
          <form>
            <input
              onChange={handleChange}
              value={item.text}
              className="m-2 p-2 border border-blue-500 w-80"
              type="text"
              placeholder="例：買い物に行く"
            />
            <button
              onClick={registerItem}
              className="bg-blue-200 py-2 px-4 text-blue-500"
            >
              ✙
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
          <ul className="m-4 text-center">
            {list
              .filter((item) => item.isComplete === false)
              .map((item) => (
                <li
                  onClick={() => {
                    setFocus(item.id)
                  }}
                  key={item.id}
                  className={
                    item.isFocus
                      ? 'w-1/2 p-2 mr-2 inline-block border border-blue-300'
                      : 'w-1/2 p-2 mr-2 inline-block border'
                  }
                >
                  <div className="flex justify-evenly">
                    <span className="text-center w-3/4">{item.text}</span>
                    <button
                      id={item.id}
                      className="mx-2"
                      onClick={changeIsCompleted}
                    >
                      ✅
                    </button>
                    <button id={item.id} className="mx-2" onClick={deleteItem}>
                      ✖
                    </button>
                  </div>
                </li>
              ))}
          </ul>
          <h2 className="text-2xl m-2 p-2 text-blue-800">完了</h2>
          <ul className="m-4 text-center">
            {list
              .filter((item) => item.isComplete === true)
              .map((item) => (
                <li
                  key={item.id}
                  className="w-1/2 p-2 mr-2 inline-block border"
                >
                  <div className="flex justify-evenly">
                    <span className="text-center w-3/4">{item.text}</span>
                    <button
                      id={item.id}
                      className="mx-2"
                      onClick={changeIsCompleted}
                    >
                      🔲
                    </button>
                    <button id={item.id} className="mx-2" onClick={deleteItem}>
                      ✖
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
