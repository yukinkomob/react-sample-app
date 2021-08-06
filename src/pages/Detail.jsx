import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLocation, Link } from 'react-router-dom'
import Header from '../components/Header'

const DetailInputForms = (props) => {
  const data = props.data
  return (
    <table className="m-4 text-center bg-blue-200">
      <tbody>
        <tr>
          <td className="p-4 text-xl">Title</td>
          <td className="p-4">
            <input
              className="p-2 text-center text-xl w-full"
              type="text"
              value={data.title}
              onChange={(e) => {
                data.title = e.target.value
              }}
            />
          </td>
        </tr>
        <tr>
          <td className="p-8 text-xl">カテゴリ</td>
          <td className="p-4">
            <input
              className="p-2 text-center text-xl w-full"
              type="text"
              value={data.category}
              onChange={(e) => {
                data.category = e.target.value
              }}
            />
          </td>
        </tr>
        <tr>
          <td className="p-8 text-xl">内容</td>
          <td className="p-4 w-96">
            <textarea
              className="p-2 w-full text-left"
              defaultValue={data.content}
              onChange={(e) => {
                data.content = e.target.value
              }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td className="p-8 text-xl">期限</td>
          <td className="p-4">
            <input
              className="p-2 text-center text-xl w-full"
              type="text"
              value={data.expiredDate}
              onChange={(e) => {
                data.expiredDate = e.target.value
              }}
            />
          </td>
        </tr>
        <tr>
          <td className="p-8 text-xl">登録日</td>
          <td className="p-4">
            <input
              className="p-2 text-center text-xl w-full"
              type="text"
              value={data.registeredDate}
              onChange={(e) => {
                data.registeredDate = e.target.value
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

DetailInputForms.propTypes = {
  data: PropTypes.object,
}

const DetailTitle = (props) => {
  return <h2 className="p-4 text-center text-2xl">ID : {props.id} の内容</h2>
}

DetailTitle.propTypes = {
  id: PropTypes.number,
}

const BackToLink = () => {
  return (
    <div className="m-4 text-lg text-blue-800 cursor-pointer">
      <Link to="/">一覧表示に戻る</Link>
    </div>
  )
}

const Detail = () => {
  const { id } = useParams()
  const location = useLocation()
  const data = location.state.data

  return (
    <div>
      <Header title="ToDoアプリ" />
      <DetailTitle id={id} />
      <div className="flex justify-center">
        <DetailInputForms data={data} />
      </div>
      <BackToLink />
    </div>
  )
}
export default Detail
