import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Loan,
    loan => loan.paymentHistory
  )
  loan: Loan;
}
