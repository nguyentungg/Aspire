import SuperTest from "supertest";
import { PlatformTest } from "@tsed/common";
import { PassportCtrl } from "./PassportCtrl";
import { bootstrapServer } from "../../../test/helpers/bootstrapServer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";
import { testLogin } from "../../../test/helpers/utils";

describe("PassportController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(
    bootstrapServer({
      mount: {
        "/": [PassportCtrl]
      }
    })
  );
  beforeAll(done => {
    request = SuperTest(PlatformTest.callback());
    done();
  });
  afterAll(PlatformTest.reset);

  describe("POST /auth/login", () => {
    it("login successfully with default account", async () => {
      const response = await request
        .post("/auth/login")
        .send(formurlencoded({ email: "admin@aspire.test", password: "admin" }))
        .expect(200);
      expect(response.body).toHaveProperty("access_token");
    });
    it("login fail with wrong credential", async () => {
      await request
        .post("/auth/login")
        .send(
          formurlencoded({ email: "admin@aspire.test", password: "admin1" })
        )
        .expect(401);
    });
  });
  describe("POST /auth/create-customer", () => {
    let adminJwt = "";
    let clientJwt = "";
    beforeAll(async () => {
      adminJwt = await testLogin(request, "admin@aspire.test", "admin");
    });
    it("successfully register a customer", async () => {
      const response = await request
        .post("/auth/create-customer")
        .set("Authorization", adminJwt)
        .send(
          formurlencoded({
            email: "client@aspire.test",
            password: "client",
            firstName: "John",
            lastName: "Doe Customer",
            age: 18
          })
        )
        .expect(200);
    });
    it("successfully login with new customer", async () => {
      let response = await request
        .post("/auth/login")
        .send(
          formurlencoded({ email: "client@aspire.test", password: "client" })
        )
        .expect(200);
      expect(response.body).toHaveProperty("access_token");
      clientJwt = response.body.access_token;

      response = await request
        .get("/auth/test-customer")
        .set("Authorization", `Bearer ${clientJwt}`)
        .expect(200);
      expect(response.text).toEqual("hello");
    });
    it("GET /auth/me successfully", async () => {
      const response = await request
        .get("/auth/me")
        .set("Authorization", `Bearer ${clientJwt}`)
        .expect(200);
      expect(response.body.lastName).toEqual("Doe Customer");
    });
  });
});
