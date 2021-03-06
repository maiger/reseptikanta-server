process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("POST /recipes", () => {

  // Create user and get token
  var token = null
  before((done) => {
    conn.connect()
      .then(() => {
        request(app).post("/api/user")
          .send({
            username: "RecipePostTest",
            password: "password",
            role: "user"
          })
          .then((res) => {
            request(app).post("/api/user/login")
              .send({
                username: "RecipePostTest",
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

  it("FAIL: Creating a recipe requires a JWT", (done) => {
    request(app).post("/api/recipes")
      .send({
        title: "A brand new recipe!",
      })
      .then((res) => {
        expect(res.body.name).to.equal("UnauthorizedError")
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it("OK: Creating a new recipe works", (done) => {
    // Create recipe
    request(app).post("/api/recipes")
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: "A brand new recipe!",
        ingredients: "Dolor sit amet!",
        instructions: "Consectetur adipiscing elit!",
        difficulty: 1,
        preptime: 10,
        servings: 3,
        tags: ["salaatti", "kasvis"]

      })
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

        expect(body.title).to.equal("A brand new recipe!")
        expect(body.ingredients).to.equal("Dolor sit amet!")
        expect(body.instructions).to.equal("Consectetur adipiscing elit!")
        expect(body.difficulty).to.equal(1)
        expect(body.servings).to.equal(3)
        expect(body.preptime).to.equal(10)
        // Different equal check when validating arrays
        expect(body.tags).to.eql(["salaatti", "kasvis"])
        done()
      })
      .catch((err) => done(err))
  })

  it("FAIL: Recipe requires a title", (done) => {
    request(app).post("/api/recipes")
      .set('Authorization', 'Bearer ' + token)
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