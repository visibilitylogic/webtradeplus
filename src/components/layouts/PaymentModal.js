import React, { useState } from 'react'
import PaymentDetails from '../utils/modals/PaymentDetailsPopOver'

const PaymentModal = (cryptoAddress) => {
  const [state, setstate] = useState(cryptoAddress.status)

  return (
    <a
      onClick={() =>
        cryptoAddress.status ? (
          <PaymentDetails cryptoAddress={cryptoAddress} />
        ) : null
      }
    >
      Show details
    </a>
  )
}
export default PaymentModal
