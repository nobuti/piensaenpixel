import React, { useReducer } from "react";
import Airtable from "airtable";
import { navigate, Redirect } from "@reach/router";
import Cookies from "universal-cookie";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import config from "../config";
import { Input, Button } from "../components/forms";

import Loading from "../assets/svg/loading.svg";

const Form = styled.form`
  max-width: 300px;
  margin-bottom: 24px;

  ${Button} svg {
    width: 24px;
    height: 24px;
    stroke: #0c5246;
  }
`;

const Row = styled.div`
  display: flex;

  & + & {
    margin-top: 16px;
  }
`;

const Error = styled.div`
  font-size: 12px;
`;

const loginReducerInitialState = { fetching: false, error: null };
function loginReducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { fetching: true, error: false };
    case "error":
      return { fetching: false, error: action.error };
    case "success":
      return loginReducerInitialState;
    default:
      return state;
  }
}

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE);

export default () => {
  const [state, dispatch] = useReducer(loginReducer, loginReducerInitialState);
  const cookies = new Cookies();
  const isLoggedIn = cookies.get(config.session);

  const login = (email) => {
    dispatch({ type: "fetching" });
    base("Granted")
      .select({
        filterByFormula: `{email} = '${email}'`,
      })
      .eachPage(
        (records) => {
          if (records.length > 0) {
            cookies.set(config.session, email, {
              maxAge: config.ttl,
              path: "/",
            });
            dispatch({ type: "success" });
            navigate("/private");
          } else {
            dispatch({
              type: "error",
              error: "Bummer, you are not granted.",
            });
          }
        },
        function done(error) {
          dispatch({ type: "error", error: `Error: ${error}` });
        }
      );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(e.target.email.value);
  };

  if (isLoggedIn) {
    return <Redirect to="/private" noThrow />;
  }

  return (
    <Layout>
      <Form onSubmit={onSubmit}>
        <Row>
          <Input type="text" name="email" placeholder="Insert your email" />
        </Row>
        <Row>
          <Button type="submit" disable={state.fetching.toString()}>
            {state.fetching ? <Loading /> : "Log in"}
          </Button>
        </Row>
      </Form>

      {state.error && <Error>{state.error}</Error>}
    </Layout>
  );
};
