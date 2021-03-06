import React, {
  useEffect,
  useContext,
  useState,
  memo,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import { LocalStorageFuncs, ToastFuncs, saveToDo } from '../pages/Main'
import { DialogFuncs } from './AlertDialog'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  saveToDo(result)

  return result
}

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
  let list = props.list
  const setList = props.setList
  const inputItem = props.inputItem
  const setInputItem = props.setInputItem
  const changeIsCompleted = props.changeIsCompleted
  const type = props.type
  const focusInfo = props.focusInfo
  const setFocusInfo = props.setFocusInfo
  const nullFocusInfo = props.nullFocusInfo

  const toDoFuncs = useContext(LocalStorageFuncs)
  const toastFuncs = useContext(ToastFuncs)
  const dialogFuncs = useContext(DialogFuncs)

  const [state, setState] = useState(list ? [[...list]] : [])

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
      dialogFuncs.openModal(e, (e) => {
        const id = e.target.id
        const delItem = list.find((item) => item.id === id)
        const newList = list.filter((item) => item.id !== id)
        setList([...newList])
        setState([[...newList]])
        list = newList
        saveToDo(newList)
        toastFuncs.showToast(
          '???' + delItem.text + '???????????????????????????',
          'success'
        )
      })
    },
    [list, dialogFuncs]
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
                                key={item.id}
                                item={item}
                                setFocus={setFocus}
                                type={type}
                                changeIsCompleted={changeIsCompleted}
                                deleteItem={deleteItem}
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
  list: PropTypes.array,
  setList: PropTypes.func,
  inputItem: PropTypes.object,
  setInputItem: PropTypes.func,
  changeIsCompleted: PropTypes.func,
  type: PropTypes.object,
  focusInfo: PropTypes.object,
  setFocusInfo: PropTypes.func,
  nullFocusInfo: PropTypes.object,
}

export default TaskList
