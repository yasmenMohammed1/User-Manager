Angular User Management
# Project Title

This repository contains an Angular application for user management. The application includes both a client-side Angular app and a server-side Express app. User credentials are managed using Firebase Admin on the server side and Firebase + AngularFire on the client side.

Getting Started


## Get Started
To run the application, follow these steps:

### Server
Navigate to the server directory:




## Run the server


```bash
  cd server/
  npm install
  npm start

```
The server will be running on http://localhost:4000.



## Run Angular App
```bash
  ng serve
```
The Angular app will be running on http://localhost:4200.


## Features
User CRUD Operations: The Angular app allows you to perform CRUD operations on user data, integrating with Firebase and AngularFire.

Server-Side User Management: The Express server in the /server directory uses Firebase Admin SDK to manage user credentials on the server side.




## Firebase Configuration

To run this project, you will need to clone the app or update these file with your own files

`/server/firebase.sdk.js`

`firebase.config.ts`

