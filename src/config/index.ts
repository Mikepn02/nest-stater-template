export default () => ({
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  app: {
    url: process.env.APP_URL,
  },
});
