process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("DELETE /recipes", () => {
  // Create user and get token
  var token = null
  before((done) => {
    conn.connect()
      .then(() => {
        request(app).post("/api/user")
          .send({
            username: "RecipeDeleteTest",
            password: "password",
            role: "user"
          })
          .then((res) => {
            request(app).post("/api/user/login")
              .send({
                username: "RecipeDeleteTest",
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
  it("OK: Deleting a recipe works", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: "Recipe to be deleted!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        // Delete newly created recipe
        const body = res.body;
        id = body._id
        request(app).delete("/api/recipes/" + id)
          .set('Authorization', 'Bearer ' + token)
          .then((res) => {
            // If recipe is deleted, it can not be found by id
            request(app).get("/api/recipes/" + id)
              .then((res) => {
                expect(res.body).to.equal(null)
                done()
              })
          })
      })
      .catch((err) => done(err))
  })

  it("FAIL: Deleting a recipe requires a JWT", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: "Recipe to be deleted!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        // Delete newly created recipe without authorization token
        const body = res.body;
        id = body._id
        request(app).delete("/api/recipes/" + id)
          .then((res) => {
            expect(res.body.name).to.equal("UnauthorizedError")
            done()
          })
      })
      .catch((err) => done(err))
  })
})