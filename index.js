const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { GraphQLServer } = require('graphql-yoga')
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));
const Query = require('./resolvers/query.js')
const Mutation = require('./resolvers/mutation.js')

const resolvers = {
  Query,
  Mutation,
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})


const PORT = process.env.PORT || 3000
server.start(PORT, () => console.log(`Server is running on http://localhost:4000`))

