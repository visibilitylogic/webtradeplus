import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import DeclineModal from "../DeclineModal";

const checkIfApproved = (status) => {
  return status === "Approved" ? "none" : "block";
};

const KYCActionComponent = ({ details }) => {
  const { approveVerify, declineVerify } = useActions();
  const [modalstate, setmodalstate] = useState(false);
  return (
    <div style={{ display: checkIfApproved(details.status) }}>
      <button
        style={{
          backgroundColor: "green",
          border: "none",
          width: "50%",
        }}
        onClick={() =>
          approveVerify({ id: details.userId, message: "success" })
        }
      >
        Accept
      </button>

      <button
        style={{
          backgroundColor: "red",
          border: "none",
          width: "50%",
        }}
        onClick={() => setmodalstate(() => true)}
      >
        Decline
      </button>
      <DeclineModal
        modalstate={modalstate}
        status={details}
        setModalState={setmodalstate}
      />
    </div>
  );
};

export default KYCActionComponent;
