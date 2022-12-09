# Auth-Final

## Project: Auth Final

## Author: Zoe Gonzalez

### Problem Domain: This application was created in order to help me understand CRUD and SQL database management. This expands off yesterday's lab by employing class characteristic off of CRUD capabilities from the two created routes. It also introduces SQL relations.


..
GitHub Actions: 

Production Deployment: https://omg-shoes.onrender.com/

### Setup

#### env requirements

see `.env.sample`

PORT: 3001 

DATABASE_URL=postgres://localhost:5432/Auth-Final

## How to initalize application

'npm start'

'nodemon'

'npm test'

## How to use your library

-nodemon for starting

-npm test for testing

## Features / Routes

/ : automatically redirects you to the page.

/bad: Sends you to an error page.

/item: Sends you to a general item directory with the selected name. 

/item:id : Sends you to a general item directory with the selected and associated id. 

/download: Sends you to a general download directory with the selected name. 

/download:id : Sends you to a general item directory with the selected and associated id. 

/* : If the page is not available then an error flag is thrown.


![Workflow]()
