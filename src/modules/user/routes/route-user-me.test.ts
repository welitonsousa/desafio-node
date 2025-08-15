import { expect, test } from "vitest";
import { app } from "../../../app.ts";
import { factoryUser, factoryUserToken } from "../../../tests/factory/user.ts";
import rest from "supertest";

test('route user me', async () => {
  await app.ready();

  const user = await factoryUserToken();


  const res = await rest(app.server).get("/users/me").set("Authorization", user.token);
  expect(200).toBe(res.statusCode);
});