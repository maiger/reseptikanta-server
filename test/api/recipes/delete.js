process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("DELETE /recipes", () => {
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
  it("OK: Deleting a recipe works", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
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
})