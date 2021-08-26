import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { message as messageAnt } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

const CryptoStepFour = ({
  cryptoStepFour,
  goBackToCryptoStepThree,
  handleSubmitDeposit,
  setCryptoDepositProof,
}) => {
  // const properties = {
  //   name: "file",
  //   action: "",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       messageAnt.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       messageAnt.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const handleCryptoDepositProof = (e) => {
    e.preventDefault();
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setCryptoDepositProof(reader.result);
      };
    }
  };
  return (
    cryptoStepFour && (
      <div>
        <div className="text-left">
          <Button onClick={goBackToCryptoStepThree} className="back-button">
            &#8592;&nbsp; Previous
          </Button>
        </div>
        <br />
        <p style={{ marginTop: "1.5rem", color: "#fff" }} className="mb-2">
          Upload proof of payment
        </p>
        <br />
        {/* <Upload {...properties}>
          <ButtonAnt icon={<UploadOutlined />}>Click to Upload</ButtonAnt>
        </Upload> */}
        <form className="form-file-upload">
          <input
            type="file"
            name="photo"
            id="upload-photo"
            onChange={handleCryptoDepositProof}
          />
        </form>
        <br />
        <small
          style={{
            color: "#fff",
            paddingBottom: "1.5rem",
          }}
        >
          *Optional but recommended <br />
          *Maximum file size 500kb
        </small>

        <div className="text-center">
          <br />
          <Button
            className="mb-4"
            onClick={handleSubmitDeposit}
            style={{
              width: "39%",
              padding: "15px 30px",
            }}
          >
            Done
          </Button>
        </div>
      </div>
    )
  );
};

CryptoStepFour.propTypes = {
  cryptoStepFour: PropTypes.bool.isRequired,
  handleSubmitDeposit: PropTypes.func.isRequired,
  goBackToCryptoStepThree: PropTypes.func.isRequired,
  setCryptoDepositProof: PropTypes.string.isRequired,
};

export default CryptoStepFour;
