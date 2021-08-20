import React from 'react';
import Img from "../../assets/images/1.jpg"

function Search() {
    return (
        <div>
             <div>
                    {/* General appearance */}
                    <h3 className="font-weight-normal">General appearance</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Your main color</h4>
                          <p>You need to refresh the page after change</p>
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
                          <h4>Menu type</h4>
                          <p>You need to refresh the page after change</p>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="Left, vertical">
                              Left, vertical
                            </option>
                            <option value="Top, horizontal">
                              Top, horizontal
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Chart configuration */}
                    <h3 className="font-weight-normal">Chart configuration</h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Default type graph</h4>
                        </div>
                        <div className="actions">
                          <select className="dash-select-short">
                            <option value="Candlestick">Candlestick</option>
                            <option value="Line">Line</option>
                          </select>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Candlestick positive color</h4>
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
                          <h4>Candlestick negative color</h4>
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
                          <h4>Line color</h4>
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
                          <h4>Volume upper color</h4>
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
                          <h4>Volume lower color</h4>
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
                          <h4>Volume bars opacity</h4>
                          <p>0 = No visible, 100 = Full visible (in %)</p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Login page configuration */}
                    <h3 className="font-weight-normal">
                      Login page configuration
                    </h3>
                    <div className="hr" />
                    <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Enable Slider</h4>
                        </div>
                        <div className="actions switch-field">
                          <div className="switch-field-round">
                            <input
                              type="radio"
                              id="enable-slider-one"
                              name="enable-slider"
                              defaultValue="yes"
                              defaultChecked
                            />
                            <label htmlFor="enable-slider-one">ON</label>
                            <input
                              type="radio"
                              id="enable-slider-two"
                              name="enable-slider"
                              defaultValue="no"
                            />
                            <label htmlFor="enable-slider-two">OFF</label>
                          </div>
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4>Login background video</h4>
                          <p>
                            Insert a Youtube link here if you want show a
                            background video in the login page
                          </p>
                          <p>Put this field empty for not show video</p>
                        </div>
                        <div className="actions">
                          <input
                            className="dash-input"
                            type="text"
                            name="text"
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <button>Save</button>
                      </div>
                    </div>
                    {/* Login slider list */}
                    <h3 className="font-weight-normal">Login slider list</h3>
                    <div className="hr" />
                    <table>
                      <tbody>
                        <tr>
                          <th width="20%">Picture</th>
                          <th>Title</th>
                        </tr>
                        <tr>
                          <td>
                            <img
                              style={{
                                width: 100,
                                height: 100,
                                display: "block",
                              }}
                              src={Img}
                            />
                          </td>
                          <td>
                            Mon text de fou
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="sec-btn"
                              href="#"
                            >
                              Down
                            </a>
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="validate"
                              href="#"
                            >
                              Up
                            </a>
                            <a
                              style={{
                                float: "right",
                                display: "block",
                                margin: "0 3px",
                              }}
                              className="cancel"
                              href="#"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
    
    )
}

export default Search
