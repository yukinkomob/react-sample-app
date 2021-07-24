import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()

  return (
    <div>
      temp message <Link to="/">link-{id}</Link>
    </div>
  )
}
export default Detail
