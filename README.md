#  <p align="center">drop it! - Fun and Simple File Storage 🗳</p>
*This application is a mock Google Drive that enables the client to create an account, sign in, and drop their files as needed. Users can upload, open, update, and remove their files.*

## <p align="center">Tech Stack 💼</p>
- Written in: JavaScript
- Authentification: AWS Cognito, AWS Amplify
- Frontend: React.js, Reactstap, CSS
- Backend: Node.js, AWS S3, AWS RDS (MySQL)
- Routing + Misc: React-Router-Dom, Express.js, CORS, Body-Parser

##  <p align="center">Database Schema 🗺</p>
### **Files Table**

| Field | Type | Null | Key | Default | Extra |
|-------|------|------|-----|---------|-------|
| entry_id | int(11) | NO | PRI | NULL | auto_increment|
| file_id | varchar(255) | NO |   | NULL | |
| user_id | varchar(255) | NO |   | NULL | |
| title | varchar(255) | NO |   | NULL | |
| description | varchar(255) | YES |   | NULL | |
| size | int(11) | NO |   | NULL | |
| uploaded_time | time_stamp | YES |   | NULL | |
| updated_time | time_stamp | YES |   | NULL | |



### **Users Table**

| Field | Type | Null | Key | Default |
|-------|------|------|-----|---------|
| id | varchar(255) | NO | PRI | NULL |
| first_name | varchar(255) | YES |   | NULL |
| last_name | varchar(255) | YES |   | NULL |

##  <p align="center">Getting Started 🕹</p>
1. Clone the repository 👯‍♂️
```
$ git clone https://github.com/allen-tran/Drop-It
```
3. Install the Dependencies 📥
```
$ cd app
$ npm i
```
4. Configure the Database 📦
* navigate to config folder
* copy example.config.json into folder
* replace `X` with database details (only admin is able to do so)


5. Run the Server and Client 🏃‍♂️
```
$ cd app
$ npm start
```
```
$ cd app/server
$ node server.js
```

##  <p align="center">Visuals ✨</p>

### 1. Sign Up View

<img width="1512" alt=" 2021-12-08 at 8 28 33 PM" src="https://user-images.githubusercontent.com/63386979/145334515-e14282dc-d568-49a8-a334-b57ed5336893.png">

- users can start by clicking `create account` where they will be asked to input their username, email address, password, and phone number

<img width="470" alt="Screen Shot 2021-12-05 at 8 37 39 AM" src="https://user-images.githubusercontent.com/63386979/144755164-2f8d0b2d-98fe-41a8-b69d-b7372fa0154b.png">

- after inputting valid details, the client will be given a unique authentification code to confirm their email address

### 2. Sign In View

<img width="1512" alt=" 2021-12-08 at 8 27 46 PM" src="https://user-images.githubusercontent.com/63386979/145334446-ab1f9fdf-71c6-437d-b7ce-21a3c8891f47.png">

- after successful account creation, users will then be asked to sign in - they have been added to the pool in AWS Cognito

### 3. Home View (View Files View)

- *in progress*


### 4. Drop File View

<img width="1512" alt=" 2021-12-08 at 8 26 34 PM" src="https://user-images.githubusercontent.com/63386979/145334374-f957a984-f750-483a-b13d-8ec27d658519.png">

- upon heading over to `drop file` users will be greeted with this page where they can either drag and drop their files or manually click `Choose File` where they will be able to select their file from their local file manager
- note: `what should we call this?` and `what is this?` is completely **optional**
