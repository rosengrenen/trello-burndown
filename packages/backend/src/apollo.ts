import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

export default async function createApolloServer() {
	const schema = await buildSchema({
		resolvers: [__dirname + '/modules/**/*.resolver.{js,ts}'],
	});

	return new ApolloServer({ schema });
}
