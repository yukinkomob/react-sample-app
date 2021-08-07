import PropTypes from 'prop-types'
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { LocalStorageFuncs, ToastFuncs } from '../pages/Main'
import { DialogFuncs } from './AlertDialog'
import TaskItem from './TaskItem'

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const TaskList = memo((props) => {
  const {
    setList,
    inputItem,
    setInputItem,
    changeIsCompleted,
    type,
    focusInfo,
    setFocusInfo,
    nullFocusInfo,
  } = props.args
  let { list } = props.args

  const showToast = useContext(ToastFuncs)
  const openModal = useContext(DialogFuncs)

  const [state, setState] = useState(list ? [[...list]] : [])

  const { saveToDo } = useContext(LocalStorageFuncs)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    saveToDo(result)
    return result
  }

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result

      // dropped outside the list
      if (!destination) {
        return
      }
      const sInd = +source.droppableId
      const dInd = +destination.droppableId

      if (sInd === dInd) {
        const items = reorder(state[sInd], source.index, destination.index)
        const newState = [...state]
        newState[sInd] = items
        setState(newState)
      } else {
        const result = move(state[sInd], state[dInd], source, destination)
        const newState = [...state]
        newState[sInd] = result[sInd]
        newState[dInd] = result[dInd]

        setState(newState.filter((group) => group.length))
      }
    },
    [state]
  )

  const deleteItem = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      openModal(e, (e) => {
        const id = e.target.id
        const delItem = list.find((item) => item.id === id)
        const newList = list.filter((item) => item.id !== id)
        setList([...newList])
        setState([[...newList]])
        list = newList
        saveToDo(newList)
        showToast('「' + delItem.text + '」を削除しました。', 'success')
      })
    },
    [list, openModal]
  )

  const removeAllFocus = useCallback(() => {
    list.forEach((item) => (item.isFocus = false))
  }, [list])

  const setFocus = useCallback(
    (id) => {
      const item = list.find((item) => item.id === id)
      const isFocusBefore = item.isFocus
      removeAllFocus()
      item.isFocus = !isFocusBefore

      setFocusInfo(
        item.isFocus ? { id: item.id, isFocus: true } : nullFocusInfo
      )
    },
    [list]
  )

  useEffect(() => {
    setState(list ? [[...list]] : [])
  }, [list])

  useEffect(() => {
    const updateInputItem = () => {
      if (focusInfo.isFocus) {
        const item = list.find((item) => item.id === focusInfo.id)
        setInputItem({ ...inputItem, text: item.text })
      } else {
        setInputItem({ ...inputItem, text: '' })
      }
    }
    updateInputItem()
  }, [focusInfo])

  return (
    <div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <ul className="m-4 text-center">
            {state.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {el
                      .filter((item) => item.isComplete === type.isComplete)
                      ?.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem
                                args={{
                                  key: item.id,
                                  item,
                                  setFocus,
                                  type,
                                  changeIsCompleted,
                                  deleteItem,
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </ul>
        </DragDropContext>
      </div>
    </div>
  )
})
TaskList.displayName = 'TaskList'

TaskList.propTypes = {
  args: PropTypes.object,
}

export default TaskList
