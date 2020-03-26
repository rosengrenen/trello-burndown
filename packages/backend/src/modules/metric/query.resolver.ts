import { Arg, Field, InputType, Query, Resolver } from 'type-graphql';
import { Metric as DBMetric } from '../../entities/metrics';
import { getRepository } from 'typeorm';
import { Metric as GQLMetric } from './metric';

@InputType()
class MetricsInput {
	@Field()
	from: Date;

	@Field()
	to: Date;
}

@Resolver(GQLMetric)
export class MetricQueryResolver {
	@Query(() => [GQLMetric])
	async metrics(
		@Arg('input') { from, to }: MetricsInput,
	): Promise<GQLMetric[]> {
		const metricRepository = getRepository(DBMetric);
		const metrics = await metricRepository
			.createQueryBuilder('metric')
			.where('metric.createdAt > :from', { from })
			.andWhere('metric.createdAt < :to', { to })
			.getMany();
		return metrics.map((metric) => {
			return {
				estimated: metric.estimated,
				id: metric.id,
				timestamp: metric.createdAt,
				worked: metric.worked,
			};
		});
	}
}
