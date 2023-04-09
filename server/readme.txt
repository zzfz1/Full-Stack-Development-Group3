1. npm install
2. env file like
PORT = 3000
CONNECTION_URL = http://localhost
MONGO_URL = "mongodb+srv://SebastianMuenz1988:YOUR_OWN_PASSWORD@cluster0.s4khzec.mongodb.net/?retryWrites=true&w=majority"
JWT_SECRET = WebShopGroup3

3.Description: 

Here's a step-by-step flow of how these components interact:

1. A client (e.g., web browser or mobile app) sends an HTTP request to your server (e.g., to create a new category).
2. The request is received by the appropriate route (e.g., a POST request to /categories).
3. The route calls the corresponding controller method (e.g., categoryController.createCategory).
4. The controller method processes the request, interacts with the model to perform the necessary database operation 
5. (e.g., creating a new category in the database), and returns an appropriate response (e.g., success or error message) to the client.


{
  "name": "web_shop_server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
   "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "type": "module",
  "author": "Group 3",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.5",
    "mongoose-slug-generator": "^1.0.4",
    "nodemon": "^2.0.12",
    "slugify": "^1.6.6",
    "stripe": "^8.174.0"
  }
}
