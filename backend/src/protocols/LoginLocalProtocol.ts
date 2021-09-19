import { BodyParams, Constant, Inject } from "@tsed/common";
import { OnVerify, Protocol } from "@tsed/passport";
import { Groups } from "@tsed/schema";
import * as jwt from "jsonwebtoken";
import { IStrategyOptions, Strategy } from "passport-local";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { Unauthorized } from "@tsed/exceptions";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { Customer } from "../entities/Customer";

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify {
  @Constant("passport.protocols.jwt.settings")
  jwtSettings: Record<string, string | number>;

  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private customerRepository: CustomerRepository;

  async $onVerify(
    @BodyParams() @Groups("credentials") credentials: User
  ): Promise<boolean | string> {
    const { email, password } = credentials;
    let user:
      | User
      | Customer
      | undefined = await this.customerRepository.findOne({ email });
    if (!user) user = await this.userRepository.findOne({ email });

    if (!user) {
      // return false;
      throw new Unauthorized("Wrong credentials");
    }

    if (!user.verifyPassword(password)) {
      throw new Unauthorized("Wrong credentials");
    }

    return this.createJwt(user);
  }

  createJwt(user: User): string {
    const { issuer, audience, secretOrKey, maxAge = 86400 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.id,
        exp: now + (maxAge as number) * 1000,
        iat: now
      },
      secretOrKey as string
    );
  }
}
