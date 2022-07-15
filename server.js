const express = require("express");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
require("dotenv").config();
// ***************
const app = express();
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "SOME_SECRET",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.
const keycloakConfig = {
  clientId: "CLIENTID",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "REALM_NAME",
  credentials: {
    secret: "SECRET",
  },
};
const keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  keycloakConfig
);
app.use(keycloak.middleware());

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
// ***********
//Defining a port in .env is optional
PORT = 5000 || process.env.PORT;
// ***********
app.listen(PORT, (err) => {
  err
    ? console.log("could not listen to port", err)
    : console.log(`server is running on port ${PORT}`);
});
