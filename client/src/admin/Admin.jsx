import React, { useState } from "react";
import { Outlet } from "react-router-dom";
//import "./styles/admin.css";
import {AdminNav} from "./AdminIndex";



const Admin = () => {
  const [help, setHelp] = useState(false);
  //console.log('user: ', user)

  return (
    <>
      <div>
        <AdminNav setHelp={setHelp} />
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
