**Info**
---
Server handling API-requests for Reseptikanta.

Getting started
---
Install dependencies
```
npm install
```

Start server
```
npm run start
```

API Quick Reference
---
| Endpoint | Method | Description |
| --- | --- | --- | 
| /api/recipes | GET | Get all recipes with basic info |
| /api/recipes/:id | GET | Get full recipe data |
| /api/recipes/ | POST | Create recipe |
| /api/recipes/:id | PUT | Update recipe |
| /api/recipes/:id | DELETE | Delete recipe |
| /api/login | POST | Log in user |

**Route Details**
---

**GET /api/recipes**  

Returns all recipes with limited info.

Example response:

```json
[
    {
        "_id": "5d29d9cde92f723a84348f7e",
        "title": "Hello There!"
    },
    {
        "_id": "5d2aedde1787b735d4222bef",
        "title": "Lorem Ipsum!"
    }
]
```

**GET /api/recipes/:id**  

Provide a valid recipe id as URL parameter.

Example response:

```json
{
"_id": "5d29d9cde92f723a84348f7e",
 "title": "Lorem Ipsum",
 "ingredients": "Dolor sit amet",
 "instructions": "Consectetur adipiscing elit"
}
```

**POST /api/recipes**  

Content-Type: application/json

| Field | Type | Default value | Required | Description |
| --- | --- | --- | --- | --- |
| title | String | null | True | Title of recipe |
| ingredients | String | null | False | Full ingredients list |
| instructions | String | null | False | Full instructions |


Example POST:

```json
{
 "title": "Lorem Ipsum",
 "ingredients": "Dolor sit amet",
 "instructions": "Consectetur adipiscing elit"
}
```

Response is the newly created recipe.
```
{
    "_id": "5d2c8a747c1da73a0c62951e",
    "title": "Lorem Ipsum",
    "ingredients": "Dolores sit amet!",
    "instructions": "Consectetur adipiscing elit",
    "__v": 0
}
```

**PUT /api/recipes/:id**  

Provide a valid recipe id as URL parameter.

Fields not provided are overridden as null.

Content-Type: application/json

| Field | Type | Default value | Required | Description |
| --- | --- | --- | --- | --- |
| title | String | null | True | Title of recipe |
| ingredients | String | null | False | Full ingredients list |
| instructions | String | null | False | Full instructions |

Example POST:

```json
{
 "title": "New title",
 "ingredients": "Dolor sit amet"
}
```

Response is the updated recipe.
```
{
    "_id": "5d2aedde1787b735d4222bef",
    "title": "New title",
    "ingredients": "Dolor sit amet",
    "instructions": null, // Field not given, got overridden as null
    "__v": 0
}
```

**DELETE /api/recipes/:id**  

Provide a valid recipe id as URL parameter.

Response is the deleted recipe.
```
{
    "_id": "5d2c8a747c1da73a0c62951e",
    "title": "Lorem Ipsum",
    "ingredients": "Dolores sit amet!",
    "instructions": "Consectetur adipiscing elit",
    "__v": 0
}
```

**POST /api/login**  

Not yet implemented.

Tests
---
Run tests with:
```
npm run test
```

***/api/recipes***  

GET:
- OK: Getting recipes has no recipes
- OK: Getting recipes has one recipe
- OK: Gettin recipe by ID
- FAIL: Getting recipe by incorrect ID, no recipe received
- FAIL: Getting recipe by incorrect type of ID, no recipe received

POST:
- OK: Creating a new recipe works
- FAIL: Recipe requires a title

PUT:
- OK: Updating a recipe works

DELETE:
- OK: Deleting a recipe works

Dependencies
---

***General***  
Nodemon 1.17.5

***Server***  
Node v10.16.0  
Express  
Body Parser  
cors  

***Database***  
MongoDB 3.6  
Mongoose

***Tests***  
Mocha  
Chai  
Supertest  
Mockgoose  
