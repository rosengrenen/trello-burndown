import cron from 'node-cron';
import dotenv from 'dotenv';
import updateTrello from './update-trello';

dotenv.config();

if (!process.env.TRELLO_UPDATE_CRON) {
	throw new Error('TRELLO_UPDATE_CRON must be supplied');
}

if (!cron.validate(process.env.TRELLO_UPDATE_CRON)) {
	throw new Error('TRELLO_UPDATE_CRON is invalid');
}

cron.schedule(process.env.TRELLO_UPDATE_CRON, updateTrello);
