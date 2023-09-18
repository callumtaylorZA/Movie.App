import { Guid } from "typescript-guid"

export interface Movie {
  id: Guid;
  name: string;
  categoryId: number;
  ratingId: number;
}
