const save = (key, data) => {
  const json = JSON.stringify(data)
  localStorage.setItem(key, json)
}

const load = (key) => {
  let getjson
  try {
    getjson = localStorage.getItem(key)
    return JSON.parse(getjson)
  } catch (e) {
    console.log(e.message)
    return []
  }
}

const toDoLabel = 'toDoData'

export const saveToDo = (data) => {
  save(toDoLabel, data)
}

export const loadToDo = () => {
  return load(toDoLabel)
}
