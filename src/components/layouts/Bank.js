import React from 'react'

function Bank() {
    return (
        <div>
             <div>
                    {/* Add new bank account */}
                    <h3 className="font-weight-normal">Add new bank account</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account name</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account currency</h4>
                          <p>* This is optional</p>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="---">---</option>
                            <option value="ALL">ALL</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account IBAN</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account BIC/SWIFT</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account address</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Bank account owner name</h4>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="save-btn">
                      <button className="dash-success-btn">Add New</button>
                    </div>
                  </div>
                
        </div>
    )
}

export default Bank
