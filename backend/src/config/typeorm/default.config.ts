import { User } from "../../entities/User";
import { Customer } from "../../entities/Customer";
import { Loan } from "../../entities/Loan";
import { Payment } from "../../entities/Payment";
console.log(process.env.POSTGRES_HOST);
export default {
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER || "test",
  password: process.env.POSTGRES_PASSWORD || "test",
  database: process.env.POSTGRES_DB || "test",
  synchronize: true,
  logging: process.env.POSTGRES_LOGIN === "true",
  entities: [User, Customer, Loan, Payment]
};
