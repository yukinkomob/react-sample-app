import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import ToggleSwitch from '../../components/ToggleSwitch'
import { UseToDoData } from '../../hooks/useToDoData'

let enabledWebApi = false

const WebListToggleSwitch = (props) => {
  const { loadToDo, setList } = props.args
  const { webList, fetch } = UseToDoData()
  useEffect(() => {
    fetch()
  }, [fetch])

  const switchList = (enabled) => {
    enabledWebApi = enabled
    if (enabled) {
      console.log('sL', webList)
      setList([...webList])
    } else {
      const savedList = loadToDo()
      setList(savedList ? savedList : [])
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-xl p-2 m-2">Web APIでデータ取得</h2>
      <ToggleSwitch switchList={switchList} />
    </div>
  )
}
WebListToggleSwitch.propTypes = {
  args: PropTypes.object,
}
export default WebListToggleSwitch
