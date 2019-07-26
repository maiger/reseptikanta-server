process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("DELETE /user", () => {
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

  let id = "";
  it("OK: Deleting a user works", (done) => {
    // Create user
    request(app).post("/api/user")
      .send({
        username: "DeleteTestUser",
        password: "test",
        role: "user"
      })
      .then((res) => {
        // Delete newly created user
        const body = res.body;
        id = body._id
        request(app).delete("/api/user/" + id)
          .then((res) => {
            // If user is deleted, it can not be found by id
            request(app).get("/api/user/" + id)
              .then((res) => {
                expect(res.body).to.equal(null)
                done()
              })
          })
      })
      .catch((err) => done(err))
  })
})