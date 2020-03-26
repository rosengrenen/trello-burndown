import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';

const client = new ApolloClient({
	uri: process.env.GRAPHQL_URI,
});

interface MetricsQueryResult {
	metrics: {
		id: string;
		estimated: number;
		worked: number;
		timestamp: Date;
	}[];
}

interface MetricsQueryInput {
	input: {
		from: Date;
		to: Date;
	};
}

const METRICS_QUERY = gql`
	query MetricsQuery($input: MetricsInput!) {
		metrics(input: $input) {
			id
			estimated
			worked
			timestamp
		}
	}
`;

const DummyQuery: React.FC = () => {
	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 4),
	);
	const [endDate, setEndDate] = useState(new Date());
	const { data, error, loading } = useQuery<
		MetricsQueryResult,
		MetricsQueryInput
	>(METRICS_QUERY, {
		variables: {
			input: {
				from: startDate,
				to: endDate,
			},
		},
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	if (data) {
		return (
			<ul>
				{data.metrics.map((metric) => (
					<li key={metric.id}>{metric.id}</li>
				))}
			</ul>
		);
	}

	return null;
};

const App = () => (
	<ApolloProvider client={client}>
		<DummyQuery />
	</ApolloProvider>
);

export default App;
