import React from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import globalStyles from "./globalStyles";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }) => (
  <Container>
    <Global styles={globalStyles} />
    {children}
  </Container>
);

export default Layout;
