import { expect, test } from "vitest";
import { app } from "../../../app.ts";
import { faker } from "@faker-js/faker";
import rest from "supertest";
import { factoryUser } from "../../../tests/factory/user.ts";


test("auth route", async (t) => {
  await app.ready();

  const user = await factoryUser()
  const sign = await rest(app.server).post("/sign").send({
    email: user.email,
    password: user.password,
  });
  expect(200).toBe(sign.statusCode);
  expect(sign.body).toEqual({
    token: expect.any(String),
  });

  const badEmail = await rest(app.server).post("/sign").send({
    email: 'unregistered@email.com',
    password: user.password,
  });
  expect(400).toBe(badEmail.statusCode);


  const badPassword = await rest(app.server).post("/sign").send({
    email: user.email,
    password: user.password + '1',
  });
  expect(400).toBe(badPassword.statusCode);
});