import { Fragment, useState } from "react";
import { Modal, Button, message, Spin, Space } from "antd";
import axios from "axios";
import { Form} from "react-bootstrap";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";

const EditAutoTrade = ({id, children}) => {
  const {update_auto_trade, get_all_auto_trades} = useActions();
  const [userName, setuserName] = useState("");
  const [profitPercentage, setprofitPercentage] = useState("");
  const [subscriptionFee, setsubscriptionFee] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {success,error} = useSelector(state=> state.adminData)
  const getsingleTrade = (_id) => {
    setLoading(true);
    axios
        .get(`https://trade-backend-daari.ondigitalocean.app/api/copytrade/${_id}`)
        .then(
          (response) => {
            setLoading(false)
            console.log(response.data);
            setuserName(response.data.userName);
            setprofitPercentage(response.data.profitPercentage);
            setsubscriptionFee(response.data.subscriptionFee);
          },
          (error) => {
            console.log(error);
          }
        );
    };

  const showModal = () => {
    setIsModalVisible(true)
    getsingleTrade(id);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const EditTrade = (_id) => {
    const data = { userName, subscriptionFee, profitPercentage };
    update_auto_trade(_id, data);
    handleCancel();
    console.log(success);
    if( success && success.length > 0) message.success("Successfully updated auto trade")
    if( error && error.length > 0) message.error("error in updating")
    get_all_auto_trades();
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
                <Form.Label className="mr-3 mb-0">UserName</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setuserName(e.target.value)}
                  value={userName}
                />
              </Form.Group>
              
              
              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3 mb-0">Profit Percentage</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setprofitPercentage(e.target.value)}
                  value={profitPercentage}
                />
              </Form.Group>

              <Form.Group className="d-flex align-items-center">
                <Form.Label className="mr-3 mb-0">Subscription Fee</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setsubscriptionFee(e.target.value)}
                  value={subscriptionFee}
                />
              </Form.Group>
              
              <div className="text-right">
                <Button type="primary" onClick={() => EditTrade(id)}>
                  {/* {btnLoading ? (
                    <>
                      <i className="fa fa-spin fa-spinner"></i>Updating....
                    </>
                  ) : (
                    "Upadate"
                  )} */}
                  update
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default EditAutoTrade;
