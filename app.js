require('dotenv').config();
const moment = require('moment')
const connection = require('./db.connect')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')

const typeDefs = require('./graphql/Schema/index.schema')
const resolvers = require('./graphql/Reslovers/index.resolver');
const { graphqlUploadExpress } = require('graphql-upload');

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    // console.log('Request started! Query:\n' +
    //     requestContext.request.query);

    console.log("😷 " + moment().format('HH:mm:ss') + " ::: Request started!")

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      myPlugin,
    ]
  })
  await server.start();

  let PORT = process.env.PORT || 4000

  const app = express()

  app.use(cors())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  server.applyMiddleware({ app })

  connection();

  await new Promise(r => app.listen({ port: PORT || 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

}

startServer()


