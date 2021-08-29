   {/* <Col md={4} className="mt-5">
                    <Card style={{ background: '#fff' }}>
                      <Card.Body>
                        <h6>
                          Current Balance:{' '}
                          <span
                            style={{
                              fontSize: '1.2rem',
                              color: 'green',
                              fontWeight: 'bold',
                            }}
                          >
                            $
                            {new Intl.NumberFormat('en-US').format(user.wallet)}
                          </span>
                        </h6>
                        <h6>
                          Name:
                          {user.name}
                        </h6>
                        <h6>
                          Email:
                          {user.email}
                        </h6>

                        <Form className="user-form">
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">
                              Amount
                            </Form.Label>
                            <Form.Control
                              type="number"
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                            />
                          </Form.Group>
                          <Row>
                            <Col md={6}>
                              <Form.Check
                                onChange={(e) => setProfitLoss(true)}
                                type="radio"
                                label="Profit"
                                id="default-radio"
                                name="profitloss"
                              />
                            </Col>
                            <Col md={6}>
                              <Form.Check
                                onChange={(e) => setProfitLoss(false)}
                                type="radio"
                                label="Loss"
                                id="default-radio"
                                name="profitloss"
                                // checked={this.state.Loss}
                              />
                            </Col>
                          </Row>
                          <Form.Group className="d-flex align-items-center mt-3">
                            <Form.Label htmlFor="markets" className="mr-3">
                              Markets
                            </Form.Label>
                            <Form.Control
                              as="select"
                              id="markets"
                              custom
                              onChange={(e) => setMarket(e.target.value)}
                              value={market}
                            >
                              <option value="stocks">Stocks</option>
                              <option value="forex">Forex</option>
                              <option value="indices">Indices</option>
                              <option value="commodities">Commodities</option>
                              <option value="cryptocurrency">
                                Cryptocurrency
                              </option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">
                              Assets
                            </Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) => setAsset(e.target.value)}
                              value={asset}
                            />
                          </Form.Group>
                          <Form.Group className="d-flex align-items-center">
                            <Form.Label className="mr-3 mb-0">Time</Form.Label>
                            <Row>
                              <Col md={6}>
                                <Form.Check
                                  type="radio"
                                  label="Schedule"
                                  id="default-radio"
                                  name="time"
                                  onChange={() => {
                                    setSchedule(true)
                                    setCopyTradeBtn(true)
                                    setScheduledTime(null)
                                  }}
                                />
                              </Col>
                              <Col md={6}>
                                <Form.Check
                                  type="radio"
                                  label="Now"
                                  id="default-radio"
                                  name="time"
                                  onChange={(e) => {
                                    setSchedule(false)
                                    setCheckDate((prev) => !prev)
                                    setCopyTradeBtn((prev) => !prev)
                                    setScheduledTime((prev) =>
                                      prev ? new Date() : null,
                                    )
                                  }}
                                />
                              </Col>
                            </Row>
                          </Form.Group>
                          {schedule && (
                            <Form.Group>
                              <Row>
                                <span className="autoTSpan">Calender</span>
                                <DatePicker
                                  showTime
                                  onChange={onChangeDate}
                                  onOk={(value) => setScheduledTime(value._d)}
                                />
                              </Row>
                            </Form.Group>
                          )}
                          <div className="text-right">
                            <Button
                              disabled={copyTradeBtn}
                              type="primary"
                              onClick={() =>
                                submitAutoCopyTrade({
                                  profitLoss,
                                  user,
                                  market,
                                  amount: parseFloat(amount),
                                  asset,
                                  scheduledTime,
                                })
                              }
                            >
                              {loading ? (
                                <>
                                  <i className="fa fa-spin fa-spinner"></i>
                                  Applying...
                                </>
                              ) : (
                                'Apply'
                              )}
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col> */}