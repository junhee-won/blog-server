import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  /*
  2: 임시저장(draft)
  1: 공개(public)
  0: 비공개(private)
  */
  @Column()
  public: 2 | 1 | 0;

  @Column()
  category_id: number;

  @Column()
  thumbnail: string;
}
