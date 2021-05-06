const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const Schema = require('./Schema/schema');
const cors = require('cors');
const app = express();

// Middleware ----------------------------------

// Middleware that allows resources to be shared between domains
app.use(cors());
// Middleware to parse all requests JSON payloads
app.use(express.json());
//----------------------------------------------

// Sets path /graphql for all API resources
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

// Sets the port on which backend server listens
app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
