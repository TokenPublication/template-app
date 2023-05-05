const { DataSource } = require('typeorm');
const { join } = require('path');
const dotenv = require('dotenv');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
dotenv.config();
const dataSource =  new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.TEMPLATE_APP_DATABASE_HOST,
  port: process.env.TEMPLATE_APP_DATABASE_PORT,
  username: process.env.TEMPLATE_APP_DATABASE_USER,
  password: process.env.TEMPLATE_APP_DATABASE_PASSWORD,
  database: process.env.TEMPLATE_APP_DATABASE_DATABASE,
  schema: process.env.TEMPLATE_APP_SCHEMA_NAME,
  ssl: process.env.SSL_VALUE === "true" ? { rejectUnauthorized: false } : false,
  synchronize: true,
  entities: [
    "entities/**/*.js",
    "entities/*.js",
  ],
  migrations: [
      "migration/*.js",
  ],
  namingStrategy: new SnakeNamingStrategy(),
});

dataSource.initialize()
        .then(() => {
            console.log(`Data Source has been initialized`);
        })
        .catch((err) => {
            console.error(`Data Source initialization error`, err);
        })


  
module.exports.default = dataSource;