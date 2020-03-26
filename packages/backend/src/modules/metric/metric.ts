import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Metric {
	@Field(() => ID)
	id: string;

	@Field(() => Int)
	estimated: number;

	@Field(() => Int)
	worked: number;

	@Field()
	timestamp: Date;
}
