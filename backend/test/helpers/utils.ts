import SuperTest from "supertest";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import formurlencoded from "form-urlencoded";
export async function testLogin(
  request: SuperTest.SuperTest<SuperTest.Test>,
  email: string,
  password: string
): Promise<string> {
  const response = await request
    .post("/auth/login")
    .send(formurlencoded({ email, password }))
    .expect(200);
  expect(response.body).toHaveProperty("access_token");
  return `Bearer ${response.body.access_token}`;
}
