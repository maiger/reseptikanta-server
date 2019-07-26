process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("GET /user", () => {
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

  it("OK: Getting users has one user", (done) => {
    // There is already one user created by test 0_post
    request(app).get("/api/user")
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(1)
        done()
      })
      .catch((err) => done(err))
  })

  let id = "";
  it("OK: Getting user has two users", (done) => {
    // Create user
    request(app).post("/api/user")
      .send({
        username: "GetTestUser",
        password: "testtest",
        role: "user"
      })
      .then((res) => {
        // Creating a user returns the newly created user
        id = res.body._id
        // Get all user
        request(app).get("/api/user")
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(2)
            done()
          })
      })
      .catch((err) => done(err))
  })

  // Use user id from previous test
  it("OK: Getting user by ID", (done) => {
    request(app).get("/api/user/" + id)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("username")
        expect(body).to.contain.property("role")
        expect(body).to.contain.property("createdDate")

        expect(body._id).to.equal(id)
        expect(body.username).to.equal("GetTestUser")
        expect(body.role).to.equal("user")
        done();
      })
      .catch((err) => done(err))
  })

  // Correct type of ID, but no matching ID in DB
  it("FAIL: Getting user by incorrect ID, no user received", (done) => {
    request(app).get("/api/user/" + "5d2c6c31c13689361c9ca1c7")
      .then((res) => {
        const body = res.body;
        expect(body).to.equal(null);
        done();
      })
      .catch((err) => done(err))
  })

  // Incorrect type of ID, DB does not understand it
  it("FAIL: Getting user by incorrect type of ID, no user received", (done) => {
    request(app).get("/api/user/" + "incorrectTypeOfID")
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("CastError")
        done();
      })
      .catch((err) => done(err))
  })
})