import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import BackToLink from '../components/Detail/BackToLink'
import DetailTitle from '../components/Detail/DetailTitle'
import DetailFormsTable from '../components/Detail/DetailFormsTable'

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
