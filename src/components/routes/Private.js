import React from "react";
import { Redirect } from "@reach/router";
import Cookies from "universal-cookie";

import config from "../../config";

const PrivateRoute = ({ children }) => {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get(config.session);

  if (!isLoggedIn) {
    return <Redirect to="/login" noThrow />;
  }

  return children;
};

export default PrivateRoute;
