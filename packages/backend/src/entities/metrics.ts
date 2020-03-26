import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Metric {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	estimated: number;

	@Column()
	worked: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
