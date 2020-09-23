# API Documentation
<div id="top"></div>

**BASE URL**  https://bw-foodtruck-backend.herokuapp.com

- Attach endpoints to the end of the base URL in order to make HTTP Requests.


## Table of Contents

## User and Vendor registration and login
Endpoints that do _**not**_ require authentication (Not Protected):

| Requests        | Endpoints          | Description
|-----------------|--------------------|--------------------|
|<a href="#userRegister">POST Users Registration</a>  | /api/auth/register | <b>POST</b> request to register new user
|<a href="#userLogin">POST Users Login</a>            | /api/auth/login|  <b>POST</b> request to login new user
|<a href="#userLogin">GET all food trucks</a>            | /api/trucks|  <b>GET</b> request all trucks in the database
|<a href="#userLogin">GET a specific truck</a>            | /api/trucks/:truckId|  <b>GET</b> request a specific truck
|<a href="#userLogin">GET all food items from a specific truck</a>            | /api/items/:truckId|  <b>GET</b> request all food items from specified truck


# Diner Endpoints
| Requests        | Endpoints          | Description
|-----------------|--------------------|--------------------|
|<a href="#getTutorials">GET diner's favorited trucks</a>  | /api/users/:userId| <b>GET</b> request to retrieve all user's favorited trucks
|<a href="#getTutorialById">POST a new truck to diner's favorites</a>  | /api/users/:userId | <b>POST</b> adds the truck to diner's list of favorite trucks
|<a href="#postTutorial">POST a rating to food item </a>  | /api/users/:userId/:itemId | <b>POST</b> adds a rating to the specified food item
|<a href="#getdirectionsByTId">DELETE a food truck from favorites </a>  | /api/users/:userId/:favorite_id | <b>DELETE</b> Deletes the truck from their favorites


# Vendor Endpoints
| Requests        | Endpoints          | Description
|-----------------|--------------------|--------------------|
|<a href="#getTutorials">GET vendor's info</a>  | /api/vendors/:id| <b>GET</b> request's the vendor's information
|<a href="#getTutorialById">POST a new truck to vendor's list of owned trucks</a>  | /api/vendors/:id | <b>POST</b> adds the truck to vendor's list of owned trucks
|<a href="#getdirectionsByTId">DELETE a food truck from owned trucks </a>  | /api/vendors/:id/:truckId | <b>DELETE</b> Deletes the truck from their owned trucks
|<a href="#postTutorial">POST a food item to a food truck </a>  | /api/venors/:id/:truckId | <b>POST</b> adds a new food item to the specified truck
|<a href="#postTutorial">DELETE a food item from a food truck </a>  | /api/venors/:id/:truckId/itemId | <b>DELETE</b> delete a food item from the specified truck


<hr />

<div id="userRegister"></div>

## [POST] Registration For User

<a href="#top">Return to the top</a>

URL: https://bw-foodtruck-backend.herokuapp.com/auth/register

### Request body should include: 
| Input (Case Sensitive)           | Input Type          |
|-----------------|--------------------|
|username (required)           | string |
|password (required)       | string    |
|email (required)       | string    |
|role (required)       | string (vendor or diner)    |


_An example of how the body should appear:_

```js
{
	"username": "Kevin",
    "password": "kev321",
    "email": "kev@email.com",
    "role": "diner"
}
```

### What will be returned:

_Upon successful registration, you will recieve_

```js
{
  "message": "User has been successfully registered"
}
```

_If username or email already exist, you will receive_

```js
{
  "message": "username or email alerady exists"
}
```

<hr />

<div id="userLogin"></div>

## [POST] Login For User

<a href="#top">Return to the top</a>

URL: https://bw-foodtruck-backend.herokuapp.com/auth/login

### Request body should include: 
| Input (Case Sensitive)           | Input Type          |
|-----------------|--------------------|
|username (required)           | string |
|password (required)       | string   |


_An example of how the body should appear:_

```js
{
    "username": "Kevin",
    "password": "kev321"
}
```

### What will be returned:

_You will receive the user object an a JWT._

```js
{
  "data": {
    "id": 4,
    "username": "Kevin",
    "email": "kev@email.com",
    "password": "$2a$05$Jw4IZ5yfmdbjd3QfB8bnX.VXqbg.Yt8URk.UGgM8wOcso0rqeAXNa",
    "role": "diner"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IktldmluIiwiaWF0IjoxNjAwODgyOTk3LCJleHAiOjE2MDA5NjkzOTd9.N2JNwgkdGLxe6qdyt50KxmBzkipw15tfBUzdlU45AMw"
}
```

<hr />


## [GET] Get All Food Trucks 

<div id="getTutorials"></div>
<a href="#top">Return to the top</a>

URL: https://bw-foodtruck-backend.herokuapp.com/api/trucks

### Request body should include: 
_No request body needed_


### What will be returned:

