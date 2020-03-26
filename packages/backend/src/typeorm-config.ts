import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
	database: process.env.DB_DATABASE as string,
	entities: [__dirname + '/entities/*.{js,ts}'],
	host: process.env.DB_HOST as string,
	password: process.env.DB_PASSWORD as string,
	port: parseInt(process.env.DB_PORT as string, 10),
	synchronize: true,
	type: 'postgres',
	username: process.env.PG_USERNAME as string,
};

export default config;
