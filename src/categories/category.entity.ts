import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  created_at?: string;

  @Column()
  updated_at?: string;

  @Column()
  name?: string;

  @Column()
  priority?: number;

  @Column()
  parent_category_id?: number;

  // 1: true, 0: false
  @Column()
  public?: 1 | 0;

  @Column()
  description?: string;

  @Column()
  thumbnail?: string;
}
