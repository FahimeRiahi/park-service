const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const graphql = require('graphql')
const cors = require('cors');
const joinMonster = require('join-monster')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const APP_SECRET = process.env.APP_SECRET

// //pg connection details
// const pgPromise = require('pg-promise');
// const connStr =
//   'postgres://naaajzxn:z4WSEEFb0eL-4Xc1EEdN4KLyqbn3ijMn@lallah.db.elephantsql.com:5432/naaajzxn';
// const pgp = pgPromise({}); // empty pgPromise instance
// const psql = pgp(connStr); // get connection to your PG db instance

// Connect to database
const {Client} = require('pg')
const client = new Client({
  host: "lallah.db.elephantsql.com",
  user: "naaajzxn",
  password: "z4WSEEFb0eL-4Xc1EEdN4KLyqbn3ijMn",
  database: "naaajzxn",
  port: 5432
})
client.connect()

// Define the schema
const User = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: graphql.GraphQLInt},
    first_name: {type: graphql.GraphQLString},
    last_name: {type: graphql.GraphQLString},
    username: {type: graphql.GraphQLString},
    mobile: {type: graphql.GraphQLString},
    address: {type: graphql.GraphQLString},
    email: {type: graphql.GraphQLString},
    role: {type: graphql.GraphQLString},
    password: {type: graphql.GraphQLString},

  })
});

User._typeConfig = {
  sqlTable: '"park-depot"."User"',
  uniqueKey: 'id',
}

var WhitelistCar = new graphql.GraphQLObjectType({
  name: 'WhitelistCar',
  fields: () => ({
    id: {type: graphql.GraphQLInt},
    name: {type: graphql.GraphQLString},
    license_plate: {type: graphql.GraphQLString},
    allowed_from_date: {type: graphql.GraphQLString},
    allowed_to_date: {type: graphql.GraphQLString},
    allowed_time_from: {type: graphql.GraphQLString},
    allowed_time_to: {type: graphql.GraphQLString},

  })
})

WhitelistCar._typeConfig = {
  sqlTable: '"park-depot"."WhitelistCar"',
  uniqueKey: 'id'
}


// Resolver logic to respond to the query
const MutationRoot = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    login: {
      type: graphql.GraphQLString,
      args:{
        username: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        password: {type: graphql.GraphQLNonNull(graphql.GraphQLString)}
      },
      resolve: async (parent, args, context, info) => {
        const user = await context.prisma.User.findOne({ where: { username: args.username } })
        if (!user) {
          throw new Error('No user with that email');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Incorrect password');
        }
        const token = jwt.sign({ userId: user.id }, APP_SECRET)

        return {
          token,
          user,
        }

      }
    },
    newUser: {
      type: User,
      args: {
        first_name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        last_name: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        username: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        address: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        email: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        mobile: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        role: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        password: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("INSERT INTO \"park-depot\".\"User\" (first_name, last_name, username , address, email , mobile , role , password) VALUES ($1, $2, $3 , $4 , $5, $6, $7, $8) RETURNING *", [args.first_name, args.last_name, args.username, args.address, args.email, args.mobile, args.role, args.password])).rows[0]
        } catch (err) {
          throw new Error(err)
        }
      }
    },
    newWhitelistCar: {
      type: WhitelistCar,
      args: {
        license_plate: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        allowed_from_date: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        allowed_to_date: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        allowed_time_from: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
        allowed_time_to: {type: graphql.GraphQLNonNull(graphql.GraphQLString)},
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("INSERT INTO \"park-depot\".\"WhitelistCar\" (license_plate ,allowed_from_date, allowed_to_date , allowed_time_from, allowed_time_to) VALUES ($1 , $2, $3 , $4, $5) RETURNING *", [args.license_plate, args.allowed_from_date, args.allowed_to_date, args.allowed_time_from, args.allowed_time_to])).rows[0]
        } catch (err) {
          throw new Error(err.message)
        }
      }
    }
  })
});
const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Hello world!"
    },
    users: {
      type: new graphql.GraphQLList(User),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    user: {
      type: User,
      args: {id: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}},
      where: (userTable, args, context) => `${userTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    whitelistCars: {
      type: new graphql.GraphQLList(WhitelistCar),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
    whitelistCar: {
      type: WhitelistCar,
      args: {id: {type: graphql.GraphQLNonNull(graphql.GraphQLInt)}},
      where: (whitelistCarTable, args, context) => `${whitelistCarTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    }

  })
})

const schema = new graphql.GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot
});


// Create an express server and a GraphQL endpoint
const app = express().use('*', cors());//cors included to enable CORS requests
app.use('/graphql', express_graphql({
  schema: schema,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
