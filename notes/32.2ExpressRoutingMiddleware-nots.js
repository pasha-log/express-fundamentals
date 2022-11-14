// Express Router 

// What is Middleware? 
// It is code that runs in the middle of the request / response cycle! 
// In Express, middleware are funcs that get access to the req and res objects and can also call the next function. 
// express.json() is an example of middleware  
// Our 404 and global error handlers are middleware. 

// It opens up the door for separating our code into more logical grouping and providing more robust / abstracted error handling. 
// - Logging useful info on every request 
// Adding a current_user for every request (like g in FLask) 
// Ensuring that users are authenticated 
// Ensuring that a user is authorized to access an endpoint 
 
// Why do we need next? 
// If we do not include it, we will not make it to the next route! 
// Notice here we are not passing anything to the next. 
// If argument are passed to next, Express always treats this as an error. 
