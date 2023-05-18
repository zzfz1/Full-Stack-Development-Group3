# Web Commerce Website
Welcome to Group 3 repository! This project is a web-based e-commerce platform developed using
[React, Chakra, Vite, CORS, ].
## Official Deployment Links: 
#### [Client official Link](https://web-shop-group-3.web.app/) 
#### [Admin official Link](https://admin-group-3.web.app/)

# Table of Contents
* Project Overview
  * Description
  * Branches
  * Structure
* Prerequisites
* Installation  & Setup (Windows 64/32 bit)
* Usage
* Features & Packages
* Contributing

## Project Overview
### Description
This is a e-commerce web shop for 3d Printers.
### Branches
During development, our team aimed at concrete task assignment to each inidividual and clear view of the overall repository. 

Our main branches before final merge: 
* Client - frontend 
* Server - backend/server
* Admin  - admin version

You can see that each main side (client/server/admin) has its own branch.
### Structure 
We have used "sub-branches". Basically, there will be a new branch for each new feature of the branch which the dev works on.

e.g Branch structure of Client

**Client**

├── Product page          
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── product-cart             
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── product-list             
│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ...                
└── ...
## Prerequisites
Already installed and setup npm package manager on VS Code. 

Check [the official link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on how to do the setup,
if you haven't done this step. 

## Installation & Setup (Windows 64/32 bit)
In order to run the whole project you need to download it twice. 
One time for server and one for the client, since we will be runnning both of the sides simultaneously
Steps for downloading it locally on your personal machine, you have 2 ways:
1. Clone the repository (via SSID/HTTP link ).
 * copy the url in "main" branch 
 * navigate to the folder you want to establish the project 
 * right click in the file explorer -> Git Bash here
 * in console type: **git clone [*copied URL*]
  
2. Downloading it directly (ZIP).
 * download the project as ZIP
 * unarchive to the desired directory

After doing this step 2 times you will end up with two separate folders with the same file structure and content. 

In VS Code: 
 * open the client folder in VS code from any of the project folders (doesn't really matter which folder you choose here)
 * open the terminal there, make sure you are in the /project_name/client/ dir
 * type: **npm i

"npm i" command will automatically install all required packages for running the client side. 

Repeat these steps also for the server side. 

 * open the **server** folder in VS code from the other project folder 
 * open the terminal there, make sure you are in the /project_name/**server**/ directory!
 * type: **npm i
 
## Usage
Now after having the proper setup to run everything. Go to the console in VS code in **server** side and type *npm run dev*. 

This is the default run command (see package.json file). 
After running this command there should be a message which displays that the connection is succesful. 

Now navigate to client folder in the other project and open it in VS code, Type *npm run dev* again. 

The response message shows something like: Local:   http://localhost:[port_number]/

Ctrl + left click and it will open the page in browser. 

## Features & Packages 

### Client
 * Google Login & Register
 * Password reset
 * Registration
 * Web-page layouts
 * Web-page functionalities
 
### Server
* Authorisation coockies
* Email invoice
* Google Login & Register 
* Password Reset (nodemailer)
* Routes

### Admin
* Orders
* Category List
* Product List
* Order List
* Create & Delete (Category/Product/Order) 
* Firebase setup
* Layouts & functionalities
* Cookie handling
* Admin Login


## Contributing
Specify how others can contribute to the project. Include guidelines for submitting bug reports, feature requests, or pull requests. Mention any coding conventions or standards to follow. Provide contact information or links to the issue tracker or discussion forum.

