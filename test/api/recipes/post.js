process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("POST /recipes", () => {
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

  it("OK: Creating a new recipe works", (done) => {
    request(app).post("/api/recipes")
      .send({
        title: "Lorem Ipsum!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("title")
        expect(body).to.contain.property("ingredients")
        expect(body).to.contain.property("instructions")

        expect(body.title).to.equal("Lorem Ipsum!")
        expect(body.ingredients).to.equal("Dolor sit amet!")
        expect(body.instructions).to.equal("Consectetur adipiscing elit!")
        done()
      })
      .catch((err) => done(err))
  })

  it("FAIL: Recipe requires a title", (done) => {
    request(app).post("/api/recipes")
      .send({
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("ValidationError")
        done()
      })
      .catch((err) => done(err))
  })
})