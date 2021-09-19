import { EntityRepository, Repository } from "typeorm";
import { Loan } from "../entities/Loan";
import { addWeeks } from "date-fns";
@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {
  async approveLoan(id: any): Promise<Loan> {
    const loan = await this.findOneOrFail(id);
    loan.status = "approved";
    loan.nextPayment = addWeeks(new Date(), 1);
    return this.save(loan);
  }
  async rejectLoan(id: any): Promise<Loan> {
    const loan = await this.findOneOrFail(id);
    loan.status = "rejected";
    return this.save(loan);
  }
}
