export class UpdatePostDto {
  id?: number;
  title?: string;
  content?: string;
  public?: 2 | 1 | 0;
  category_id?: number;
  thumbnail?: string;
  action: "publish" | "save";
}
