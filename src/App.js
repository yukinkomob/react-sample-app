import React, { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const handleChange = (e) => {
    setText(() => e.target.value)
  }
  const onClickRegisterBtn = () => {
    console.log(text)
  }

  return (
    <div className="App">
      <div>
        <div className="text-center">
          <h1 className="text-center text-3xl p-3 text-white bg-blue-800">
            ToDoアプリ
          </h1>
          <input
            value={text}
            onChange={handleChange}
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
        </div>
        <div>
          <h2 className="text-2xl m-2 p-2 text-blue-800">未完了</h2>
          <ul className="m-4 text-center">
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
