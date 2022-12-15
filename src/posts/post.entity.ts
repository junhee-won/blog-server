import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  public: boolean;

  @Column()
  category_id: number;
}
