import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'
import { LocalStorageFuncs, ToastFuncs } from '../pages/Main'
import { DialogFuncs } from './AlertDialog'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

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
const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
})
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

const TaskList = (props) => {
  const list = props.list
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

  const [state, setState] = useState([
    [
      {
        id: '1',
        content: 'item 0',
        isComplete: false,
        isFocus: false,
        text: '掃除をする',
      },
      {
        id: '2',
        content: 'item 1',
        isComplete: false,
        isFocus: false,
        text: '食事をする',
      },
      // {
      //   id: 'item-2-1627328384301',
      //   content: 'item 2',
      //   isComplete: false,
      //   isFocus: false,
      //   text: '片付けをする',
      // },
      // {
      //   id: 'item-3-1627328384301',
      //   content: 'item 3',
      //   isComplete: false,
      //   isFocus: false,
      //   text: '勉強をする',
      // },
    ],
  ])
  // const [state, setState] = useState([list])
  // const [state, setState] = useState([getItems(5)])
  console.log(state)

  function onDragEnd(result) {
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
  }

  const deleteItem = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dialogFuncs.openModal(e, (e) => {
      const id = e.target.id
      const delItem = list.find((item) => item.id == id)
      setList(list.filter((item) => item.id != id))
      toDoFuncs.saveToDo(list)
      toastFuncs.showToast(
        '「' + delItem.text + '」を削除しました。',
        'success'
      )
    })
  }

  const removeAllFocus = () => {
    list.forEach((item) => (item.isFocus = false))
  }

  const setFocus = (id) => {
    const item = list.find((item) => item.id === id)
    const isFocusBefore = item.isFocus
    removeAllFocus()
    item.isFocus = !isFocusBefore

    setFocusInfo(item.isFocus ? { id: item.id, isFocus: true } : nullFocusInfo)
  }

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
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <ul className="m-4 text-center">
            {state.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {el
                      // .filter((item) => item.isComplete === type.isComplete)
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
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.text}
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
}

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
