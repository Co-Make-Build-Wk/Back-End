<!--Header-->
# Back-End Data

<!--App link-->
[Co-Make App](https://co-make-api.herokuapp.com/)

///////// Auth Route /////////

<!--Bold and Italic text-->
#### Register a User at *`endpoint`*: 
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
  "username": "J_doe"
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

SQLITE_CONSTRAINT usually indicates that one of the fields that is required to be unique, eg. username or email, is already registered. Will replace this with more helpful error messages soon.


----

### User Login

 at *`endpoint`*: 
```
/api/auth/login
```

HTTP Method: [**POST**]

