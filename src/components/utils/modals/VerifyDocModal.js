import { Fragment, useState } from "react";
import { Modal, Button } from "antd";
const VerifyDocModal = ({ text, title, file, img, proofDocument }) => {
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [pdocVisible, setPdocVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const showModalImg = () => {
    setImgVisible(true);
  };

  const handleOkImg = () => {
    setImgVisible(false);
  };

  const showModalPdoc = () => {
    setPdocVisible(true);
  };

  const handlePdoc = () => {
    setPdocVisible(false);
  };

  return (
    <>
      <span>
        <Button
          onClick={showModal}
          className="m-1"
          type="link"
          style={{ background: " #1d2435", color: "white" }}
        >
          {text}
        </Button>
        <Button
          onClick={showModalImg}
          className="m-1"
          type="link"
          style={{ background: " #1d2435", color: "white" }}
        >
          Passport Image
        </Button>
        <Button
          onClick={showModalPdoc}
          className="m-1"
          type="link"
          style={{ background: " #1d2435", color: "white" }}
        >
          Proof Document
        </Button>
      </span>
      <Modal
        title={title}
        visible={visible}
        onCancel={handleOk}
        footer={
          <>
            <Button type="ghost" onClick={handleOk}>
              Close
            </Button>
            <a
              href={file}
              target="_blank"
              rel="noreferrer"
              download="FieVerification"
            >
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img style={{ width: "100%" }} src={file} alt="file" />
      </Modal>

      <Modal
        title={"Passport Image"}
        visible={imgVisible}
        onCancel={handleOkImg}
        footer={
          <>
            <Button type="ghost" onClick={handleOkImg}>
              Close
            </Button>
            <a
              href={img}
              target="_blank"
              rel="noreferrer"
              download="FieVerification"
            >
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img style={{ width: "100%" }} src={img} alt="doc file" />
      </Modal>

      <Modal
        title={"Proof Document"}
        visible={pdocVisible}
        onCancel={handlePdoc}
        footer={
          <>
            <Button type="ghost" onClick={handlePdoc}>
              Close
            </Button>
            <a
              href={proofDocument}
              target="_blank"
              rel="noreferrer"
              download="FieVerification"
            >
              <Button type="primary">Open full file</Button>
            </a>
          </>
        }
      >
        <img
          style={{ width: "100%" }}
          src={proofDocument}
          alt="proof document"
        />
      </Modal>
    </>
  );
};

export default VerifyDocModal;
