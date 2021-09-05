import { useState, Fragment, useEffect } from 'react'
import ManagerHeader from '../layouts/ManagerHeader'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import './Dashboard.css'
import EditProfile from '../utils/modals/EditProfile'
import ManagerContents from '../layouts/ManagerContents'

const Manager = () => {
  const { user, userId } = useSelector((state) => state.auth)

  const [displayC, setDisplayC] = useState(false)
  const [editProfile, setEditProfile] = useState(false)

  const {
    getAllWithdrawals,
    getAllOrders,
    getAllTrades,
    getAllUsers,
    getAllDeposits,
    getAllVerifiedUsers,
  } = useActions()

  useEffect(() => {
    getAllWithdrawals()
    getAllOrders()
    // getAllUsers()
    getAllDeposits()
    getAllTrades()
    getAllVerifiedUsers()
  }, [])

  useEffect(() => {
    if (user) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/gh/codabae/hostjs/dashUPPER15.js'
      script.async = true

      document.body.appendChild(script)
    }
  }, [])

  return (
    <>
      <div
        className="full-width manager-section"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <ManagerHeader setDisplayC={setDisplayC} />
        <ManagerContents
          displayC={displayC}
          setDisplayC={setDisplayC}
          setEditProfile={setEditProfile}
        />
      </div>
      {editProfile && (
        <section
          className="withdraw-modal-box personal-data-modal"
          style={{ display: 'block' }}
        >
          <EditProfile setEditProfile={setEditProfile} />
        </section>
      )}
    </>
  )
}

export default Manager
