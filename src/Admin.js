import React from "react";
import "./styles/Admin.css";

const Admin = props => {
  return (
    <div className="adminContainer">
      <div onClick={props.changeAdminStatus} className="gearsImage"></div>
    </div>
  );
};

export default Admin;
