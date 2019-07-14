process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("GET /recipes", () => {
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

  it("OK: Gettin recipes has no recipes", (done) => {
    request(app).get("/api/recipes")
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0)
        done()
      })
      .catch((err) => done(err))
  })

  it("OK: Getting recipes has one recipe", (done) => {
    request(app).post("/api/recipes")
      .send({
        title: "Lorem Ipsum!",
        ingredients: "Dolores sit amet!",
        instructions: "High noon!"
      })
      .then((res) => {
        request(app).get("/api/recipes")
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1)
          done()
        })
      })
      .catch((err) => done(err))
  })
})