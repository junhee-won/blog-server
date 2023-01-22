export class UpdateCategoryDto {
  id: number;
  name?: string;
  priority?: number;
  public?: 1 | 0;
  parent_category_id?: number;
}
