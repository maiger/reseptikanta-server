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
        "tags": [
            "liha",
            "pata"
        ],
        "_id": "5d306d90986bbb1b1c656ce2",
        "title": "Lihapata!",
        "difficulty": 3,
        "preptime": 120,
        "servings": 6
    },
    {
        "tags": [
            "kana",
            "keitto"
        ],
        "_id": "5d306d96986bbb1b1c656ce3",
        "title": "Kanakeitto!",
        "difficulty": 2,
        "preptime": 45,
        "servings": 4
    }
]
```

**GET /api/recipes/:id**  

Provide a valid recipe id as URL parameter.

Example response:

```json
    "tags": [
        "liha",
        "pata"
    ],
    "_id": "5d306d90986bbb1b1c656ce2",
    "title": "Lihapata!",
    "ingredients": "Lihaa!",
    "instructions": "Lihaa padassa!",
    "difficulty": 3,
    "preptime": 120,
    "servings": 6
```

**POST /api/recipes**  

Content-Type: application/json

| Field | Type | Default value | Required | Description |
| --- | --- | --- | --- | --- |
| title | String | null | True | Title of recipe |
| ingredients | String | null | False | Full ingredients list |
| instructions | String | null | False | Full instructions |
| difficulty | Number | null | False | Difficulty as range from 1 to 5 |
| preptime | Number | null | False | Recipe preparation time in minutes |
| servings | Number | null | False | Number of servings from this recipe |
| tags | [String] | null | False | Recipe tags as a string array |


Example POST:

```json
{
 "title": "Fetasalaatti!",
 "ingredients": "Fetaa ja salaattia!",
 "instructions": "This is a test!",
 "difficulty": 1,
 "preptime": 10,
 "servings": 3,
 "tags": ["salaatti", "kasvis"]
}
```

Response is the newly created recipe.
```
{
    "tags": [
        "salaatti",
        "kasvis"
    ],
    "_id": "5d306da5986bbb1b1c656ce5",
    "title": "Fetasalaatti!",
    "ingredients": "Fetaa ja salaattia!",
    "instructions": "This is a test!",
    "difficulty": 1,
    "preptime": 10,
    "servings": 3,
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
| difficulty | Number | null | False | Difficulty as range from 1 to 5 |
| preptime | Number | null | False | Recipe preparation time in minutes |
| servings | Number | null | False | Number of servings from this recipe |
| tags | [String] | null | False | Recipe tags as a string array |

Example POST:

```json
{
    "tags": [
        "liha",
        "pata"
    ],
    "title": "Lihapata Remix!",
    "ingredients": "Lihaa!",
    "instructions": "Lihaa padassa!",
    "difficulty": 3,
    "preptime": 120,
    "servings": 6
}
```

Response is the updated recipe.
```
{
    "tags": [
        "liha",
        "pata"
    ],
    "_id": "5d306d90986bbb1b1c656ce2",
    "title": "Lihapata Remix!",
    "ingredients": "Lihaa!",
    "instructions": "Lihaa padassa!",
    "difficulty": 3,
    "preptime": 120,
    "servings": 6,
    "__v": 0
}
```

**DELETE /api/recipes/:id**  

Provide a valid recipe id as URL parameter.

Response is the deleted recipe.
```
{
    "tags": [
        "salaatti",
        "kasvis"
    ],
    "_id": "5d3063b22b71f03754f55d2d",
    "title": "Fetasalaatti!",
    "ingredients": "Fetaa ja salaattia!",
    "instructions": "This is a test!",
    "difficulty": 1,
    "preptime": 10,
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
