import { useActions } from "../../hooks/useActions";

const ApproveDeposit = ({ details }) => {
  const { approveDeposit, declineDeposit } = useActions();
  const checkIfApproved = (status) => {
    return status === "Approved" ? "none" : "flex";
  };

  return (
    <div
      style={{
        display: checkIfApproved(details.status),
        width: "100%",
      }}
    >
      <button
        style={{
          backgroundColor: "green",
          border: "none",
          width: "50%",
        }}
        onClick={async () => {
          approveDeposit({ id: details._id, message: "success" });

          // console.log(`props.row.userId`, props.row.userId)
        }}
      >
        Accept
      </button>

      <button
        style={{
          backgroundColor: "red",
          border: "none",
          width: "50%",
        }}
        onClick={() => declineDeposit({ id: details._id, message: "failed" })}
      >
        Decline
      </button>
    </div>
  );
};

export default ApproveDeposit;
