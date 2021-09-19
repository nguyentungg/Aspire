import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Customer } from "./Customer";
import { Payment } from "./Payment";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  term: number;

  @Column()
  status: "pending" | "approved" | "rejected";

  @ManyToOne(
    () => Customer,
    customer => customer.loans
  )
  owner: Customer;

  @OneToMany(
    () => Payment,
    payment => payment.loan,
    { eager: true }
  )
  paymentHistory: Payment[];

  @Column({ type: "date", nullable: true })
  nextPayment?: Date;
}
