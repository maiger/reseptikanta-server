process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("GET /recipes", () => {

  // Create user and get token
  var token = null
  before((done) => {
    conn.connect()
      .then(() => {
        request(app).post("/api/user")
          .send({
            username: "RecipeGetTest",
            password: "password",
            role: "user"
          })
          .then((res) => {
            request(app).post("/api/user/login")
              .send({
                username: "RecipeGetTest",
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

  it("OK: Getting recipes has one recipes", (done) => {
    // There is already one recipe created by test 0_post
    request(app).get("/api/recipes")
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(1)
        done()
      })
      .catch((err) => done(err))
  })

  let id = "";
  it("OK: Getting recipes has two recipes", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: "Lorem Ipsum!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!",
        difficulty: 1,
        preptime: 10,
        servings: 3,
        tags: ["salaatti", "kasvis"]
      })
      .then((res) => {
        // Creating a recipe returns the newly created recipe
        id = res.body._id
        // Get all recipes
        request(app).get("/api/recipes")
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(2)
            done()
          })
      })
      .catch((err) => done(err))
  })

  // Use recipe id from previous test
  it("OK: Getting recipe by ID", (done) => {
    request(app).get("/api/recipes/" + id)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id")
        expect(body).to.contain.property("title")
        expect(body).to.contain.property("ingredients")
        expect(body).to.contain.property("instructions")
        expect(body).to.contain.property("difficulty")
        expect(body).to.contain.property("preptime")
        expect(body).to.contain.property("servings")
        expect(body).to.contain.property("tags")

        expect(body._id).to.equal(id)
        expect(body.title).to.equal("Lorem Ipsum!")
        expect(body.ingredients).to.equal("Dolor sit amet!")
        expect(body.instructions).to.equal("Consectetur adipiscing elit!")
        expect(body.difficulty).to.equal(1)
        expect(body.preptime).to.equal(10)
        expect(body.servings).to.equal(3)
        // Different equal check when validating arrays
        expect(body.tags).to.eql(["salaatti", "kasvis"])
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