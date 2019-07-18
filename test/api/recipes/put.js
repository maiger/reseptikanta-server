process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("PUT /recipes", () => {
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
  it("OK: Updating recipe title works", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .send({
        title: "A recipe for updating!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        // Update newly created recipe
        const newRecipeBody = res.body;
        id = newRecipeBody._id
        request(app).put("/api/recipes/" + id)
          .send({
            title: "Updated title!",
            ingredients: "Dolor sit amet!",
            instructions: "Consectetur adipiscing elit!"
          })
          .then((res) => {
            const body = res.body;
            expect(body.title).to.equal("Updated title!")
            done()
          })
      })
      .catch((err) => done(err))
  })
})