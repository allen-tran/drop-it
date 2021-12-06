# drop it! - Fun and Simple File Storage 🗳
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
$ cd app
$ npm start
```
```
$ cd app/server
$ node server.js
```

## Visuals

1. Sign Up View
<img width="1512" alt="Screen Shot 2021-12-05 at 8 33 52 AM" src="https://user-images.githubusercontent.com/63386979/144755040-9ead17a8-b7c2-465b-90de-d7163046a192.png">

*users can start by clicking `create account` where they will be asked to input their username, email address, password, and phone number*

<img width="470" alt="Screen Shot 2021-12-05 at 8 37 39 AM" src="https://user-images.githubusercontent.com/63386979/144755164-2f8d0b2d-98fe-41a8-b69d-b7372fa0154b.png">

*after inputting valid details, the client will be given a unique authentification code to confirm their email address*

2. Sign In View
<img width="1512" alt="Screen Shot 2021-12-05 at 8 31 00 AM" src="https://user-images.githubusercontent.com/63386979/144754961-577e073b-56ac-4bb0-a679-6b7f722c4866.png">

*after successful account creation, users will then be asked to sign in - they have been added to the pool in AWS Cognito*

3. Home View (View Files View)

*in progress*


4. Drop File View

![image](https://user-images.githubusercontent.com/63386979/144887109-1edecde8-8455-4825-b68c-c74e3650e1cd.png)

-   *upon heading over to `drop file` users will be greeted with this page where they can either drag and drop their files or manually click `Choose File` where they will be able to select their file from their local file manager*
-   *note: `what should we call this?` and `what is this?` is completely **optional***

