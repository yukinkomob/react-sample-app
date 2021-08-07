import { Switch } from '@headlessui/react'
import PropTypes from 'prop-types'
import React, { memo, useEffect, useState } from 'react'

const ToggleSwitch = memo((props) => {
  const [enabled, setEnabled] = useState(false)
  const switchList = props.switchList

  useEffect(() => {
    switchList(enabled)
  }, [enabled])

  return (
    <div>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-blue-900' : 'bg-blue-700'}
          w-20 h-10 relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-10' : 'translate-x-0'}
            w-9 h-9 pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
})
ToggleSwitch.displayName = 'ToggleSwitch'

ToggleSwitch.propTypes = {
  switchList: PropTypes.func,
}

export default ToggleSwitch
