 <img src="/picsForDocs/logoForGitHub.png" alt="My cool logo"/>

### A brief description of what this project is :
This is an academic project that I developed when I was learning my Web Development subject, the goal of this web site was to recreate a forum with the same goal of StackOverFlow, create a forum for programmers to interact with each other and solve problems. I implemented this website with Node.js and Express Framework for the back-end and applying MVC architecture , for the front-end we used HTML with Handlebars and pure CSS , we also modeled a database and implemented using MySQL.
This project allowed me to understand better the MVC architecture, also made me understand how worked an integration between back-end - Database and Back-End -- Front-End.
In the end I got a grade of 17.5 / 20 as a result of my project.

## Screenshots : 

<img src="/picsForDocs/MONTAGE.png" alt="PICTURES OF THE PROJECT"/>

## Features

As User
- Ask Question 
- Reply Questions
- Login
- Create Account
- Mark right answer
- Report Questions / Anwsers

As Admin

- Remove or accept reported Questions
- Remove or accept reported Answers

## Tech Stack

**Front-End :** HTML5, CSS , HandleBars

**Back-End :** Node, Express

**DataBase :** MySQL

#### Technical Specifications : 


| Dependencies | Version  |
| :--------    | :------- |
| `express`            | `~4.16.1`|
|   `better-sqlite3`   | `^5.0.1` |
|   `bcrypt`           | `^7.5.0 `|
| `cookie-parser`      | `^1.4.6` |
| `express-session`    | `^1.17.2`|
| `hbs`                | `^1.4.6` |
| `http-errors `       | `~1.6.3` |
| `morgan`             | `~1.9.1` |
| `session`            | `^0.1.0` |


## Installation

First clone the project on your machine:
```bash
  git clone https://github.com/Edufalcao14/Illegal-Argument-Forum.git
```
Go to the project folder :
```bash
  cd {{path project}}
```
Inse of the project folder :
Create a new fille named "config.js" and inside cole this :
```bash
"module.exports = {
    secret: "123",
    dbPath: "{{path to BD}}"
    // Change the "{{path to BD}}" to the path of the database in your machine.
};"
```
After this install the dependencies

```bash
  npm install
```

And start the project 

```bash
  npm start
```
###

### If you have ideas on how to improve the project or fix any bugs and errors , please contact me via my LinkedIn or Email

##### My social Medias :

[![Linked In](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/edusampaiofalcao/)
[![Linked In](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=CllgCJvlHtkcnfxKRDDrzHRgJQKWqRVwfgXZRMSQprcjfnrKbCMvPcgkgGTvmtcHCGPqWxzRTdB)
