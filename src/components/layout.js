import React from "react";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";

import globalStyles from "./globalStyles";
import Navigation from "./navigation";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Layout = ({ children }) => (
  <Container>
    <Global styles={globalStyles} />
    <Navigation />
    {children}
  </Container>
);

export default Layout;
