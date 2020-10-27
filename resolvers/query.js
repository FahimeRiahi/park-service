function users(parent, args, context, info) {
  const users = context.prisma.user.findMany({
  })
  return users
}
function whitelistCars(parent, args, context, info) {
  const whitelistCars = context.prisma.whitelistCar.findMany({
  })
  return whitelistCars
}

module.exports = {
  users,
  whitelistCars
}
