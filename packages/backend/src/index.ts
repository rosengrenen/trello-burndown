import 'reflect-metadata';
import createApolloServer from './apollo';
import { createConnection } from 'typeorm';
import cron from 'node-cron';
import dotenv from 'dotenv';
import typeormConfig from './typeorm-config';
import updateTrello from './update-trello';

dotenv.config();

(async function () {
	try {
		await createConnection(typeormConfig);

		if (!process.env.TRELLO_UPDATE_CRON) {
			throw new Error('TRELLO_UPDATE_CRON must be supplied');
		}

		if (!cron.validate(process.env.TRELLO_UPDATE_CRON)) {
			throw new Error('TRELLO_UPDATE_CRON is invalid');
		}

		cron.schedule(process.env.TRELLO_UPDATE_CRON, updateTrello);

		const server = await createApolloServer();
		const { url } = await server.listen(3000);
		console.log(`Server ready at ${url}`);
	} catch (e) {
		console.error(e);
	}
})();
