import { Guid } from "typescript-guid"
import { ICategory } from "./category";
import { IRating } from "./rating";

export interface IMovie {
  id: Guid | null;
  name: string;
  categoryId: number | ICategory;
  ratingId: number | IRating;
}
