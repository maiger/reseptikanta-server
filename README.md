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

**GET /api/recipes/:id**  

**POST /api/recipes**  

Content-Type: application/json

| Field | Type | Default value | Required | Description |
| --- | --- | --- | --- | --- |
| title | String | null | True | Title of recipe |
| ingredients | String | null | False | Full ingredients list |
| instructions | String | null | False | Full instructions |


Example

```json
{
 "title": "Lorem Ipsum,
 "ingredients": "Dolor sit amet,
 "instructions": "Consectetur adipiscing elit"
}
```

**PUT /api/recipes/:id**  

**DELETE /api/recipes/:id**  

**POST /api/login**  

Tests
---
Run tests with:
```
npm run test
```

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
Mongoose

***Tests***  
Mocha  
Chai  
Supertest  
Mockgoose  
