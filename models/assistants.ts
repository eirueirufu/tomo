import { ObjectId } from "mongodb";

export interface Assistant {
  name?: string;
  description?: string;
  avatar?: string;
  system?: string;
}
