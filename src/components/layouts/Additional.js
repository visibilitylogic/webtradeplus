import React from 'react'

function Additional() {
    return (
        
             <div>
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Add additional page</h4>
                        </div>
                        <div className="actions">
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                          <br />
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                          <br />
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                          <span className="font-size-12">
                            You can choose beetween 'Page icon' and 'Page icon
                            svg' (Page icon is priority) - List icons available
                            here :{" "}
                            <a href="https://linearicons.com/free">
                              https://linearicons.com/free
                            </a>
                          </span>
                          <br />
                          <br />
                          <input
                            type="text"
                            name="text"
                            className="dash-input"
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Add</button>
                      </div>
                    </div>
                    <table style={{ marginTop: 15 }}>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <th>Url</th>
                          <th>Icon</th>
                          <th>SVG Picture</th>
                          <th />
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                
        
    )
}

export default Additional
