import React from "react";
import { Global } from "@emotion/core";

import globalStyles from "./globalStyles";

const Layout = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    {children}
  </>
);

export default Layout;
