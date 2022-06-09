/*
  Copyright 2021 Kidus Tiliksew

  This file is part of Tensor EMR.

  Tensor EMR is free software: you can redistribute it and/or modify
  it under the terms of the version 2 of GNU General Public License as published by
  the Free Software Foundation.

  Tensor EMR is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  ApolloLink,
} from "@apollo/client";
import { cache } from "./cache";
import { createUploadLink } from "apollo-upload-client";
import {
  NotificationProvider,
  BottomSheetProvider,
} from "@tensoremr/components";
import { Router } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { StatCard } from "./components/StatCard";
import { history } from "@tensoremr/components";

import "material-icons-font/material-icons-font.css";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = sessionStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/*const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/query`,
});*/

const terminatingLink = createUploadLink({
  // @ts-ignore
  uri: `${process.env.REACT_APP_SERVER_URL}/query`,
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(terminatingLink as unknown as ApolloLink),
  typeDefs,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export { StatCard };

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NotificationProvider>
        <BottomSheetProvider>
          <Router history={history.default}>
            <App />
          </Router>
        </BottomSheetProvider>
      </NotificationProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
