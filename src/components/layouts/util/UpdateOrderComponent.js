import { useState } from "react";
import UpdateOrderModals from "../util/orderModal";

const UpdateOrderComponent = ({ props }) => {
  const [modalstate, setmodalstate] = useState(false);
  console.log(props._id,'ssep')
  return (
    <div>
      <button
        className={" text-center bg-primary text-light"}
        style={{ border: "none" }}
        onClick={() => setmodalstate(() => true)}
      >
        Edit
      </button>
      <UpdateOrderModals
        modalstate={modalstate}
        setModalState={setmodalstate}
        id={props._id}
        ordersObject={props}
      />
    </div>
  );
};

export default UpdateOrderComponent;
