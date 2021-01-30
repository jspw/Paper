# Backend (API)

## Table :

- [API Documentation](#api-documentation)

  - [Authorization](#authorization)

    - [Registration](#registration)

      - [Create Student](#create-student)
      - [Create Teacher](#create-teacher)

    - [Login](#login)

    - [Access A Protected or Restricted Route](#access-a-protected-or-restricted-route)

  - [Users](#users)

    - [Get A Single Student Info](#get-a-single-student-info)
    - [Get A Single Teacher Info](#get-a-single-teacher-info)
    - [Edit Teacher Info](#edit-teacher-info)
    - [Edit Student Info](#edit-student-info)

  - [Course](#course)

    - [Create Course](#create-course)

    - [Create Exam](#create-exam)

      - [Create MCQ Exam](#create-mcq-exam)
      - [Create CQ Exam](#create-cq-exam)

    - [Create Question](#create-question)

      - [Create Mcq Question](#create-mcq-question)
      - [Create Cq Question](#create-cq-question)

    - [Student Course Add](#student-course-add)

- [How To Contribute](#how-to-contribute)

## Contents :

### API Documentation

#### Authorization

##### Registration

###### Create Student

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
  "department": "ID OBJECT",
  "varsity": "ID OBJECT",
  "registrationNo": "Number*",
  "session": "Text*" //[2015-2016,2016-2017,2017-2018,2019-2019]
}
```

Example :

```json
{
  "role": "Student",
  "username": "mhs",
  "password": "123456",
  "email": "mehedi17@sust.edu",
  "firstName": "Shifat",
  "lastName": "Rahman",
  "repassword": "123456",
  "department": "600c75f1059f3d6697f4e93a",
  "varsity": "600c75f1059f3d6697f4e931",
  "registrationNo": "2017831051",
  "session": "2017-2018"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "jwt": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkOTQ0YjUxMDVjMDcyZTE5NGVjYWYiLCJpYXQiOjE2MTE1MDI2NjcsImV4cCI6MTYxMTU4OTA2N30.tEk6td7RvzmBh_9zJE4Gy888LSMjWAlrTies1sA0P9M",
      "expiresIn": "24h"
    },
    "data": {
      "user": "student",
      "id": "600d944b5105c072e194ecaf"
    }
  }
}
```

###### Create Teacher

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
  "department": "ID OBJECT",
  "varsity": "ID OBJECT",
  "designation": "Text*"
}
```

Example :

```json
{
  "role": "Teacher",
  "username": "shifat",
  "password": "123456",
  "email": "sania@sust.edu",
  "firstName": "Mazah",
  "lastName": "Kafi",
  "repassword": "123456",
  "department": "600c75f1059f3d6697f4e93a",
  "varsity": "600c75f1059f3d6697f4e931",
  "designation": "Professor",
  "session": "2017-2018"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "jwt": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkOTI4NjQzYjQ2MDcwZmRlYzdlYzMiLCJpYXQiOjE2MTE1MDIyMTQsImV4cCI6MTYxMTU4ODYxNH0.z0dxESRK9ux-dOzhPl6t_Qv057rjJ74M-WSTUd9Yfvk",
      "expiresIn": "24h"
    },
    "data": {
      "user": "teacher",
      "id": "600d928643b46070fdec7ec3"
    }
  }
}
```

###### Login

Request: `POST` `/auth/login`

Body:

```json
{
  "email": "Text*",
  "password": "Text*"
}
```

Response: (Teacher)

```json
{
  "status": "OK",
  "result": {
    "jwt": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkYjc1NmY4NWU2N2MxYzg1ZGNiNmMiLCJpYXQiOjE2MTE1MTE2NTcsImV4cCI6MTYxMTU5ODA1N30.AyeGvocVfynHUgx_MNPsStWSIXuu-3t_fnaj8_ErpQ8",
      "expiresIn": "24h"
    },
    "data": {
      "id": "600db756f85e67c1c85dcb6c",
      "role": "teacher",
      "email": "kafi@@sust.edu",
      "username": "Kofi",
      "firstName": "Mazah",
      "lastName": "Kafi",
      "department": "SWE",
      "designation": "Professor",
      "registered_at": "2021-01-24T18:07:18.998Z",
      "varsity": "SUST"
    }
  }
}
```

Response : (Student)

```json
{
  "status": "OK",
  "result": {
    "jwt": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkOTU0YmI5MzFkZDc2NmIxNjE1MGQiLCJpYXQiOjE2MTE1MTE3MTAsImV4cCI6MTYxMTU5ODExMH0.fOJJ7_PrSGMZJdWxGptouksSABAw-kwWhxhlEZKv5xQ",
      "expiresIn": "24h"
    },
    "data": {
      "id": "600d954bb931dd766b16150d",
      "role": "student",
      "email": "mehedi17@sust.edu",
      "username": "mhs",
      "firstName": "Shifat",
      "lastName": "Rahman",
      "department": "SWE",
      "registrationNo": 2017831051,
      "session": "2017-2018",
      "registered_at": "2021-01-24T15:42:03.248Z",
      "varsity": "SUST"
    }
  }
}
```

###### Access A Protected or Restricted Route

Add the JSON Web Token, you get by logging in or during registration, on the header like this.

Header:

```json
{
  "authorization": "Bearer JWT_TOKEN"
}
```

When the endpoint is restricted, it'd return a success response, only if the request comes from any allowed user.

#### Users

##### Get Single Student Info

Request: `RESTRICTED (student/teacher)` `GET` `/student/:id`

Response:

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "600d954bb931dd766b16150d",
      "role": "student",
      "email": "mehedi17@sust.edu",
      "username": "mhs",
      "firstName": "Shifat",
      "lastName": "Rahman",
      "department": "SWE",
      "registrationNo": 2017831051,
      "session": "2017-2018",
      "registered_at": "2021-01-24T15:42:03.248Z",
      "varsity": "SUST"
    }
  }
}
```

##### Get Single Teacher Info

Request: `RESTRICTED (student/teacher)` `GET` `/teacher/user/:id`

Response:

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "600db756f85e67c1c85dcb6c",
      "role": "teacher",
      "email": "kafi@@sust.edu",
      "username": "Kofi",
      "firstName": "Mazah",
      "lastName": "Kafi",
      "department": "SWE",
      "designation": "Professor",
      "registered_at": "2021-01-24T18:07:18.998Z",
      "varsity": "SUST"
    }
  }
}
```

### Edit Teacher Info

Request: `RESTRICTED (teacher)` `GET` `/teacher/user/edit/:id`

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "601190c8d8174b3e23a5460b",
      "role": "Teacher",
      "email": "sania@@sust.edu",
      "username": "shifat",
      "firstName": "Mazah",
      "lastName": "Kafi",
      "department": "SWE",
      "designation": "Professor",
      "registered_at": "2021-01-27T16:11:52.895Z",
      "varsity": "SUST"
    }
  }
}
```

Request: `RESTRICTED (teacher)` `POST` `/teacher/user/edit/:id`

Body :

```json

```

Example :

```json
{
  "password": "123456",
  "repassword": "123456",
  "username": "kofi",
  "firstName": "Mazah",
  "lastName": "Kafi",
  "department": "600c75f1059f3d6697f4e93a",
  "designation": "Professor"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "601190c8d8174b3e23a5460b",
      "role": "Teacher",
      "email": "mehedi17@sust.edu",
      "username": "kofi",
      "firstName": "Mazah",
      "lastName": "Kafi",
      "department": "SWE",
      "designation": "Professor",
      "varsity": "SUST",
      "registered_at": "2021-01-27T16:11:52.895Z"
    }
  }
}
```

### Edit Student Info

Request: `RESTRICTED (student)` `GET` `/student/user/edit/:id`

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "60119244d8174b3e23a5460c",
      "role": "Student",
      "email": "shifat@sust.edu",
      "username": "mahs",
      "firstName": "Shifat",
      "lastName": "Rahman",
      "registrationNo": 2017831051,
      "department": "CSE",
      "session": "2017-2018",
      "registered_at": "2021-01-27T16:18:12.244Z",
      "varsity": "HSTU"
    }
  }
}
```

Request: `RESTRICTED (student)` `POST` `/student/user/edit/:id`

Body :

```json

```

Example :

```json
{
  "password": "123456",
  "repassword": "123456",
  "email": "shifat@buet.edu",
  "username": "shifat",
  "firstName": "Shifat",
  "lastName": "Rahman",
  "department": "600eeb069c34055b3963adff",
  "registrationNo": "2017831051",
  "session": "2017-2018"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "id": "6011ac5d686fe0754e88d3ca",
      "role": "Student",
      "email": "shifat@buet.edu",
      "username": "shifat",
      "firstName": "Shifat",
      "lastName": "Rahman",
      "department": "URP",
      "registrationNo": 2017831051,
      "session": "2017-2018",
      "varsity": "BUET",
      "registered_at": "2021-01-27T18:09:33.744Z"
    }
  }
}
```

### Course

#### Create Course

Request: `RESTRICTED (teacher)` `POST` `/teacher/course/create`

Body :

Example :

```json
{
  "name": "Algebra",
  "code": "MAT101",
  "department": {
    "name": "CSE",
    "id": "600c75f1059f3d6697f4e93b"
  },
  "varsity": {
    "name": "SUST",
    "id": "600c75f1059f3d6697f4e931"
  }
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "creationDate": "2021-01-26T13:15:47.213Z",
      "_id": "60101629eab66d4434084582",
      "name": "Algebra",
      "code": "MAT101",
      "department": {
        "name": "CSE",
        "id": "600c75f1059f3d6697f4e93b"
      },
      "varsity": {
        "name": "SUST",
        "id": "600c75f1059f3d6697f4e931"
      },
      "mcqExams": [],
      "cqExams": [],
      "__v": 0
    }
  }
}
```

### Create Question

#### Create Mcq Question

Request: `RESTRICTED (teacher)` `POST` `/teacher/question/mcq/create`

Body :

Example :

```json
{
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  "mainQuestion": "What is this?",
  "options": [
    {
      "option": "ASASA"
    },
    {
      "option": "TTTT"
    },
    {
      "option": "UUUdsa"
    },
    {
      "option": "UUUU"
    }
  ],
  "correctAnswers": [
    {
      "answer": "AAAAA"
    },
    {
      "answer": "YYYYY"
    }
  ],
  "time": 60,
  "marks": 1
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "_id": "60101dd40224a2573546d35e",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      "mainQuestion": "What is this?",
      "options": [
        {
          "_id": "60101dd40224a2573546d35f",
          "option": "ASASA"
        },
        {
          "_id": "60101dd40224a2573546d360",
          "option": "TTTT"
        },
        {
          "_id": "60101dd40224a2573546d361",
          "option": "UUUdsa"
        },
        {
          "_id": "60101dd40224a2573546d362",
          "option": "UUUU"
        }
      ],
      "correctAnswers": [
        {
          "_id": "60101dd40224a2573546d363",
          "answer": "AAAAA"
        },
        {
          "_id": "60101dd40224a2573546d364",
          "answer": "YYYYY"
        }
      ],
      "time": 60,
      "marks": 1,
      "__v": 0
    }
  }
}
```

#### Create CQ Question

Request: `RESTRICTED (teacher)` `POST` `/teacher/question/cq/create`

Body :

Example :

```json
{
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
  "mainQuestion": "sdasa sf asfas fsafasfasf ?",
  "time": 120,
  "marks": 10
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "creationTime": "2021-01-26T15:22:53.207Z",
      "_id": "6010356b75bad87bb49e330d",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      "mainQuestion": "sdasa sf asfas fsafasfasf ?",
      "time": 120,
      "marks": 10,
      "__v": 0
    }
  }
}
```

### Create Exam

#### Create MCQ Exam

Request: `RESTRICTED (teacher)` `POST` `/teacher/exam/mcq/create`

Body :

```json

```

Example :

```json
{
  "course": "6010146ccf36944122caf45b",
  "mcqQuestions": [
    {
      "mcqQuestionId": "60101c05152a71544b170e8b"
    },
    {
      "mcqQuestionId": "60101d7f0224a2573546d357"
    },
    {
      "mcqQuestionId": "60101dd40224a2573546d35e"
    }
  ],
  "totalTime": "30",
  "totalMarks": 100,
  "date": "11/12/2016,13:00"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "_id": "6010311c79e31e763e1fe5a8",
      "course": "6010146ccf36944122caf45b",
      "mcqQuestions": [
        {
          "_id": "6010311c79e31e763e1fe5a9",
          "mcqQuestionId": "60101c05152a71544b170e8b"
        },
        {
          "_id": "6010311c79e31e763e1fe5aa",
          "mcqQuestionId": "60101d7f0224a2573546d357"
        },
        {
          "_id": "6010311c79e31e763e1fe5ab",
          "mcqQuestionId": "60101dd40224a2573546d35e"
        }
      ],
      "totalTime": 30,
      "totalMarks": 100,
      "date": "2016-11-12T07:00:00.000Z",
      "__v": 0
    }
  }
}
```

#### Create CQ Exam

Request: `RESTRICTED (teacher)` `POST` `/teacher/exam/cq/create`

Body :

```json

```

Example :

```json
{
  "course": "6010146ccf36944122caf45b",
  "cqQuestions": [
    {
      "cqQuestionId": "6010343c75bad87bb49e3309"
    },
    {
      "cqQuestionId": "6010345675bad87bb49e330a"
    },
    {
      "cqQuestionId": "6010346975bad87bb49e330b"
    }
  ],
  "totalTime": "60",
  "totalMarks": 100,
  "date": "11/12/2016,15:00"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": {
      "_id": "6010364ee995357d92168583",
      "course": "6010146ccf36944122caf45b",
      "cqQuestions": [
        {
          "_id": "6010364ee995357d92168584",
          "cqQuestionId": "6010343c75bad87bb49e3309"
        },
        {
          "_id": "6010364ee995357d92168585",
          "cqQuestionId": "6010345675bad87bb49e330a"
        },
        {
          "_id": "6010364ee995357d92168586",
          "cqQuestionId": "6010346975bad87bb49e330b"
        }
      ],
      "totalTime": 60,
      "totalMarks": 100,
      "date": "2016-11-12T09:00:00.000Z",
      "__v": 0
    }
  }
}
```

#### Student Course Add

Body :

```json

```

Example :

```
{
    "course": "6010146ccf36944122caf45b"
}
```

Response :

```json
{
  "status": "OK",
  "result": {
    "data": [
      {
        "_id": "601588d62b5c967ed130e8f4",
        "course": {
          "department": "600c75f1059f3d6697f4e93a",
          "varsity": "600c75f1059f3d6697f4e931",
          "creationDate": "2021-01-26T13:09:00.285Z",
          "_id": "6010146ccf36944122caf45b",
          "name": "Algebra",
          "code": "MAT101",
          "mcqExams": [],
          "cqExams": [],
          "__v": 0
        }
      }
    ]
  }
}
```

### How to contribute

- Clone the project :

  >       git clone  https://github.com/jspw/WillChange.git

- Change directory :

  >       cd WillChnage

- Replace `MONGODB_URL` in [`.env`](.env) file

- Install packages :

  >       npm install

- Run server :

  >     npm start
