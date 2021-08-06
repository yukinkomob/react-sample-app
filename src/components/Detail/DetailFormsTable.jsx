import React from 'react'
import PropTypes from 'prop-types'
import DetailInputForm from './DetailInputForm'

const DetailFormsTable = (props) => {
  const data = props.data
  return (
    <table className="m-4 text-center bg-blue-200">
      <tbody>
        <DetailInputForm param={{ title: 'タイトル', data: data.title }} />
        <DetailInputForm param={{ title: 'カテゴリ', data: data.category }} />
        <DetailInputForm
          param={{ title: '詳細', data: data.content, isTextArea: true }}
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

export default DetailFormsTable
