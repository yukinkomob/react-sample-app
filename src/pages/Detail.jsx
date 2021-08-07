import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BackToLink from '../components/Detail/BackToLink'
import DetailFormsTable from '../components/Detail/DetailFormsTable'
import DetailTitle from '../components/Detail/DetailTitle'
import Header from '../components/Header'

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
