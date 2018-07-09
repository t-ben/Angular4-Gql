const express = require('express');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const bodyParser = require('body-parser');
const graphQLValidationFormatter = require('./graphQLValidationFormatter');
const Schema = require('./schema');
// mongoose and data:
const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.db.connectionString);
const db = mongoose.connection;
const providerRepo = require('./data/mongo/providerRepo')(db);
const data = require('./data')(providerRepo);

const loaders = require('./data/loaders')(data);
const {examplesText} = require('./schema/graphiqlExamples');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const server = express();

const schemaFunction =
  Schema.schemaFunction ||
  function() {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function() {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function(headers, secrets) {
    return Object.assign(
      {
        headers: headers,
      },
      secrets
    );
  };

server.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

server.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  if (!schema) {
    schema = schemaFunction(process.env);
  }
  const context = await contextFunction(request.headers, process.env, loaders, data);
  const rootValue = await rootFunction(request.headers, process.env);

  return {
    schema: await schema,
    rootValue,
    context,
    formatError: graphQLValidationFormatter.format,
    // tracing: true, return tracing info for performance inspection
  };
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: examplesText, // plant in some text into the query pane
  // passHeader: `'auth-token': '${security.validToken}'`
  // example passing a security token for graphiql - consider exposing for dev/qa only
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
