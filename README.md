#  Drop It 🗳

![imageedit_2_4621812953](https://user-images.githubusercontent.com/63386979/170892825-e1c906ff-37ec-4ffd-b427-0ec675dae8d1.jpg)


Fun and simple file storage :) This application is a mock Google Drive that enables the client to create an account, sign in, and drop their files as needed and attach an option caption to each one. Users can perform CRUD operations with uploading, opening, updating, and removing their files. The app's storage leverages Amazon's S3 solution.

## Tech Stack 💼
- Written in: JavaScript
- Authentification: AWS Cognito, AWS Amplify
- Frontend: React.js, Reactstap
- Backend: Node.js, AWS S3, AWS RDS (MySQL)
- Routing + Misc: React-Router-Dom, Express.js, CORS, Body-Parser

## Visuals ✨

### Sign Up View

<img width="1512" alt=" 2021-12-08 at 8 28 33 PM" src="https://user-images.githubusercontent.com/63386979/145334515-e14282dc-d568-49a8-a334-b57ed5336893.png">

Users can start by clicking `create account` where they will be asked to input their username, email address, password, and phone number.

<img width="470" alt="Screen Shot 2021-12-05 at 8 37 39 AM" src="https://user-images.githubusercontent.com/63386979/144755164-2f8d0b2d-98fe-41a8-b69d-b7372fa0154b.png">

After inputting valid details, the client will be given a unique authentification code to confirm their email address.

### Sign In View

<img width="1512" alt=" 2021-12-08 at 8 27 46 PM" src="https://user-images.githubusercontent.com/63386979/145334446-ab1f9fdf-71c6-437d-b7ce-21a3c8891f47.png">

After successful account creation, users will then be asked to sign in - they have been added to the pool in AWS Cognito.

### Home View (View Files View)

<img width="1512" alt=" 2022-06-12 at 8 32 22 PM" src="https://user-images.githubusercontent.com/63386979/173264157-9f3f23ec-3404-4fde-b13a-5b5b34bae670.png">

After being authenticated, you will be directed to the home screen where you can view all of your uploaded files. From here, you can download, edit, and/or delete your files to how you want it!

### Drop File View

<img width="1512" alt=" 2021-12-08 at 8 26 34 PM" src="https://user-images.githubusercontent.com/63386979/145334374-f957a984-f750-483a-b13d-8ec27d658519.png">

Upon heading over to `drop file` users will be greeted with this page where they can either drag and drop their files or manually click `Choose File` where they will be able to select their file from their local file manager.
- Note: `what should we call this?` and `what is this?` is completely **optional**.
