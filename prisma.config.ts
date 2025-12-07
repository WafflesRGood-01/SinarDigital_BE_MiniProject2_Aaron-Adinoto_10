export default {
  datamodel: "./prisma/schema.prisma",
  migrate: {
    connections: {
      dev: {
        provider: "sqlite",
        url: "file:./dev.db",
      },
    },
  },
};