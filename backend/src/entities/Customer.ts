import { User } from "./User";
import { ChildEntity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Loan } from "./Loan";
import {Property} from "@tsed/schema";

@ChildEntity("Customer")
export class Customer extends User {
  @OneToMany(
    () => Loan,
    loan => loan.owner,
    { eager: true }
  )
  loans: Loan[];

  @Column()
  @Property()
  creatorId: number;

  @ManyToOne(
    () => User,
    user => user.id
  )
  @JoinColumn({ name: "creatorId" })
  creator: User;
}
