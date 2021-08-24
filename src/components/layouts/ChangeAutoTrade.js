import React, { useState } from 'react'
import Switch from 'react-switch'

function ChangeAutoTrade({ autoTrade }) {
  const [checkButton, setcheckButton] = useState(autoTrade)

  const handleClick = (e) => {
    e.stopPropagation()
    setcheckButton(!checkButton)
  }
  return (
    <Switch
      onChange={handleClick}
      checked={checkButton}
      className="react-switch"
      onColor="#54AC40"
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#000000"
      //   key={row.id}
      //   id={row.id}
    />
  )
}
export default ChangeAutoTrade
