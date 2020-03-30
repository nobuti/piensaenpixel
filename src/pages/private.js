import React from "react";
import { Router } from "@reach/router";

import Layout from "../components/layout";
import { Private, One, Two } from "../components/routes";

const App = () => (
  <Layout>
    <Router>
      <Private path="/private">
        <One path="one" />
        <Two path="two" />
      </Private>
    </Router>
  </Layout>
);
export default App;
