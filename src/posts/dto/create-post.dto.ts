export class CreatePostDto {
  title: string;
  content: string;
  public: 1 | 0;
  category_id: number;
  thumbnail: string;
}
