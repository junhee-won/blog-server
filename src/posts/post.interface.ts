import { Category } from "src/categories/category.entity";

export interface PostSummary {
  id: number;
  title: string;
  thumbnail: string;
  categoryTree: Category[];
  created_at: string;
}

export interface PostPage {
  title: string;
  content: string;
  created_at: string;
  category: string;
}
