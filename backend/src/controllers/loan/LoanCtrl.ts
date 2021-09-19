import {
  BodyParams,
  Controller,
  Get,
  PathParams,
  Post,
  Req
} from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { Inject } from "@tsed/di";
import { LoanRepository } from "../../repositories/LoanRepository";
import { Loan } from "../../entities/Loan";
import { AcceptRoles } from "../../decorators/AcceptRoles";
import { Customer } from "../../entities/Customer";
import { PaymentRepository } from "../../repositories/PaymentRepository";
import { addWeeks } from "date-fns";

@Controller("/loan")
export class LoanCtrl {
  @Inject()
  private repo: LoanRepository;

  @Inject()
  private paymentRepo: PaymentRepository;

  @Get("/")
  @Authorize("jwt")
  @AcceptRoles("Customer")
  getAll(@Req() req: Req): Loan[] {
    const loans = (req.user as Customer).loans;
    return loans || [];
  }

  @Post("/submit")
  @Authorize("jwt")
  @AcceptRoles("Customer")
  submitLoan(
    @Req() req: Req,
    @BodyParams("term") term: number,
    @BodyParams("amount") amount: number
  ): Promise<Loan> {
    return this.repo.save({
      term,
      amount,
      owner: req.user,
      status: "pending"
    });
  }

  @Post("/:id/pay")
  @Authorize("jwt")
  @AcceptRoles("Customer")
  async makePayment(@PathParams("id") id: number): Promise<any> {
    const loan = await this.repo.findOneOrFail(id);
    loan.nextPayment = addWeeks(
      new Date((loan.nextPayment as unknown) as string),
      1
    );
    await this.repo.save(loan);
    return this.paymentRepo.save({
      loan
    });
  }
}
