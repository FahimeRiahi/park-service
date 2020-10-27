const { getUserId } = require('../util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const APP_SECRET = "72607f89-3c63-45a1-90b9-6faf10fabedf"

async function newwhitelistcar(parent, args, context, info) {
  const whitelistCar = await context.prisma.whitelistCar.create({ data: { ...args } })
  console.log(whitelistCar)
  return {
    whitelistCar,
  }
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id },APP_SECRET)
  console.log(user)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  console.log(user)
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  newwhitelistcar,
  signup,
  login,
}
