import { message } from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import getToken from '../../store/utils/gettoken';
import { useActions } from '../hooks/useActions';

function MasterCard() {
    const {change_admin_data, get_admin_data} = useActions();
    const {adminData} = useSelector(state=> state.adminInfo); 
    const[masterCardStatus,setmasterCardStatus]=useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setmasterCardStatus(adminData.masterCardStatus);
    }, [])
    const dataAll = {masterCardStatus:masterCardStatus};
    const url = "https://trade-backend-daari.ondigitalocean.app/api/site/paymentsettings";
    const onSaved = ()=>{
      setLoading(true)
      axios
        .put(url, dataAll, getToken())
        .then(res=> {
          setLoading(false)
          message.success("Data Updated Successfully");
          get_admin_data()
        })
        .catch(err=>{
          message.error("Error occured while updataing")
        })
    }
    return (
        <div>
          <div className="admin-content">
            <div className="public-card">
              <div className="each-row dash-row">
                <div className="dtls">
                  <h4>Enable MasterCard</h4>
                </div>
                <div className="actions switch-field">
                  <div className="switch-field-round">
                    <input
                      type="radio"
                      id="enable-payment-one"
                      name="enable-payment"
                      defaultValue="yes"
                      onChange={(e) =>
                        setmasterCardStatus(
                          e.target.checked ? true : false
                        )
                      }
                      checked={masterCardStatus=== true ? true : false}
                    />
                    <label htmlFor="enable-payment-one">ON</label>
                    <input
                      type="radio"
                      id="enable-payment-two"
                      name="enable-payment"
                      defaultValue="no"
                      onChange={(e) =>
                        setmasterCardStatus(
                          e.target.checked ? false : true
                        )
                      }
                      checked={masterCardStatus=== false ? true : false}
                    />
                    <label htmlFor="enable-payment-two">OFF</label>
                  </div>
                </div>
              </div>
            
              <div className="save-btn">
              <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
              </div>
              
            </div>
            
          </div>
        </div>
    )
}

export default MasterCard
