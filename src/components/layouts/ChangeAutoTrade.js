import React from 'react'
import Switch from 'react-switch'

const ChangeAutoTrade = ({ autoTrade }) => {
  return (
    <Switch
      checked={autoTrade.autoTrade}
      className="react-switch"
      onChange={() => console.log(123)}
      onColor="#54AC40"
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#000000"
    />
  )
}
export default ChangeAutoTrade
