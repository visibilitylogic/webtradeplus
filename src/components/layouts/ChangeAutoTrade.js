import React, { useState } from 'react'
import Switch from 'react-switch'

const ChangeAutoTrade = ({ autoTrade }) => {
  const [checkButton, setcheckButton] = useState(autoTrade.autoTrade)

  const handleClick = () => {
    setcheckButton(!checkButton)
  }
  console.log(checkButton)
  return (
    <Switch
      onChange={handleClick}
      checked={checkButton}
      className="react-switch"
      onColor="#54AC40"
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#000000"
    />
  )
}
export default ChangeAutoTrade
