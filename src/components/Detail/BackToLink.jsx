import React from 'react'
import { Link } from 'react-router-dom'

const BackToLink = () => {
  return (
    <div className="m-4 text-lg text-blue-800 cursor-pointer">
      <Link to="/">一覧表示に戻る</Link>
    </div>
  )
}

export default BackToLink
