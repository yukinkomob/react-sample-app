import { useCallback } from 'react'
import { sampleData } from './SampleData'
import toast from 'react-hot-toast'

export const goToDetail = (e, id, history) => {
  e.preventDefault()
  e.stopPropagation()
  history.push(`/temp/${id}`, { data: sampleData })
}

export const showToast = (msg, type) => {
  switch (type) {
    case 'success':
      toast.success(msg)
      break
    case 'error':
      toast.error(msg)
      break
    default:
      toast(msg)
      break
  }
}
