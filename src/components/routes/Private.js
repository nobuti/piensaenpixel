import React from "react";
import { Redirect } from "@reach/router";

import config from "../../config";
import store from "../../lib/store";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = store.get(config.session);

  if (!isLoggedIn) {
    return <Redirect to="/login" noThrow />;
  }

  return children;
};

export default PrivateRoute;
