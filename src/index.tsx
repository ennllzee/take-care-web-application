import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { history } from "./helper/history";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import { BatchHttpLink } from "@apollo/client/link/batch-http";

// const link = new BatchHttpLink({
//   uri: "http://localhost:4000/graphql",
//   batchMax: 5, // No more than 5 operations per batch
//   batchInterval: 20, // Wait no more than 20ms after first batched operation
// });

import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({
  uri: "http://take-care-api.eastus.azurecontainer.io:4000/graphql",
  // uri: "http://localhost:4000/graphql",  
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();