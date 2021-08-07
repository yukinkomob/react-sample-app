import PropTypes from 'prop-types'
import React from 'react'

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

export default DetailInputForm
