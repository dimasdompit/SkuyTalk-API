const config = {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
  tokenLife: process.env.TOKEN_LIFE,
  refreshToken: process.env.REFRESH_TOKEN,
};

module.exports = config;
