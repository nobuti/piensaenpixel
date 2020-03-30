import React, { useReducer } from "react";
import Airtable from "airtable";
import { navigate } from "@reach/router";

import Layout from "../components/layout";
import store from "../lib/store";
import config from "../config";

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

  const login = (email) =>
    base("Granted")
      .select({
        filterByFormula: `{email} = '${email}'`,
      })
      .eachPage(
        (records) => {
          if (records.length > 0) {
            store.set(config.session, email);
            dispatch({ type: "success" });
            navigate("/private");
          } else {
            dispatch({
              type: "error",
              error: "Bummer, parece que no tienes permiso",
            });
          }
        },
        function done(error) {
          dispatch({ type: "error", error: `Error: ${error}` });
        }
      );

  const onSubmit = (e) => {
    e.preventDefault();
    login(e.target.email.value);
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" />
        <button type="submit" disable={state.fetching.toString()}>
          Log in
        </button>
      </form>

      {state.error && <div>{state.error}</div>}
    </Layout>
  );
};
