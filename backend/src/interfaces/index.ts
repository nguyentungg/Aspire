import Express from "express";
import { User } from "../entities/User";
import { Customer } from "../entities/Customer";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace TsED {
    interface Request extends Express.Request {
      user: User | Customer;
    }
  }
}
