<!--Header-->
# Back-End Data

<!--App link-->
[Co-Make App](https://co-make-api.herokuapp.com/)

///////// Auth Route /////////

<!--Bold and Italic text-->
#### Register a User at `endpoint`: 
```
/api/auth/register
```

HTTP Method: [**POST**]

#### Body


| Req.body  |  type    | required  | description
|:---------:|:--------:|:---------:|:-------:
| firstName | string   |    yes    |
| lastName  | string   |    yes    |
| email     | string   |    yes    | must be unique
| username  | string   |    yes    | must be unique
| password  | string   |    yes    |

#### Example

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "JohnDoe@gmail.com",
  "username": "J_doe",
  "password": "abc123"
}
```

#### Response

**201 (created)**

*Example Reponse*

```
{
  "id": 1,
  "username": "J_doe",
  "email": "JohnDoe@gmail.com",
  "firstName": "John",
  "lastName": "Doe",
}
```

**400 (Bad request)**

```
{
    "message": "Will prompt you to fill in any of the missing fields"
}
```

**500 (Server Error)**

```
{
    "message": "Oops, something went wrong. Please try again later.",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
}
```

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique, eg. username or email, is already registered. Will replace this with more helpful error messages soon.


----

### User Login

 at `endpoint`: 
```
/api/auth/login
```

HTTP Method: [**POST**]

#### Body


| Req.body  |  type    | required  | description
|:---------:|:--------:|:---------:|:-------:
| username  | string   |    yes    | must be a registered user
| password  | string   |    yes    |

#### Example

```
{
  "username": "J_doe",
  "password": "abc123"
}
```

#### Response

**200 (OK)**

`Success - No issues logging in`

Example reponse

```
{
    "message": "Welcome j_doe!"
}
```
**400 (Bad Request)**

```
{
    "message": "Will prompt you of missing input field"
}
```

**401 (Forbidden)**

```
{
    "message": "You will receive a message if either username is not found or incorrect password"
}
```

**500 (Bad Request)**

```
{
    "message": "Oops, something went wrong. Please try again later.",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
}
```

----

### Get All Posts

 at `endpoint`: 
```
/api/posts
```

HTTP Method: [**GET**]

#### Response

**200 (OK)**

Example reponse

```
  "id": 1,
  "username": "jhawkings0",
  "issue": "Lambda Driveway",
  "description": "Major pothole in middle lane",
  "street_address": "15 Lambda Street",
  "neighborhood": "Lambda Creek",
  "created_at": "2020-05-26 23:01:13",
  "is_fixed": 0

  "id": 2,
  "username": "pvanderveldt1",
  "issue": "Lambda Park",
  "description": "Swings at park are getting loose",
  "street_address": "25 Lambda Street",
  "neighborhood": "Lambda Creek",
  "created_at": "2020-05-26 23:01:13",
  "is_fixed": 0
```

**401 (Forbidden)**

```
{
    "message": "Please login or create account"
}
```

---

### Get a single post

 at `endpoint`: 
```
/api/posts/1
```

HTTP Method: [**GET**]

#### Response

**200 (OK)**

Example reponse

```
  "id": 1,
  "username": "jhawkings0",
  "issue": "Lambda Driveway",
  "description": "Major pothole in middle lane",
  "street_address": "15 Lambda Street",
  "neighborhood": "Lambda Creek",
  "created_at": "2020-05-26 23:01:13",
  "is_fixed": 0
```
