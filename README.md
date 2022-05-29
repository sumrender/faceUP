# <p align ="center" >faceUP!</p>

## <p align ="center" >Engage yourself with our cutting edge FACE Technology.</p>

<p align ="center" ><img src="https://i.imgur.com/TmY0Fp9.jpg" height="350px" alt="Homepage"/></p>

## <p  align="center"><a href="https://m-teams.herokuapp.com/">WebApp Link</a></p>

## <p  align="center"><a href="https://www.youtube.com/watch?v=BpAVZUF0sgg">Presentation Video</a></p>

## <p  align="center"><a href="https://www.postman.com/science-candidate-20862179/workspace/engage-2022">Postman Collection</a></p>

## Table of Contents 📕

- [Installation](#installation)
- [About the Challenge](#microsoft-engage-2022)
- [Agile development methodology](#agile-development-methodology)
- [Features](#features-)
- [Future Work](#future-work)
- [Gallery](#gallery)
- [References](#references)

## Installation:

### Clone the git repository:

- ### Frontend

  - `cd frontend`
  - `npm i` to install the dependencies
  - `npm run start` to start the react app
  - create .env file inside frontend folder for the following variables:
  - `REACT_APP_STRIPE_API_KEY` for stripe payments
  - `REACT_APP_FACE_API_ENDPOINT` and ` REACT_APP_FACE_API_KEY` for Azure Face Detection API

- ### Backend

  - `npm i` in the root folder to install dependencies
  - `npm run start` to run the server
  - `npm run dev` to run in development mode
  - create .env file in root folder for the following variables:

  `PORT=8000` | `DB_URI="mongodb://localhost/MernECommerce"` |
  `CLOUD_DB_URI` | `STRIPE_API_KEY` | `STRIPE_SECRET_KEY` | `JWT_SECRET`
  `JWT_EXPIRE` | `COOKIE_EXPIRE` | `SMPT_SERVICE` | `SMPT_HOST` | `SMPT_PORT`
  | `TWILIO_AUTH_TOKEN` | `TWILIO_ACCOUNT_SID`

# Microsoft Engage-2022

## The Challenge:

- Develop a browser-based application or a native mobile application to demonstrate application of Face Recognition technology
- Idea: eCommerce Store using Face Recognition

## Features :

- Face Features detection using Azure API
- Virtual Try-on for Glasses
- Authentication using JWT
- Data hosted on Cloud Mongo Database.
- Redux state management
- Products Page with Filters
- Cart
- Payment using Stripe
- WhatsApp order message using Twilio API

<br />

## Technologies Used

### Tech Stack

    - MongoDB
    - Express
    - React Js
    - Node

## Languages

    - HTML
    - CSS
    - JavaScript

## Tools Used

    - VS Code Editor
    - Postman
    - Github

# Future Work

- Include Celebrity look alike feature and corresponding recommendations.
- Accessory Recommendations.

# Agile development Methodology

- I divided the one-month program into four sprints. Each sprint consisted of one week period.
- I categorized my sprints into four sections

  - Exploration
  - Core Functionality
  - Frontend and Backend Integration
  - Features and UI

- We were given a problem statements in which we had to demonstrate the use of domains given.
- <u> First week</u>: Researched the domains given. I even implemented 1 simple application each in both machine learning and face recognition with the help of blogs and youTube. After that and taking the practical exams into consideration, I decided to work on face recognition.
  Then I spent the week on setting up basic backend and API calls.
- <u> Second week</u>: Completed the core functionality i.e. calling the API, setting fake data and recommending the products based on parameters received from the Azure API. Then I worked on the various features in backend.
- <u> Third week:</u> Finished the backend and set up simple frontend.
- <u>Fourth week</u>, I worked on frontend and adding more functionalities like authentication and payment system. Fixed some bugs.

<br/>

# References

- https://www.youtube.com/watch?v=4mOkFXyxfsU
- https://dev.to/shubham1710/build-an-e-commerce-website-with-mern-stack-part-1-setting-up-the-project-1l2d
