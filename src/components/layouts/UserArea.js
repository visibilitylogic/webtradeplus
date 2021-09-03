import React, { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { message } from "antd";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UserArea = ({ setEditProfile, singleUser }) => {
  const { error } = useSelector((state) => state.profile);
  const { isAdmin, isManager, _id, autoTrade, liveTrade, name } = singleUser;
  const [livestate, setLiveState] = useState(liveTrade);
  const [auto, setAuto] = useState(autoTrade);
  const [state, setstate] = useState(false);
  const [state2, setstate2] = useState(false);
  const { setLiveTrade, setAutoTrade, deleteUser } = useActions();

  const setTradeFunc = async () => {
    setstate2(true);
    if (error) {
      message.error("Failed!!!");
    } else {
      const details = {
        autoTrade: !auto,
      };
      await setAutoTrade(_id, details);
      setAuto(!auto);
      message.success("Successfull");
    }
    setstate2(false);
  };

  const setToggles = async () => {
    setstate(true);
    if (error) {
      message.error("Failed");
    } else {
      const details = {
        id: _id,
        liveTrade: !liveTrade,
      };
      await setLiveTrade(details);
      await setstate(false);
      setLiveState(!livestate);
      message.success(" Successful");
    }
  };
  const handleDeleteUser = async () => {
    if (error) {
      message.error("Try again");
    } else {
      const details = { id: _id };
      await deleteUser(details);
      message.success("User was successfully deleted from the database");
    }
  };
  return (
    <>
      {singleUser && (
        <UserAreaContainer>
          <h3 className="text-center">
            {isAdmin ? "ADMIN" : isManager ? "Manager" : "USER"}
          </h3>
          <div className="d-flex justify-content-flex-start w-75  align-items-center mb-3">
            <i
              className="fas fa-2x fa-edit mr-auto"
              onClick={() => setEditProfile(true)}
            />

            <i
              className="delete-profile fas  fa-2x fa-user-minus"
              onClick={() => {
                confirmAlert({
                  title: "DELETE USER",
                  message: `Are you sure you want to delete ${name} ?`,
                  buttons: [
                    {
                      label: "Delete",
                      onClick: () => handleDeleteUser(_id),
                    },
                    {
                      label: "No",
                      onClick: () => null,
                    },
                  ],
                });
              }}
            />
          </div>
          <div className="d-flex justify-content-flex-start w-75 mx-auto flex-column align-items-center">
            <div className="d-flex  w-100 justify-content-flex-start align-items-center">
              <div className="mr-auto">
                <h6>Live Trade</h6>
              </div>
              <div>
                <Switch
                  onChange={setToggles}
                  checked={livestate}
                  disabled={state}
                  className="react-switch"
                  onColor="#54AC40"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#000000"
                />
              </div>
            </div>
            <div className="d-flex  w-100 justify-content-flex-start align-items-center">
              <div className="mr-auto">
                <h6>Auto Trade</h6>
              </div>
              <div>
                <Switch
                  onChange={setTradeFunc}
                  checked={auto}
                  disabled={state2}
                  className="react-switch"
                  onColor="#54AC40"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#000000"
                />
              </div>
            </div>
          </div>
        </UserAreaContainer>
      )}
    </>
  );
};

export default UserArea;

const UserAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin: auto;
  box-shadow: 0px 1px 8px -1px rgba(0, 0, 0, 0.75);
  border-radius: 5px;

  .fa-user-minus {
    margin-left: auto;
    color: red;
  }
  .fa-edit {
    color: blue;
  }
`;
