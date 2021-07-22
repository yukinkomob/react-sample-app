import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

function App4() {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="bg-gray-100 border border-blue-500 p-4 w-96"
    >
      <Dialog.Overlay />

      <Dialog.Title className="text-3xl p-4 font-bold">
        Deactivate account
      </Dialog.Title>
      <Dialog.Description className="text-xl p-2">
        This will permanently deactivate your account
      </Dialog.Description>

      <p className="p-2">
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>
      <div className="text-center space-x-10 p-4">
        <button
          className="rounded-lg bg-blue-500 p-3 text-white"
          onClick={() => setIsOpen(false)}
        >
          Deactivate
        </button>
        <button
          className="rounded-lg bg-blue-500 p-3 text-white"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  )
}

export default App4
