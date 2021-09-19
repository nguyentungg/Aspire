import SuperTest from "supertest";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
import { PlatformTest } from "@tsed/common";
import { LoanCtrl } from "./LoanCtrl";
import { PassportCtrl } from "../passport/PassportCtrl";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";
import { Customer } from "../../entities/Customer";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { testLogin } from "../../../test/helpers/utils";

describe("LoanController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl, LoanCtrl]
      }
    })
  );
  beforeAll(done => {
    request = SuperTest(PlatformTest.callback());
    done();
  });
  afterAll(PlatformTest.reset);

  describe("POST /loan/submit", () => {
    let adminJwt = "";
    let clientJwt = "";

    beforeAll(async () => {
      // fetch admin jwt
      adminJwt = await testLogin(request, "admin@aspire.test", "admin");

      // create customer
      const customerRepo = PlatformTest.get<CustomerRepository>(
        CustomerRepository
      );
      const user = new Customer();
      user.password = "client";
      user.email = "client@aspire.test";
      user.firstName = "John";
      user.lastName = "Doe";
      user.age = 18;

      await customerRepo.save(user);
      clientJwt = await testLogin(request, "client@aspire.test", "client");
    });
    it("fail with admin role: Insufficient role", async () => {
      await request
        .post("/loan/submit")
        .set("Authorization", adminJwt)
        .send(formurlencoded({ term: 1, amount: 1 }))
        .expect(401);
    });
    it("success with client role, create new loan", async () => {
      await request
        .post("/loan/submit")
        .set("Authorization", clientJwt)
        .send(formurlencoded({ term: 1, amount: 1 }))
        .expect(200);
      const getRes = await request
        .get("/loan")
        .set("Authorization", clientJwt)
        .expect(200);
      expect(getRes.body).toHaveLength(1);
    });
  });
});
