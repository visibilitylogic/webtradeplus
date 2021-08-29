import { message } from 'antd'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import getToken from '../../store/utils/gettoken';
import { useActions } from '../hooks/useActions';
function LoginPage() {
    
  const {adminData} = useSelector(state=> state.adminInfo)
  const {change_admin_data, get_admin_data} = useActions();
  const[loginBackgroundImage,setLoginBackgroundImage] = useState("")
  const[loginCarouselImage1, setLoginCarouselImage1]=useState("")
  const[loginCarouselImage2, setLoginCarouselImage2]=useState("")
  const[loginCarouselImage3, setLoginCarouselImage3]=useState("")
  const [loading, setLoading] = useState(false);
    let dataAll={
        loginBackgroundImage: loginBackgroundImage,
        loginCarouselImage1:loginCarouselImage1,
        loginCarouselImage2:loginCarouselImage2,
        loginCarouselImage3:loginCarouselImage3
      }
      useEffect(()=>{
        if(adminData){
          setLoginBackgroundImage(adminData.loginBackgroundImage);
          setLoginCarouselImage1(adminData.loginCarouselImage1);
          setLoginCarouselImage2(adminData.loginCarouselImage2);
          setLoginCarouselImage3(adminData.loginCarouselImage3);
        }
      }, [])
    const LoginCarouselImage1 = (e) => {
        e.preventDefault();
        if (e) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            setLoginCarouselImage1(reader.result);
          };
        }
      };
      const LoginCarouselImage2 = (e) => {
        e.preventDefault();
        if (e) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            setLoginCarouselImage2(reader.result);
          };
        }
      };
      const LoginCarouselImage3 = (e) => {
        e.preventDefault();
        if (e) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            setLoginCarouselImage3(reader.result);
          };
        }
      };
      const LoginBackgroundImage3 = (e) => {
        e.preventDefault();
        if (e) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            setLoginBackgroundImage(reader.result);
          };
        }
      };

      const url = "https://trade-backend-daari.ondigitalocean.app/api/site/loginlayout"
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
           <div>
                <div className="public-card">
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your First Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage1}  className="logo" />
                          <input onChange={LoginCarouselImage1} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Second Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage2} className="logo" />
                          <input onChange={LoginCarouselImage2} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Thrid Carousel Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginCarouselImage3} className="logo" />
                          <input onChange={LoginCarouselImage3} type="file" name="siteLogo" />
                        </div>
                      </div>
                      <div className="each-row dash-row">
                        <div className="dtls">
                          <h4 className>Your Login Background Image</h4>
                          <p>
                            It's recommended to use a SVG logo for increase the
                            quality
                          </p>
                          <p>Max upload size : 64 MB</p>
                        </div>
                        <div className="actions">
                          <img src={loginBackgroundImage} className="logo" />
                          <input onChange={LoginBackgroundImage3} type="file" name="siteLogo" />
                        </div>
                      </div>
                    </div>

                    <div className="save-btn">
                    <button onClick={onSaved}>{loading ? "Saving...":"Save"}</button>
                    </div>
                  </div>
                </div> 
    
    )
}

export default LoginPage
