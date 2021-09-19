import { BodyParams, Controller, Get, Post, Req } from "@tsed/common";
import { Authenticate, Authorize } from "@tsed/passport";
import { User } from "../../entities/User";
import { Groups } from "@tsed/schema";
import { AcceptRoles } from "../../decorators/AcceptRoles";
import { Customer } from "../../entities/Customer";
import { Inject } from "@tsed/di";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { pick } from "lodash";

@Controller("/auth")
export class PassportCtrl {
  @Inject()
  userRepo: UserRepository;
  @Inject()
  customerRepo: CustomerRepository;

  @Post("/login")
  @Authenticate("login", { failWithError: false })
  login(
    @Req("user") jwt: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @BodyParams() @Groups("credentials") credentials: User
  ): Record<string, string> {
    return {
      bearer_format: "Bearer",
      access_token: jwt
    };
  }

  @Post("/create-customer")
  @Authorize("jwt")
  @AcceptRoles("User")
  createCustomer(@Req() req: Req): Promise<Customer> {
    return this.customerRepo.save(req.body);
  }

  @Get("/test-customer")
  @Authorize("jwt")
  @AcceptRoles("Customer")
  testCustomer(): string {
    return "hello";
  }

  @Get("/me")
  @Authorize("jwt")
  getMe(@Req() req: Req): any {
    return pick(req.user, ["id", "firstName", "lastName", "email", "type"]);
  }
}
