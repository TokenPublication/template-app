const dataSource = require('../ormconfig').default;
const dotenv = require("dotenv");
const { DataSource } = require('typeorm');

dotenv.config();

const createSchema = async () => {
    const dataSourceDef =  new DataSource({
      type: 'postgres',
      host: process.env.TEMPLATE_APP_DATABASE_HOST,
      port: process.env.TEMPLATE_APP_DATABASE_PORT,
      username: process.env.TEMPLATE_APP_DATABASE_USER,
      password: process.env.TEMPLATE_APP_DATABASE_PASSWORD,
      database: process.env.TEMPLATE_APP_DATABASE_DATABASE,
      ssl: process.env.SSL_VALUE === "true" ? { rejectUnauthorized: false } : false,
    });
  
    await dataSourceDef.initialize();
    const queryRunner = dataSourceDef.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.createSchema(process.env.TEMPLATE_APP_SCHEMA_NAME, true);
  } 



console.log("Creating schema");
createSchema().then(() => {
    console.log("Schema created");
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});


