import React from 'react'
import "./Admin_side.css";
import {NavLink} from "react-router-dom";
import {Admin_sidebar_array as array} from "../../helpers/dataset/admin_sidebarElements";
import Item from 'antd/lib/list/Item';
function AdminAside() {
    return (
        <div className="Admin_side_wrapper">
          <ul>
          {
                array.map((item)=>(
                    <li key={item.id} className="">
                        <NavLink to={item.path}>
                            <span className={item.icon}/> {item.title}
                        </NavLink>
                    </li>
                ))
            }
          </ul>
        </div>
    )
}

export default AdminAside
