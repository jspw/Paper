# Backend (API)

## Table :

- [API Documentation](#api-documentation)

  - [Authorization](#authorization)

    - [Registration](#registration)

      - [Create Student](#create-user)
      - [Create Teacher](#create-user)

    - [Login](#login)

    - [Access A Protected or Restricted Route](#access-a-protected-or-restricted-route)

  - [Users](#users)
    - [Student Info](#student-info)
    - [Teacher Info](#teacher-info)

## Contents :

### Registration

#### Create Student

Request : `POST` `/auth/create-student`

Body :

```json
{
  "role": "Text*", //[student,teacher]
  "username": "Text*", //must be unique
  "email": "Email*", //must be unique
  "password": "Text*",
  "repassword": "Text*",
  "firstName": "Text",
  "lastName": "Text",
  "department": "Text*",
  "registrationNo": "Number*",
  "session": "Text*" //[2015-2016,2016-2017,2017-2018,2019-2019]
}
```

Response : 

```json
{
  "status": "OK",
  "result": {
    "token": "JWT_TOKEN",
    "data": {
      "student": {
        "_id": "600c58df30da3d2fe7789afb",
        "role": "student",
        "email": "rahoim",
        "username": "rahimo",
        "firstName": "Sania",
        "lastName": "Rahman",
        "department": "swe",
        "registrationNo": 2017831051,
        "varsity": "SUST",
        "session": "2017-2018",
        "registered_at": "2021-01-23T17:11:59.634Z",
        "__v": 0
      }
    }
  }
}
```

#### Create Teacher

Request : `POST` `/auth/create-teacher`

Body :

```json
{
  "role": "Text*", //[student,teacher]
  "username": "Text*", //must be unique
  "password": "Text*",
  "repassword": "Text*",
  "email": "Email*", //must be unique
  "firstName": "Text",
  "lastName": "Text",
  "department": "Text*",
  "designation": "Text*"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "token": "JWT_TOKEN",
    "data": {
      "teacher": {
        "_id": "600c591030da3d2fe7789afc",
        "role": "teacher",
        "email": "wolav2",
        "username": "Xdaa",
        "firstName": "Asif",
        "lastName": "Samir",
        "department": "swe",
        "varsity": "SUST",
        "designation": "Professor",
        "registered_at": "2021-01-23T17:12:48.876Z",
        "__v": 0
      }
    }
  }
}
```

#### Login

Request: `POST` `/auth/login`

Body:

```json
{
  "email": "Text*",
  "password": "Text*"
}
```

Response:

```json
{
  "status": "OK",
  "result": {
    "token": "JWT_TOKEN",
    "data": {
      "teacher": {
        "_id": "600c591030da3d2fe7789afc",
        "role": "teacher",
        "email": "wolav2",
        "username": "Xdaa",
        "firstName": "Asif",
        "lastName": "Samir",
        "department": "swe",
        "varsity": "SUST",
        "designation": "Professor",
        "registered_at": "2021-01-23T17:12:48.876Z",
        "__v": 0
      }
    }
  }
}
```

#### Access A Protected or Restricted Route

Add the JSON Web Token, you get by logging in or during registration, on the header like this.

Header:

```json
{
  "authorization": "Bearer JWT_TOKEN"
}
```

When the endpoint is restricted, it'd return a success response, only if the request comes from any allowed user.

#### Get Single Student Info

Request: `RESTRICTED (student/teacher)` `GET` `/student/:id`

Response:

```json
{
  "status": "OK",
  "result": {
    "data": {
      "student": {
        "_id": "600c58df30da3d2fe7789afb",
        "role": "student",
        "email": "rahoim",
        "username": "rahimo",
        "firstName": "Sania",
        "lastName": "Rahman",
        "department": "swe",
        "registrationNo": 2017831051,
        "varsity": "SUST",
        "session": "2017-2018",
        "registered_at": "2021-01-23T17:11:59.634Z",
        "__v": 0
      }
    }
  }
}
```

#### Get Single Teacher Info

Request: `RESTRICTED (student/teacher)` `GET` `/teacher/:id`

Response:

```json
{
  "status": "OK",
  "result": {
    "data": {
      "teacher": {
        "_id": "600c1dbaaafea2a9b4a4fc7e",
        "role": "teacher",
        "email": "wolv2",
        "username": "Xdd",
        "firstName": "Asif",
        "lastName": "Samir",
        "department": "swe",
        "varsity": "SUST",
        "designation": "Professor",
        "registered_at": "2021-01-23T12:59:38.171Z",
        "__v": 0
      }
    }
  }
}
```

### How to contribute :

- Clone the project :

  >       git clone  https://github.com/jspw/WillChange.git

- Change directory :

  >       cd WillChnage

- Install packages :

  >       npm install
