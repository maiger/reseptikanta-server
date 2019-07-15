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

  let id = "";
  it("OK: Getting recipes has one recipe", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .send({
        title: "Lorem Ipsum!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!"
      })
      .then((res) => {
        // Get all recipes
        request(app).get("/api/recipes")
          .then((res) => {
            const body = res.body;
            id = body[0]._id
            expect(body.length).to.equal(1)
            done()
          })
      })
      .catch((err) => done(err))
  })

  // Use recipe id from previous test
  it("OK: Gettin recipe by ID", (done) => {
    request(app).get("/api/recipes/" + id)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("title")
        expect(body).to.contain.property("ingredients")
        expect(body).to.contain.property("instructions")

        expect(body._id).to.equal(id)
        expect(body.title).to.equal("Lorem Ipsum!")
        expect(body.ingredients).to.equal("Dolor sit amet!")
        expect(body.instructions).to.equal("Consectetur adipiscing elit!")
        done();
      })
      .catch((err) => done(err))
  })

  // Correct type of ID, but no matching ID in DB
  it("FAIL: Getting recipe by incorrect ID, no recipe received", (done) => {
    request(app).get("/api/recipes/" + "5d2c6c31c13689361c9ca1c7")
      .then((res) => {
        const body = res.body;
        expect(body).to.equal(null);
        done();
      })
      .catch((err) => done(err))
  })

  // Incorrect type of ID, DB does not understand it
  it("FAIL: Getting recipe by incorrect type of ID, no recipe received", (done) => {
    request(app).get("/api/recipes/" + "incorrectTypeOfID")
      .then((res) => {
        const body = res.body;
        expect(body.name).to.equal("CastError")
        done();
      })
      .catch((err) => done(err))
  })
})