_You will receive an object containing the food trucks in the DB_

```js
{
  "data": [
    {
      "id": 1,
      "name": "Bobs Burgers",
      "location": "Orlando",
      "vendor_id": 1
    },
    {
      "id": 2,
      "name": "Taco King",
      "location": "Las Vegas",
      "vendor_id": 2
    }
  ]
}
```

<hr />

## [GET] Get food truck by ID

<div id="getTutorialById"></div>
<a href="#top">Return to the top</a>

URL: https://bw-foodtruck-backend.herokuapp.com/api/trucks/:truckId

### Request body should include: 
_No request body needed_


### What will be returned:

_You will receive an object containing the truck's relevant data_

```js
{
  "data": {
    "truck_name": "Taco King",
    "location": "Las Vegas",
    "truck_id": 2,
    "food_items": [
      {
        "name": "Burrito",
        "food_id": 4,
        "description": "soft shell with meat and beans",
        "photo_url": "url4.com",
        "price": 6.5,
        "ratings": 5
      },
      {
        "name": "Torta",
        "food_id": 6,
        "description": "fried tortilla shell beans and meat",
        "photo_url": "url34333.com",
        "price": 3.99,
        "ratings": 3
      }
    ]
  }
}
```

<hr />

## [GET] Get all food items by truck id

<div id="getAllTutorials"></div>
<a href="#top">Return to the top</a>

URL: https://bw-foodtruck-backend.herokuapp.com/api/items/:truckId

### Request body should include: 
_No request body needed_


### What will be returned:

_You will receive an object containing the relevant food items

```js
{
  "data": [
    {
      "id": 4,
      "name": "Burrito",
      "description": "soft shell with meat and beans",
      "photo_url": "url4.com",
      "price": 6.5,
      "average_rating": 3.5,
      "truck_id": 2
    },
    {
      "id": 6,
      "name": "Torta",
      "description": "fried tortilla shell beans and meat",
      "photo_url": "url34333.com",
      "price": 3.99,
      "average_rating": 0,
      "truck_id": 2
    }
  ]
}
```
<hr />

## [GET] Get Directions by Tutorial ID

<div id="getdirectionsByTId"></div>
<a href="#top">Return to the top</a>

URL: https://how2s.herokuapp.com/api/tutorials/:id/directions

### Request body should include: 
No request body needed


### What will be returned:

_You will receive an array of all directions for that tutorial by tutorial_id this is an example for seeded tutorial with id of 4

```js
[
  {
    "step_number": 1,
    "instructions": "stand near open shoes"
  },
  {
    "step_number": 2,
    "instructions": "jump into shoes"
  }
]
```


<hr />

## [POST] POST tutorial

<div id="postTutorial"></div>
<a href="#top">Return to the top</a>

URL: https://how2s.herokuapp.com/api/tutorials

### Request body should include: 

```js
  {
    "title": "change tutorial title id 16",
    "summary": "superrrrr speceific sumary.",
	"instructor_id": 5
  }
```


### What will be returned:

_You will receive an array of all directions for that tutorial by tutorial_id this is an example for seeded tutorial with id of 4

```js
{
  "id": 17,
  "title": "title id 16",
  "summary": "superrrrr speceific sumary.",
  "likes": 0
}
```

<hr />


## [POST] POST tutorial directions

<div id="postTutorialDirections"></div>
<a href="#top">Return to the top</a>

URL: https://how2s.herokuapp.com/api/tutorials/:id/directions

### Request body should include: 

```js

  {
    "step_number": 3,
    "instructions": "google stufff then cry a little"
  }

```


### What will be returned:

_You will receive an object with the directions you just posted

```js
{
  "id": 21,
  "step_number": 3,
  "instructions": "google stufff then cry a little",
  "tutorial_id": 1
}
```

<hr />
## [PUT] PUT / Update Tutorial

<div id="putTutorial"></div>
<a href="#top">Return to the top</a>

URL: https://how2s.herokuapp.com/api/tutorials/:id

### Request body should include: 

```js
  {
    "title": "change tutorial title id 16",
    "summary": "superrrrr speceific sumary.",
	"instructor_id": 5
  }
```


### What will be returned:

_You will receive an array of all directions for that tutorial by tutorial_id this is an example for seeded tutorial with id of 4

```js
{
  "id": 17,
  "title": "title id 16",
  "summary": "superrrrr speceific sumary.",
  "likes": 0
}
```

<hr />

## [DELETE] Remove Tutorial

<div id="delTutorial"></div>
<a href="#top">Return to the top</a>

URL: https://how2s.herokuapp.com/api/tutorials/:id

### Request body should include: 

No request body neccessary

### What will be returned:

_You will receive an array of all directions for that tutorial by tutorial_id this is an example for seeded tutorial with id of 4

```js
"message: you just killed 1 tutorial mourn them you animal"
```