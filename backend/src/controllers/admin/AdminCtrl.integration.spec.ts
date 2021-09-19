import SuperTest from "supertest";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
import { PlatformTest } from "@tsed/common";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";
import { AdminCtrl } from "./AdminCtrl";
import { testLogin } from "../../../test/helpers/utils";
import { PassportCtrl } from "../passport/PassportCtrl";

describe("Admin Controller", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl, AdminCtrl]
      }
    })
  );
  beforeAll(done => {
    request = SuperTest(PlatformTest.callback());
    done();
  });
  afterAll(PlatformTest.reset);

  let adminJwt = "";
  describe("/admin/customers", () => {
    const newCustomer = {
      email: "customer@aspire.test",
      password: "customer",
      firstName: "John",
      lastName: "Agony",
      age: 18
    };

    beforeAll(async () => {
      adminJwt = await testLogin(request, "admin@aspire.test", "admin");
    });
    it("POST: create new customer successfully", async () => {
      const response = await request
        .post("/admin/customers")
        .set("Authorization", adminJwt)
        .send(formurlencoded(newCustomer))
        .expect(200);
      expect(response.body).toHaveProperty("creatorId");
    });
    it("GET: must have one created record", async () => {
      const response = await request
        .get("/admin/customers")
        .set("Authorization", adminJwt)
        .expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].lastName).toEqual("Agony");
    });
  });
});
