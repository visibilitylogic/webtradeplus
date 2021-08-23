import React from 'react'
import {  useParams } from 'react-router'
function AdminDashboard() { 
    return (
        <div className="dash-row">
        <div className="users card">
          <div className="heading">
            <span className="text-uppercase font-size-11">Users</span>
          </div>
          <h2 className="number">{26}</h2>
          <div className="hr" />
        </div>
        <div className="sessions card">
          <div className="heading">
            <span className="text-uppercase font-size-11">Sessions</span>
          </div>
          <h2 className="number">654</h2>
          <div className="hr" />
        </div>
        <div className="actions-to-manage card">
          <div className="heading">
            <span className="text-uppercase font-size-14 font-weight-bold">
              Actions to manage
            </span>
          </div>
          <div className="hr" />
        </div>
        <div className="cron-status card">
          <div className="heading">
            <span className="text-uppercase font-size-14 font-weight-bold">
              Cron status
            </span>
          </div>
        </div>
        <div className="users-by-country card">
          <div className="heading">
            <span className="text-uppercase font-size-14 font-weight-bold">
              Users by country
            </span>
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard
