import { Guid } from "typescript-guid"
import { ICategory } from "./category";
import { IRating } from "./rating";

export interface IMovie {
  id: Guid;
  name: string;
  categoryId: number | ICategory;
  ratingId: number | IRating;
}
