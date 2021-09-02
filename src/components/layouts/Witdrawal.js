import React from 'react'
import WithdrawalModal from './WithdrawalModal'
function Witdrawal(props) {
  console.log(props,'iii')
  return (
    <a
      // onClick={() =>
      //   props.status ? (
      //     <WithdrawalModal withdrawInfo={props} />
      //   ) : null
      // }
    >
      Show details
    </a>
  )
}

export default Witdrawal
