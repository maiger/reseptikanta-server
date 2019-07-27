process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("PUT /user", () => {

  // Create user and get token
  var token = null
  before((done) => {
    conn.connect()
      .then(() => {
        request(app).post("/api/user")
          .send({
            username: "UserPutTest",
            password: "password",
            role: "user"
          })
          .then((res) => {
            request(app).post("/api/user/login")
              .send({
                username: "UserPutTest",
                password: "password"
              })
              .then((res) => {
                token = res.body.token
                console.log("Setting user token: ")
                console.log(token)
                done()
              })
              .catch((err) => done(err))
          })
          .catch((err) => done(err))
      })
      .catch((err) => done(err))
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err))
  })

  let id = "";
  it("OK: Updating user role works", (done) => {
    // Create user
    request(app).post("/api/user")
      .send({
        username: "PutTestUser",
        password: "testtest",
        role: "user"
      })
      .then((res) => {
        // Update newly created user
        const newUserBody = res.body;
        id = newUserBody._id
        request(app).put("/api/user/" + id)
          .set('Authorization', 'Bearer ' + token)
          .send({
            username: "UpdatedUsername",
            role: "updatedRole"
          })
          .then((res) => {
            const body = res.body;
            expect(body.username).to.equal("UpdatedUsername")
            expect(body.role).to.equal("updatedRole")
            done()
          })
      })
      .catch((err) => done(err))
  })
})