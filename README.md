Angular User Management App
This repository contains an Angular application for user management. The application includes both a client-side Angular app and a server-side Express app. User credentials are managed using Firebase Admin on the server side and Firebase + AngularFire on the client side.

Getting Started
Server
Navigate to the server directory:

bash
cd server/
Install the required dependencies:

bash
npm install
Start the Express server:

bash
npm start
The server will be running on http://localhost:3000.

Angular App
Install the Angular CLI globally (if not already installed):

bash
npm install -g @angular/cli
Navigate to the root directory:

bash
cd <project-root>
Install the required dependencies:

bash
npm install
Start the Angular app:

bash
ng serve
The Angular app will be running on http://localhost:4200.

Features
User CRUD Operations: The Angular app allows you to perform CRUD operations on user data, integrating with Firebase and AngularFire.

Server-Side User Management: The Express server in the /server directory uses Firebase Admin SDK to manage user credentials on the server side.

Firebase Configuration
Make sure to configure your Firebase project credentials in the following files:

/server/serviceAccountKey.json: Firebase Admin SDK service account key.
/src/environments/environment.ts and /src/environments/environment.prod.ts: Firebase client-side configuration.
Contributing
Feel free to contribute to the development of this project. If you encounter any issues or have suggestions, please open an issue.

License
This project is licensed under the MIT License.
