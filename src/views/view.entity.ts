import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @Column()
  localeDateString: string;

  @Column()
  count: number;
}
