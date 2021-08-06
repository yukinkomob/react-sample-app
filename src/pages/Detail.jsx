import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useLocation, Link } from 'react-router-dom'
import Header from '../components/Header'

const DetailInputForm = (props) => {
  const { title, data, isTextArea } = props.param
  const inputTextForm = (
    <input
      className="p-2 text-center text-xl w-full"
      type="text"
      value={data}
      onChange={(e) => {
        data.title = e.target.value
      }}
    />
  )
  const textAreaForm = (
    <td className="p-4 w-96">
      <textarea
        className="p-2 w-full text-left"
        defaultValue={data}
        onChange={(e) => {
          data.content = e.target.value
        }}
      ></textarea>
    </td>
  )
  const form = isTextArea ? textAreaForm : inputTextForm
  return (
    <tr>
      <td className="p-4 text-xl">{title}</td>
      <td className="p-4">{form}</td>
    </tr>
  )
}

DetailInputForm.propTypes = {
  param: PropTypes.object,
}

const DetailFormsTable = (props) => {
  const data = props.data
  return (
    <table className="m-4 text-center bg-blue-200">
      <tbody>
        <DetailInputForm param={{ title: 'タイトル', data: data.title }} />
        <DetailInputForm param={{ title: 'カテゴリ', data: data.category }} />
        <DetailInputForm
          param={{ title: 'カテゴリ', data: data.content, isTextArea: true }}
        />
        <DetailInputForm param={{ title: '期限', data: data.expiredDate }} />
        <DetailInputForm
          param={{ title: '登録日', data: data.registeredDate }}
        />
      </tbody>
    </table>
  )
}

DetailFormsTable.propTypes = {
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
        <DetailFormsTable data={data} />
      </div>
      <BackToLink />
    </div>
  )
}
export default Detail
