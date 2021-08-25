import { message } from 'antd';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

function MasterCard() {
    const {change_admin_data} = useActions();
    const {adminData} = useSelector(state=> state.adminInfo); 
    const {success, error} = useSelector(state=> state.adminInfo)
    const [suc, setSuc] = useState("")
    const [e, setE] = useState("")
    const[masterCardStatus,setmasterCardStatus]=useState(null)
    useEffect(()=>{
        setmasterCardStatus(adminData.masterCardStatus);
    }, [])
    const dataAll = {masterCardStatus:masterCardStatus};
    const url = "https://trade-backend-daari.ondigitalocean.app/api/site/paymentsettings";
    const onSaved = ()=>{

            change_admin_data(url, dataAll);
            if(success && success.length > 0){
              setSuc(success)
            }else if (error && error.length> 0){
              setE(error)
            
          }
      } 
    return (
        <div>
               {
                  suc && message.success(suc, ()=> setSuc("")),
                  e && message.error(e, ()=> setE(""))
              }
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
                        <button  onClick={onSaved}>Save</button>
                      </div>
                     
                    </div>
                   
                  </div>
        </div>
    )
}

export default MasterCard
