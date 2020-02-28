import React from "react";
import "./styles/Admin.css";

const Admin = props => {
  return (
    <div className="adminContainer">
      <button onClick={props.changeAdminStatus}>Admin</button>
    </div>
  );
};

export default Admin;
