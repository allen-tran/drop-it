# drop it! - Fun and Simple File Storage
This application is a mock Google Drive that enables the client to create an account, sign in, and drop their files as needed. Users can upload, open, update, and remove their files.

## Tools Used
- Written in: JavaScript
- Authentification: AWS Cognito, AWS Amplify
- Frontend: React.js, CSS
- Routing: Express.js, CORS, Body Parser
- Backend: Node.js, AWS S3, AWS RDS (MySQL)

## Getting Started
1. Clone the repository 
```
$ git clone https://github.com/allen-tran/Drop-It
```
3. Install the dependencies 
```
$ cd app
$ npm i
```
4. Configure the Database
* navigate to config folder
* copy example.config.json into folder
* replace `X` with database details (only admin is able to do so)


5. Run the Server and Client
```
$ npm start
```
```
$ node server.js
```
