import PropTypes from 'prop-types'
import React, { createContext, useMemo } from 'react'
import { goToDetail } from '../utils/Utils'
import TaskList from './TaskList'

export const GoToFuncs = createContext()

const TaskDisplay = (props) => {
  const {
    list,
    setList,
    inputItem,
    setInputItem,
    changeIsCompleted,
    focusInfo,
    setFocusInfo,
    NullFocusInfo,
  } = props.args

  const uncompletedNum = useMemo(() => {
    if (!list || list.length === 0) {
      return 0
    }
    return list.filter((item) => item.isComplete === false).length
  }, [list])

  const completedNum = useMemo(() => {
    if (!list || list.length === 0) {
      return 0
    }
    return list.filter((item) => item.isComplete === true).length
  }, [list])

  return (
    <div>
      <GoToFuncs.Provider value={goToDetail}>
        <h2 className="text-2xl m-2 p-2 text-blue-800">
          未完了：{uncompletedNum} 件
        </h2>
        <TaskList
          args={{
            list,
            setList,
            inputItem,
            setInputItem,
            changeIsCompleted,
            type: { isComplete: false },
            focusInfo,
            setFocusInfo,
            nullFocusInfo: NullFocusInfo,
          }}
        />
        <h2 className="text-2xl m-2 p-2 text-blue-800">
          完了：{completedNum} 件
        </h2>
        <TaskList
          args={{
            list,
            setList,
            inputItem,
            setInputItem,
            changeIsCompleted,
            type: { isComplete: true },
            focusInfo,
            setFocusInfo,
            nullFocusInfo: NullFocusInfo,
          }}
        />
      </GoToFuncs.Provider>
    </div>
  )
}
TaskDisplay.propTypes = {
  args: PropTypes.object,
}
export default TaskDisplay
