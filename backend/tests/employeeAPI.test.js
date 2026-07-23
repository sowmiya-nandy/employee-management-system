require("dotenv").config({
  path: ".env.test"
});

const request = require("supertest");
const app = require("../server");
const pool = require("../config/db");


describe("Employee API Testing", () => {

  test("GET all employees", async () => {

    const response = await request(app)
      .get("/employees");

    console.log(response.body);

    expect(response.statusCode)
      .toBe(200);

    expect(response.body)
      .toBeInstanceOf(Array);

  });


  afterAll(async () => {
    await pool.end();
  });

});