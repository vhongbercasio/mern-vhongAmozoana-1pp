MERN STACK PROJECT 


CREATE FRONT-END
1.Introductioon
2.Intall Tools
3.Create React App
4.Create data product 
5.render the product in the component
6.install react-router-dom 
7.used some components in react-router-dom;
8.create a folder that contain of two componemst such as homeScreen and productScreen 

CREATE A BACKEND API 
1.crete Nodd.JS Server
2.run npm init in root folder
3.Add .js to import 
4.npm install 
5. create server,js file to 
    - instrall expess framework to used our serve to make express API backend 
     -install nodemon to auotamicall update the server side 
6.add start command as node backend/server.js
7.require express 
8.create route for/ return backend is ready
9. move products.js from frontend to backend 
10.creae route for /api/products
11/returns products
12.run npm start

13.In back ene in packageJson intead we use require for export the module in dependencies, we are used module to define the module ES6


FETCH PRODUCS FROM BACKEND TO FRONTEND
1.set proxy in package.Json 
2.npm install axios
3.use state hook for
4. use effett hook 
5. use reducer hook



MANAGE STATE BY reducer HOOK TO CHANGE THE useStaete logic
1.define reducer
2.update fetch data
3.get state from useReducer 


ADD REACT-BOOTSTRAP
1.npm install react-bootstrapped boostrap module
2.npm react-router-bootsrtap module
3.update App.js
4.must be import the module in index.js as the root of component in applicatiion



CREATE PRODUCT AND RATINF COMPONENT
1 create rating componet
2.create product componet
3.use rating component in product component
4.get link the cdn in fontasome;
5.passing the prop to  another components
6.make a component product as dynamic
7.make reting component as dynamic 
8.within the rating componenent we have make couple of fontasome icon 
9. and change the color in file index,css 

CREATE PRODUCT DETAILS SCREEN 
1.fecth product from backend
2. create 3 columns for image, info and action 
3.install helmet-react-provider it used for user freindly 
4. creaet a new API whcih is uses of param to  show the single product 
5,the name of param as id is slug
6. In case of  using the helmet for SEO every specific componets has title for showing browser.




CREATE LOADING AND MESSAGE COMPONENTS
1. create loading component
2. use spinner component
3.create message component
4. create utils.js to define getError function 



IMPLEMENT ADD TO CART
1.create react context
2. define reduceer
3. create to store povider
4. implement add to caert button click handler 
.

COMPLETE Add to cart 
1. check exist item in the cart
2. check count in stock in backend 


CREATE CART SCREEN part-1
1.crete 2 columns
2. display items list 
3.creare action column


CREATE CART SCREEN part-2
1.create 2 columns
2. display items list
3. create action column

CREATE CART SCREEN part-3
1.click handler for increase and decrase item 
2.click handler for remove items from
3.click handler for check out 


CREATE Sigin Screen 
1.create sign in form 
2.add emmail and password
3.add sign in button 


CONNECT To MongoDB Database
1. create atlas mongo database
2.install local mongo database
3. npm install mongoose 
4. connect to mongodb database


SEED SAMPLE DATA to convert tha static to dynamic
1.create product model 
2.create user model
3.create seed route
4.use route in server.js
5.seed smaple product 


SEED SAMPLE USERS
1.create user model
2.seed sample user 
3.create user routes 



CREATE SIGN IN BACKEND API 
notice expressAsyncHandler() function midleware or Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.

install  "bcryptjs" to hash the password or  to  encrypting
install jssonwetoken to authentication the user to generate a token

1.create signin api 
2. npm install jsonwetokem
3. define generateToken 


COMPLETE SIGNIN SCREEN
further npm i react-toastify for show ther error
    1. handle submit action 
    2.save token in store and local storage
    3.show user name in header 