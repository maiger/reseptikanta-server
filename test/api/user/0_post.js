process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("POST /user", () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err))
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err))
  })

  it("OK: Creating a new user works", (done) => {
    // Create user
    request(app).post("/api/user")
      .send({
        username: "Testuser",
        password: "password",
        role: "user"
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("username")
        expect(body).to.contain.property("hash")
        expect(body).to.contain.property("role")
        expect(body).to.contain.property("createdDate")

        expect(body.username).to.equal("Testuser")
        expect(body.role).to.equal("user")
        done()
      })
      .catch((err) => done(err))
  })

  it("FAIL: User requires a username", (done) => {
    request(app).post("/api/user")
      .send({
        password: "password",
        role: "user"
      })
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("ValidationError")
        done()
      })
      .catch((err) => done(err))
  })

  it("FAIL: User requires a password", (done) => {
    request(app).post("/api/user")
      .send({
        username: "AnotherTestUser",
        role: "user"
      })
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("InvalidPassword")
        done()
      })
      .catch((err) => done(err))
  })

  it("FAIL: User requires a unique username", (done) => {
    request(app).post("/api/user")
      .send({
        username: "Testuser",
        role: "user"
      })
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("InvalidUsername")
        done()
      })
      .catch((err) => done(err))
  })

  it("OK: Authenticatin a user works", (done) => {
    // Login/Authenticate user, using user creater previously in earlier tests
    request(app).post("/api/user/login")
      .send({
        username: "Testuser",
        password: "password"
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("username")
        expect(body).to.contain.property("token")
        expect(body).to.contain.property("role")
        expect(body).to.contain.property("createdDate")

        expect(body.username).to.equal("Testuser")
        expect(body.role).to.equal("user")
        done()
      })
      .catch((err) => done(err))
  })
})