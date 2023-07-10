# _Done_

1. initializing git and add `.gitignore` file
2. install starting modules`(express mongoose dotenv)` and initializing the server
3. connect to the database
4. adding MVC Structure `(controllers Models Routes)`
5. installing `uuid` module
6. create user and note schemas and models (don't forget timestamps)
7. install bcrypt module (hash - compare) and hashing password during register and compare it during signIn(using pre middleware and adding checkMatchPassword methdod to the model)
8. install `jwt` to (sign - verify) the user id or other info.
9. create generateToken function and separate it in utils to generate token when register or signIn (notice that `expriesIn` time need to be stored in `.env`)
10. send jwt token in `res.cookie()` which will be send back automatically in each request
11. install `cookie-parser` and adding `cookieParser()` as middleware, then it will parse the cookies from the request and make them available in `req.cookies` --> notice that it will not be availabe before that
12. create protect middleware to protect routes by checking for authentication or authorization.

# _To-Do_

1. check for birth date and phone numbers if they are valid or not

# _Problems Solved_

1. Using `process.env` before make configuration for the dotenv
2. `this.isModified()` is not a function because the arrow function i wrap the code in it doesn't have it's own `this` context - also in `this.password` in `UserSchema.methods.isPassMatched = function(){}`
3. the object returned from a query doesn't only contains object for the doucment you want but also another information although you don't see it when you use console.log() or using postman ---> but if you want the actual document it is in a property called `_doc`.
   I tried to remove the password property form the returned document using `delete` operator but it didn't work because the the actual object was in `_doc`
4. the error `Cannot set headers after they are sent to the client` is thrown when i try to send response to the client after i have already send one, the problem happens because `next()` function does't actully exit form the handler function so the rest of the code continue to be executed --> to force return use `return next(new Error('an error happens'))`

# _Question_

1. can i use use `catchAsync` function with the handler in `pre` method --> No because this key word will refers to the `catchAsync` function not the document will be saved

# _Notes_

1. هيا module.exports --> متقعدش تجرب
2. `secure` optoin in cookies --> make it only sent in encrypted connection (using HTTPS) --> notice that this only have to be added in production because in development mode we only send HTTP requests so cookies will not send if it is specified
3. `httpOnly` option in cookies --> make cookie can't be accessed or modified by any way by the browser
   ( browser receive cookies, store it and send it automatically with each request)
4. remember that token in the request header have to be put in authintcation property in the request options
5. `select:false` is an option in mongoose schema means that the field such as password will not be included in the query results by default(except creating document which is not a query) However, by calling `.select('+password')`, the password field will be included in the query result .

6. the `body` was the problem in aligning center for fixed positioned header --> don't forget to give max and fixed width for body and header
   ```
   max-width: 1600px;
   width: 100%;
   margin: auto;
   ```
