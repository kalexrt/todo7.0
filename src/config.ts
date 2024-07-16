import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const defaultPort = 3000;
const config = {
  port: process.env.PORT ? process.env.PORT : defaultPort,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: "100d",
    refreshTokenExpiryMS: 300000,
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  testBearerToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiS2FsYXNoIiwiZW1haWwiOiJrYWxhc2gxQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zIjpbInVzZXJzLmdldEFsbCIsInVzZXJzLmNyZWF0ZSIsInVzZXJzLmdldEJ5SWQiLCJ1c2Vycy51cGRhdGVCeUlkIiwidXNlcnMuZGVsZXRlQnlJZCJdLCJpYXQiOjE3MjA3NjkxNzksImV4cCI6MTcyMTM3Mzk3OX0.L19B91d_E1x_jbMXOvvecUNMhy-yn6zNoLCNgxZ951Y",
};
export default config;
