import {
  Description,
  Example,
  Format,
  Groups,
  Minimum,
  Nullable,
  number,
  Property,
  Required
} from "@tsed/schema";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance
} from "typeorm";

@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type" }
})
export class User {
  @Column()
  @Property()
  type: string;

  @Description("Database assigned id")
  @PrimaryGeneratedColumn()
  @Groups("!creation", "details")
  id: number;

  @Description("User email")
  @Example("user@domain.com")
  @Format("email")
  @Column({ unique: true })
  @Property()
  email: string;

  @Groups("credentials")
  @Description("User password")
  @Example("/5gftuD/")
  @Column()
  @Required()
  @Property()
  password: string;

  @Description("User first name")
  @Column()
  @Required()
  @Groups("details")
  firstName: string;

  @Description("User last name")
  @Column()
  @Required()
  @Groups("details")
  lastName: string;

  @Description("User age")
  @Column()
  @Minimum(18)
  @Example(18)
  @Groups("details")
  age: number;

  verifyPassword(password: string) {
    return this.password === password;
  }
}
