export interface JWTPayload {
  id: number;
  user_id: string;
  iat: number;
  exp: number;
}
