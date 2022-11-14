// Intro to Express 

// Minimalist framework 
// Django is heavy behemoth, but can be easy once learned. 
// Express is very similar to Flask. 
// Most popular in the Node ecosystem 

//////////////////////////////////

// Our First Server 

// npm install express 

// App doesn't do anything except respond 404s, but server is running! 
// app.listen takes a port and a callback. 
// - Binds server to port & listens for requests there. 
// - Calls callback once server has started up. 
// app.listen should always be at the bottom of the file

/////////////////////////////////

// Our first route 

const express = require('express')

const app = express();

app.get('/dogs', (req, res) => {
    console.log("YOU ASKED FOR /DOGS!")
    console.log(req)
    // res.send("WOOF WOOF!") // Comes out as HTMl
    // res.send([1,2,3]) Comes out as JSON
    res.send("<h1>I AM DOG WOOF WOOF</h1>")
})

app.listen(5000, () => {
    console.log('App on port 5000');
})

// Route handlers are event listeners - they're like Flask view funcs 

// Every handler should have a callback with two parameters: 
// - request: info about request (query string, url params, form data) 
// response: useful methods for sending a response (html, text, json, etc)

// app.get('/dogs') listens for a GET Request to the /dogs endpoint. 
// In the callback, response.send() issues a response of plain-text or HTML. 

////////////////////////////////

// More routes 

// Best to keep your app.listen at the bottom.

// THe Request-Response Cycle  

// When you start the server, Express runs through the file and registers all the event listeners before app.listen at the bottom. 

// Whenever a user makes a request, Express invokes the first matching route handler it finds until a response is issued via a method on the response object. 

// app.get(path, callback), app.post(path, callback), app.put(path, callback), app.patch(path, callback), app.delete(path, callback)

////////////////////////////////

// Nodemon 

// Use it to run file rather than node. It's a wrapper. Automatically restarts app when detects change. 
// Quickly and automatically. 

// npm install --global nodemon 

// nodemon app.js 

////////////////////////////////

// req params 

////////////////////////////////

// DO you need to return? 

// Use to stop function 

////////////////////////////////

// req query 

// http://localhost:5000/search?term=chickens&sort=new 
// "SEARCH PAGE!"


// App on port 5000
// { term: 'chickens', sort: 'new' } 

////////////////////////////////

// Req body 

//////////////////////////////// 

// Status codes 

////////////////////////////////

// Custom error classes 

// There are quite a few ways, but the easiest is just to throw an error. 
// We can't easiy see the stack trace 
// WHat about attaching a status code like 404 or 401? 
// If we want that kind of flexibility, we need to create it!

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message; 
        this.status = status; 
        console.error(this.stack);
    }
}

module.exports = ExpressError;




// Welcome to Node.js v18.10.0.
// Type ".help" for more information.
// > class ExpressError extends Error {
// ...     constructor(msg, status) {
// ...         super();
// ...     }
// ... }
// undefined
// > const e = new ExpressError()
// undefined
// > e
// ExpressError
//     at REPL6:1:11
//     at Script.runInThisContext (node:vm:129:12)
//     at REPLServer.defaultEval (node:repl:572:29)
//     at bound (node:domain:433:15)
//     at REPLServer.runBound [as eval] (node:domain:444:12)
//     at REPLServer.onLine (node:repl:902:10)
//     at REPLServer.emit (node:events:525:35)
//     at REPLServer.emit (node:domain:489:12)
//     at [_onLine] [as _onLine] (node:internal/readline/interface:425:12)
//     at [_line] [as _line] (node:internal/readline/interface:886:18)
// > e.stack
// 'Error\n' +
//   '    at REPL6:1:11\n' +
//   '    at Script.runInThisContext (node:vm:129:12)\n' +
//   '    at REPLServer.defaultEval (node:repl:572:29)\n' +
//   '    at bound (node:domain:433:15)\n' +
//   '    at REPLServer.runBound [as eval] (node:domain:444:12)\n' +
//   '    at REPLServer.onLine (node:repl:902:10)\n' +
//   '    at REPLServer.emit (node:events:525:35)\n' +
//   '    at REPLServer.emit (node:domain:489:12)\n' +
//   '    at [_onLine] [as _onLine] (node:internal/readline/interface:425:12)\n' +
//   '    at [_line] [as _line] (node:internal/readline/interface:886:18)'


//////////////////////////////// 

// App Use and Next

// Now throwing errors, but server never responds with anything. 
// We need to instruct Express how to respond when we throw erros. 
// For that, we need to introduce two new concepts, error handling and next.

///////////////////////////////

// Error handling 

// In express, error handlers are special types of handlers. Here are the rules for building an error handler: 
// - Should be at bottom of file , just above app.listen. This is because any handlers defined above can potentially throw errors! 
// - They should match every HTTP verb and path: app.use(callback). 
// - Callback signature to error handlers has 4 parameters instead of 3 
// -- function (error, req, res, next)
// -- (THis is how Express knows it's an error-handler)

/////////////////////////////// 

// Debugging Express 

// Can also use Chrome Dev Tools debugger 
// Start up Node with --inspect-brk flag:
// node --inspect-brk sumEvens.js 

// With --inspect-brk a breakpoint is put on the first line of your app
// Can start with --inspect to not stop at first line: 
// nodemon --inspect
// Use the debugger keyword in code to activate a breakpoint



// Yep. heroku addons create heroku-postgresql:hobby -a <your app name>

// Then:

// heroku pg:push <your local db name> <your database uri> -a <your app name>

// So that you don't get any errors about TLS/SSL certs:

// heroku config:set PGSSLMODE=no-verify

// Access Key ID:
// AKIAXMJ6OAUZHINVS7YZ
// Secret Access Key:
// l2xK0me6hXGKNWAP4/kyOfSK/4wll1NekG4tMBUv

// heroku config:set AWS_ACCESS_KEY_ID=AKIAXMJ6OAUZHINVS7YZ AWS_SECRET_ACCESS_KEY=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

// aws s3 cp myfolder s3://mybucket/myfolder --recursive
// aws s3 cp static s3://awscarbonprint/static --recursive --exclude ".png" --exclude ".jpg"