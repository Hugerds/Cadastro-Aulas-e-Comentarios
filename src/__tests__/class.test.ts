import { app } from "../index";
import { createConnection } from "typeorm";
import request from "supertest";
import { Users } from "../models/users";

describe("Suítes de teste de Aulas", () => {

    beforeEach(() => {
        return createConnection().then(() => console.log("Banco Conectado"));
    });
  
    test("Login Usuário", async (done) => {
        const user = new Users();
        user.name = "Hugo";
        user.password = "Tindin@2022";
        const result = await request(app).get("/users").send({
            "name": user.name,
            "password": user.password
        });
        expect(result.statusCode).toBe(200);
      });
});