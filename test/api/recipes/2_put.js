process.env.NODE_ENV = "test"

const expect = require("chai").expect
const request = require("supertest")

const app = require("../../../app.js")
const conn = require("../../../db/index.js")

describe("PUT /recipes", () => {
  // Create user and get token
  var token = null
  before((done) => {
    conn.connect()
      .then(() => {
        request(app).post("/api/user")
          .send({
            username: "RecipePutTest",
            password: "password",
            role: "user"
          })
          .then((res) => {
            request(app).post("/api/user/login")
              .send({
                username: "RecipePutTest",
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
  it("OK: Updating recipe title works", (done) => {
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
        // Update newly created recipe
        const newRecipeBody = res.body;
        id = newRecipeBody._id
        request(app).put("/api/recipes/" + id)
          .set('Authorization', 'Bearer ' + token)
          .send({
            title: "Updated title!",
            ingredients: "Updated ingredients!",
            instructions: "Updated instructions!",
            difficulty: 2,
            preptime: 30,
            servings: 5,
            tags: ["updated", "tags"]
          })
          .then((res) => {
            const body = res.body;
            expect(body.title).to.equal("Updated title!")
            expect(body.ingredients).to.equal("Updated ingredients!")
            expect(body.instructions).to.equal("Updated instructions!")
            expect(body.difficulty).to.equal(2)
            expect(body.preptime).to.equal(30)
            expect(body.servings).to.equal(5)
            // Different equal check when validating arrays
            expect(body.tags).to.eql(["updated", "tags"])
            done()
          })
      })
      .catch((err) => done(err))
  })

  it("FAIL: Updating a recipe requires a JWT", (done) => {
    request(app).put("/api/recipes/" + id)
    .send({
      title: "Trying to update!",
    })
    .then((res) => {
      expect(res.body.name).to.equal("UnauthorizedError")
      done()
    })
  })
})