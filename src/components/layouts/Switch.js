import React from 'react'
import Switch from 'react-switch'
const SwitchBtn = ({ onChange, checked }) => {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      className="react-switch"
      onColor="#54AC40"
      uncheckedIcon={false}
      checkedIcon={false}
      offColor="#F14700"
    />
  )
}
export default SwitchBtn
