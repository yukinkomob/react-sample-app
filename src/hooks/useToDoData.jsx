import { useState, useCallback } from 'react'
import axios from 'axios'

export const UseToDoData = () => {
  const [webList, setWebList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetch = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      )
      const tempList = result.data
        .filter((item, i) => i < 10)
        .map((item, i) => {
          return {
            id: String(i),
            text: item.title,
            isComplete: false,
            isFocus: false,
          }
        })
      setWebList([...tempList])
    } catch (error) {
      console.log('Error: ' + error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return { webList, isLoading, fetch }
}
