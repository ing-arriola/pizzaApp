import React, { useContext } from "react";

import Card from "./UI/Card";
import { AuthContext } from "../context/authcontetxt";
import "./Auth.css";

const Auth = (props) => {
  const authCon = useContext(AuthContext);

  const loginHandler = () => {
    authCon.login();
  };

  return (
    <div className="auth">
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  );
};

export default Auth;
