import React, { useState, useEffect } from 'react'

const list = []
const numlist = [1, 2, 3]

function App() {
  const [item, setItem] = useState({ text: '', isComplete: false })
  const [dummy, setDummy] = useState({ text: '', isComplete: false })

  const handleChange = (e) => {
    setItem({ ...item, text: e.target.value })
    console.log('レンダリング handleChange')
  }

  const onClickRegisterBtn = (e) => {
    e.preventDefault()
    let newItem = { ...item }
    setItem(newItem)
    list.push(item)
    console.log(list)
    console.log('レンダリング onClickRegisterBtn')
    e.target.value = ''
  }

  console.log('レンダリングApp')

  return (
    <div className="App">
      {console.log('レンダリングHTML')}
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
              onClick={onClickRegisterBtn}
              className="bg-blue-200 py-2 px-4 text-blue-500"
            >
              ✙
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
          <ul className="m-4 text-center">
            {console.log('レンダリングHTML2 size=' + list.length)}
            {/* {list[0]?.text} */}
            {list.map((item, index) => (
              // console.log('レンダリングHTML3')
              <li key={index}>{item.text}</li>
            ))}
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">掃除をする</span>
                <button className="mx-2">✅</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">整理整頓をする</span>
                <button className="mx-2">✅</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">
                  スケジュールを更新する
                </span>
                <button className="mx-2">✅</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
          </ul>
          <h2 className="text-2xl m-2 p-2 text-blue-800">完了</h2>
          <ul className="m-4 text-center">
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">メモの整理</span>
                <button className="mx-2">🔲</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">家計簿をつける</span>
                <button className="mx-2">🔲</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
            <li className="w-1/2 p-2 mr-2 inline-block border">
              <div className="flex justify-evenly">
                <span className="text-center w-3/4">父に連絡する</span>
                <button className="mx-2">🔲</button>
                <button className="mx-2">✖</button>
              </div>
            </li>
            <br />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
