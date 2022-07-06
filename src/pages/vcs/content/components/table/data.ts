import { User } from "../../../../..";

export const Data = User.generate();
export type Data = typeof Data;

export default Data;

export { User as Hydration };