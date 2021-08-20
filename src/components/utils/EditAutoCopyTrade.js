import { Fragment, useState } from "react";
import { Modal, Button, message, Spin, Space } from "antd";
import axios from "axios";
import { DatePicker } from "antd";
import { Form, Row, Col } from "react-bootstrap";

const EditAutoCopyTrade = ({ children, id, callback }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profitLoss, setprofitLoss] = useState(null);
  const [market, setmarket] = useState("");
  const [amount, setamount] = useState(0);
  const [assets, setassets] = useState("");
  const [scheduledTime, setscheduledTime] = useState("");
  const [checkDate, setcheckDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const onChangeDate = (value, dateString) => {
    setcheckDate(false);
    // console.log('Formatted Selected Time: ', dateString);
  };
  const onOkDate = (value) => {
    setscheduledTime(value._d);
  };

  const getsingleTrade = (_id) => {
    setLoading(true);
    axios
      .get(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/single/${_id}`
      )
      .then(
        (response) => {
          setLoading(false);
          setprofitLoss(response.data.profitLoss);
          setmarket(response.data.market);
          setamount(response.data.amount);
          setassets(response.data.assets);
          setscheduledTime(response.data.scheduledTime);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const showModal = () => {
    setIsModalVisible(true);
    getsingleTrade(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const EditTrade = (_id) => {
    setBtnLoading(true);
    let data = {
      profitLoss: profitLoss,
      market: market,
      amount: amount,
      assets: assets,
      scheduledTime: scheduledTime,
    };

    axios
      .put(
        `https://trade-backend-daari.ondigitalocean.app/api/autocopytrade/updatetrade/${_id}`,
        data
      )
      .then(
        (response) => {
          handleCancel();
          message.success("successfully updated auto-trade");
          setBtnLoading(false);
          callback();
        },
        (error) => {
          console.log(error);
          message.error("error updated auto-trade");
        }
      );
  };
  return (
    <Fragment>
      <span type="primary" onClick={showModal}>
        {children}
      </span>
      <Modal
        title="Edit Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {loading ? (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        ) : (
          <div className="new_pdiv">
            <Form className="user-form">
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3 mb-0">Amount</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setamount(e.target.value)}
                  value={amount}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Check
                    onChange={(e) => setprofitLoss(e.target.checked)}
                    type="radio"
                    label="Profit"
                    id="default-radio"
                    name="profitloss"
                    //   onChange={e=>this.setState({ profit:e.target.checked})}
                    checked={profitLoss}
                    defaultChecked={profitLoss}
                  />
                </Col>
                <Col md={6}>
                  <Form.Check
                    // onChange={e=>this.setState({ Loss:e.target.checked})}

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
                  onChange={(e) => setmarket(e.target.value)}
                  value={market}
                  defaultValue={market}
                >
                  <option>Choose...</option>
                  <option value="stocks">Stocks</option>
                  <option value="forex">Forex</option>
                  <option value="indices">Indices</option>
                  <option value="commodities">Commodities</option>
                  <option value="cryptocurrency">Cryptocurrency</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3 mb-0">Assets</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setassets(e.target.value)}
                  value={assets}
                />
              </Form.Group>
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3 mb-0">Time</Form.Label>
                <Row>
                  <Col md={6}>
                    {/* <Form.Check
                                                type="radio"
                                                label="Schedule"
                                                id="default-radio"
                                                name="time"
                                              /> */}
                    <DatePicker
                      showTime
                      onChange={onChangeDate}
                      onOk={onOkDate}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Check
                      type="radio"
                      label="Now"
                      id="default-radio"
                      name="time"
                      onChange={(e) => (
                        setcheckDate(e.target.checked),
                        setscheduledTime(e.target.checked ? new Date() : null)
                      )}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <div className="text-right">
                <Button type="primary" onClick={() => EditTrade(id)}>
                  {btnLoading ? (
                    <>
                      <i className="fa fa-spin fa-spinner"></i>Applying...
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default EditAutoCopyTrade;
