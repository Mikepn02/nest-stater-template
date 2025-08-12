export default () => ({
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
});
