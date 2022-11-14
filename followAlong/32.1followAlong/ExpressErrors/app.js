const express = require('express')
const ExpressError = require('./expressError')

const app = express();

// app.use(express.json());
// app.use((req, res, next) => {
//     console.log("THE SERVER GOT A REQUEST!!!!")
//     next();
// });

function attemptToSaveToDB() {
    throw "Connection Error!"
}

const USERS = [
    {username: 'StacysMom', city: "Reno"}, 
    {username: "Rosalia", city: "R"}
]

app.get('/candies', (req, res) => {
    res.json(CANDIES)
})

app.get('/users/:username', function (req, res, next) {
    try {
        const user = USERS.find(u => u.username === req.params.username);
        // if (!user) return res.status(404).send("NOT FOUND")
        // if (!user) throw "Invalid username!"
        if (!user) throw new ExpressError("invalid username", 404)
        return next("NO!")
    } catch(e){
        next(e)
    }
    // return res.send({ user });
})

app.get("/secret", (req, res, next) => {
    debugger;
    try{
        if (req.query.password != 'popcorn') {
            // return res.status(403).send("INVALID PASSWORD!")
            throw new ExpressError("invalid password", 403)
        }
        return res.send("CONGRATS YOU KNOW THE PASSWORD")
    } catch(e) {
        next(e)
    }
})

app.get('/savetodb', (req, res, next) => {
    try {
        attemptToSaveToDB()
        return res.send("SAVED TO DB!")
    } catch(e) {
       return next(new ExpressError("Database Error"))
    }
})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    next(e)
})

// Last ditch error handler
// app.use((error, req, res, next) => {
//     res.status(error.status).send(error.msg)
// })

app.use((error, req, res, next) => {
    // the default status is 500 Internal Server Error
    let status = error.status || 500;
    let message = error.message; 

    // set the status and alert the user
    return res.status(status).json({
        error: {message, status}
    });
})



app.listen(5000, () => {
    console.log('App on port 5000');
})

