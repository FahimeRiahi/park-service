const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {GraphQLServer} = require('graphql-yoga')

const Query = require('./resolvers/query.js')
const Mutation = require('./resolvers/mutation.js')

const resolvers = {
  Query,
  Mutation,
}

const graphQLServer = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },

})
const options = {
  port: 8089
}
graphQLServer.start(options, () => console.log(`Server is running on http://localhost:${options.port}`))

