<p align="center">
  <a href="" rel="noopener">
 <img width=300px height=100px src="client\src\image\logo.png" alt="Project logo"></a>
 
</p>

<p align="center"> 

# TechniCorner

</p>


 ## Table of Contents

- About
- Getting Started
- Usage
- Built Using
- Guided By

## About

<p>This web app is an E-commerce platform aim to help all of kind of people either they are 
technicians , traders, industrials companies 
or even normal people looking for desired service or tool to buy it on-line and reserve technical consultant by direct chat and add goods to my own cart and wishlist
every thing available in our website </p>

## Getting Started

### prerequisites

<p>to use this app locally 
first you have to clone project files to your local machine 
so get the repository link and open your terminal in your local folder then insert



> git clone ** project file link **
now yo have project files on your machine and go to next step  </p>

![clone ](client\src\image\Screenshot_10.png)

you have to install all these packages and dependencies 

**backend :**

>

- "bcrypt": "^5.0.1",
- "cloudinary": "^1.28.1",
- "cloudinary-react": "^1.7.1",
- "cors": "^2.8.5",
- "dotenv": "^14.3.2",
- "emailjs": "^3.7.0",
- "express": "^4.17.2",
- "fs": "^0.0.1-security",
- "jsonwebtoken": "^8.5.1",
- "mysql2": "^2.3.3",
- "nodemailer": "^6.7.2",
- "puppeteer": "^13.1.3",
- "socket.io": "^4.4.1"
  >

**frontend:**

>

- "@material-ui/lab": "^4.0.0-alpha.60",
- "@paypal/react-paypal-js": "^7.6.0",
- "@testing-library/jest-dom": "^5.16.1",
- "@testing-library/react": "^12.1.2",
- "@testing-library/user-event": "^13.5.0",
- "axios": "^0.24.0",
- "bootstrap": "^5.1.3",
- "chart.js": "^3.7.1",
- "cloudinary": "^1.28.1",
- "cloudinary-react": "^1.7.1",
- "emailjs": "^3.7.0",
- "emailjs-com": "^3.2.0",
- "jwt-decode": "^3.1.2",
- "paginate": "^0.1.1",
- "react": "^17.0.2",
- "react-chartjs-2": "^4.0.1",
- "react-charts": "^3.0.0-beta.35",
- "react-dom": "^17.0.2",
- "react-google-login": "^5.2.2",
- "react-icons": "^4.3.1",
- "react-paginate": "^8.1.0",
- "react-rating-stars-component": "^2.2.0",
- "react-redux": "^7.2.6",
- "react-router-dom": "^6.2.1",
- "react-scripts": "^3.0.1",
- "react-scroll": "^1.8.4",
- "react-select": "^5.2.2",
- "recharts": "^2.1.9",
- "redux": "^4.1.2",
- "socket.io-client": "^4.4.1",
- "sweetalert2": "^11.4.0",
- "sweetalert2-react-content": "^4.2.0",
- "timeago.js": "^4.0.2",
- "web-vitals": "^2.1.2"
  >


To install all these backend  open this directory  MERAKI_Academy_Project_5 and 
open your terminal  and run **npm i**


To install all these frontend once time open this directory MERAKI_Academy_Project_5 ==>> client  and open your terminal and run **npm i**


After download all these start your frontend and back end servers like this

- **npm run dev** to start backend server (in your terminal)
- **npm start** to start frontend server (in your terminal)    




## adding .env files 
    this app need to create two  .env files both in frontend directory and frontend too because it contain parameters to turn on the servers and database and other authintications process

- **backend .env**
  this file should contain this data

        DB_HOST=localhost  
        DB_USER=root  
        DB_PASS=0000  
        DB_NAME=meraki_academy_project_5  
        SECRET=Errors  
        SALT=7

- **frontend .env**
  this file should contain this data

        REACT_APP_PAYPAL_CLIENT_ID=ATjDMtRAwzqeDbbtLbnYT_GKlkbXPA0HR3LmnHQge6x4TTt_tRF2v0mDjCFV3XKfju8ZsYfY5mGtY-Q0  
        REACT_APP_SOCKET_URL=http://localhost:5000
- **create the database**
    hou have to create new database to store all the inserted data
    you already have schema.sql file in database file
    to create the new database just open your terminal and write this code

    > mysql -u root <"database.schema.sql" -p;

    now you ready to develope ths site

### installation

    after get a copy of this project file and turn on the backend and frontend servers now you able to start development this project


## Usage

this web app aim to help many types of users so if you looking for service of buy a tool (user)

or if you are a professional technician and want to promote your self (worker)
and even if you are an store owner or an industrial company and want to promote your products
you can put your products here by contact by the official email to arrange with admins

so if you are normal user you can sign up in the website by enter your name and your email

what can you do .

- register as (user),(worker),(admin)
- log in as (user),(worker),(admin)
- upgrade from user to worker
- add item to home page (admin)
- add item to cart and wishlist (user)
- make E-buy process by paypal (user)
- make rate on any item
- reserve service order with certain worker
- chat with this worker
- accept or reject service request and send response by email
- send feed back about you experience

so if you are technician want to promote your service you have upgrade your account as a worker to get full benefits of this app as a worker and then publish your skills to be available for others user

<p >
  <a href="" rel="noopener">
 <img width=500px height=100px src="client\src\image\Screenshot_3.png" alt="Project logo"></a>
 
</p>
then fill all this fields

<p >
  <a href="" rel="noopener">
 <img width=500px height=300px src="client\src\image\Screenshot_4.png" alt="Project logo"></a>
 
</p>
then ... 

<p >
  <a href="" rel="noopener">
 <img width=500px height=300px src="client\src\image\Screenshot_5.png" alt="Project logo"></a>
 
</p>
now you become a worker and you can receive  all the work request in the table then you can accept or reject this request and send response direct to the user by his email .    




## Project Management System   


- Trello link : https://trello.com/b/igXmYaUW/merakiacademyproject5

## Data Model   


<img width=800px height=400px src="client\src\image\er_database.png" alt="ER diagram">

## Built Using  


- Postman - client side locally
- MySQL - Database
- Express JS - Server Framework
- React JS - Frontend UI
- Node JS - Server Environment
- phpAdmin - Deployment Database
- Heroko - Deployment Platform

## Contact

for more details ..  
<c4project05@gmail.com>  
<https://technicorner.herokuapp.com/>

## Guided By

This project is guided by ©️ **MERAKI Academy 2022**
