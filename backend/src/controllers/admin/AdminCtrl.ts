import { Controller, Get, PathParams, Post, Put, Req } from "@tsed/common";
import { Authorize } from "@tsed/passport";
import { AcceptRoles } from "../../decorators/AcceptRoles";
import { Customer } from "../../entities/Customer";
import { Inject } from "@tsed/di";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { Loan } from "../../entities/Loan";
import { LoanRepository } from "../../repositories/LoanRepository";

@Controller("/admin")
@Authorize("jwt")
@AcceptRoles("User")
export class AdminCtrl {
  @Inject()
  private customerRepo: CustomerRepository;

  @Inject()
  private loanRepo: LoanRepository;

  @Get("/customers")
  getAllCustomers(@Req() req: Req): Promise<Customer[]> {
    return this.customerRepo.find({ creatorId: req.user.id });
  }

  @Post("/customers")
  createNewCustomer(@Req() req: Req): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, req.body);
    customer.creator = req.user;
    return this.customerRepo.save(customer);
  }

  @Get("/loans")
  getAllLoans(): Promise<Loan[]> {
    return this.loanRepo.find({ relations: ["owner"] });
  }

  @Put("/loan/:id/approve")
  approveLoan(@PathParams("id") id: any): Promise<Loan> {
    return this.loanRepo.approveLoan(id);
  }
  @Put("/loan/:id/reject")
  rejectLoan(@PathParams("id") id: any): Promise<Loan> {
    return this.loanRepo.rejectLoan(id);
  }
}
