import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

class Trello {
	key: string;
	token: string;
	BASE_API_URL = 'https://api.trello.com/1';

	constructor(key: string, token: string) {
		this.key = key;
		this.token = token;
	}

	get(path: string) {
		return axios
			.get(
				this.BASE_API_URL +
					path +
					'?' +
					'key=' +
					this.key +
					'&token=' +
					this.token,
			)
			.then((response) => {
				return response.data;
			});
	}
}

(async function () {
	if (!process.env.TRELLO_KEY) {
		throw new Error('TRELLO_KEY must be supplied');
	}

	if (!process.env.TRELLO_TOKEN) {
		throw new Error('TRELLO_TOKEN must be supplied');
	}

	const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

	try {
		interface List {
			id: string;
			name: string;
		}

		interface Card {
			id: string;
			name: string;
			idList: string;
		}

		const lists: List[] = await trello.get(
			'/boards/5e7b45a57d89161bd87eb0ba/lists',
		);
		const cards: Card[] = await trello.get(
			'/boards/5e7b45a57d89161bd87eb0ba/cards',
		);

		const regex = /\(([0-9]+)\).*\[([0-9]+)\]/;
		cards.reduce(
			(previous, card) => {
				const list = lists.find((list) => list.id === card.idList);
				if (list) {
					if (!list.name.toLowerCase().includes('done')) {
						const match = card.name.match(regex);
						if (match) {
							return {
								estimated: previous.estimated + parseInt(match[1], 10),
								worked: previous.worked + parseInt(match[2], 10),
							};
						}
					}
				}
				return previous;
			},
			{ estimated: 0, worked: 0 },
		);
	} catch (e) {
		console.error(e);
	}
})();
