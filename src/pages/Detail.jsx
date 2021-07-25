import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()
  const location = useLocation()
  const test = location.state.test

  return (
    <div>
      <p>t:{test}</p>
      <h2>ID : {id} の内容</h2>
      <h3>掃除をする</h3>
      <h3>(カテゴリ)</h3>
      <p className="w-48 break-words">
        asdfssssssssssssssssssssssssssssssssssssssdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfaafasdfasdfa
      </p>
      <p>期限：</p>
      <p>登録日：</p>
      <div>
        temp message <Link to="/">link-{id}</Link>
      </div>
    </div>
  )
}
export default Detail
