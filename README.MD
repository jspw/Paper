<p align="center">
<img align="center" alt="logo" width="250" src='assets/logo/logo.png'>
<h3 align="center">Paper (An Online Exam Management System)</h3>
</p>

# Table :

- [Table :](#table-)
  - [Introduction](#introduction)
  - [Description](#description)
    - [Roles](#roles)
    - [Features](#features)
      - [Exam Features](#exam-features)
      - [Teacher's Features](#teachers-features)
      - [Student's Features](#students-features)
  - [Technogogies](#technogogies)
  - [Source Code](#source-code)
  - [Whole Project SS](#whole-project-ss)
  - [About Developers](#about-developers)

## Introduction

This is a web based application to manage online examinations.

## Description

Our web based online exam management system is capable of arranging exams and taking tests. We mainly focus on taking CQ and MCQ exams arrranged by Teachers.

### Roles

There are two types of roles :

1. Student
2. Teacher

### Features

Our main features are

#### Exam Features

- Both CQ and MCQ exams
  ![exam type](assets/ss/teacher/exam-create.png)
- Setting time and date for exams
  ![](assets/ss/teacher/set-exam.png)
- Setting time for per cq and mcq questions

  - MCQ
    ![mcq exam set](assets/ss/teacher/mcq-create.png)
  - CQ
    ![cq exam set](assets/ss/teacher/cq-create.png)

- Realtime exam

  - MCQ
    ![live exam mcq](assets/ss/studnt/live-exam-mcq.png)
  - CQ
    ![live exam cq](assets/ss/studnt/live-exam-cq.png)

- Feedback options for each questions
  ![report](assets/ss/studnt/report-question.png)
- Alert notifications for changing windows or tabs on exam time (this counts will be shown to the teacher)
  ![notification](assets/ss/studnt/tab-chnage-alert.png)
  - Disable question copy/cut
  - Disbale copy/paste on answer textfield

#### Teacher's Features

- Course Create
  ![course create](assets/ss/teacher/course-create.png)
- able to set exams for specific date and time
- Checking marksheet after exam
  ![marksheet](assets/ss/teacher/marksheet.png)
- Checking and marking CQ exams
  ![examine](assets/ss/teacher/examine-cq2.png)

#### Student's Features

- Realtime notifications of -
  - Course creation
    ![notification](assets/ss/studnt/course-create-notification-realtime.png)
  - exam creation
  - CQ result publication
- All Notifications :
  - ![](assets/ss/studnt/notifications.png)
- Upcoming Exam countdown on homepage
  ![](assets/ss/upcoming-exam-countdown.png)
  ![](assets/ss/exam-running.png)
- Able to check their paper later

  - MCQ :

    - Participated :
      ![](assets/ss/studnt/previos-exam.png)
    - Not participated :
      ![](assets/ss/studnt/previous-exam-non-participate.png)

  - CQ :
    ![](assets/ss/studnt/previous%20cq.png)

- Report per question if anything goes wrong

## Technogogies

- Frontend

  - Framework

    - React Js

  - UI Design

    - React Bootstrap
    - Material UI

- Backend

  - Framework

    - ExpressJs

    - API
      - RESTFull API

- Database

  - MongoDB

- Realtime Integration
  - SocketIO

## Source Code

- [Client](client/)

- Server
  - [API](server/)

## Whole Project SS

![signup](assets/ss/signup.png)
![signin](assets/ss/signin.png)
![home](assets/ss/home.png)
![upcoming-exam](assets/ss/studnt/upcoming-exam.png)
![previos-exam](assets/ss/studnt/previos-exam.png)
![all-exams](assets/ss/teacher/all-exams.png)
![live-exam](assets/ss/live-exam.png)

## About Developers

- [Sania Sayeda Rahman](https://github.com/sania51)
- [Mehedi Hasan Shifat](https://github.com/jspw)
