const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const Schema = require('./Schema/schema')
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql:true
}));

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
