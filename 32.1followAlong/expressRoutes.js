const express = require('express')

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
    res.send("HOMEPAGE")
})

app.get('/dogs', (req, res) => {
    console.log("YOU ASKED FOR /DOGS!")
    res.send("<h1>I AM DOG WOOF WOOF</h1>")
})

app.get('/dogs', (req, res) => {
    res.send("MEOW MEOW MEOW")
})

app.get('/chickens', (req, res) => {
    res.send("BOCK! BOCK! BOCK! (get request)")
})

app.post('/chickens', function createChicken(req, res){
    res.send("YOU CREATED A NEW CHICKEN (not really)")
})

const greetings = {
    en: "hello", 
    fr: 'bonjour', 
    ic: "hallo", 
    js: 'konnichiwa'
}

app.get("/greet/:language", (req, res) => {
    const lang = req.params.language;
    const greeting = greetings[lang]
    if(!greeting) return res.send("INVALID LANGUAGE")
    console.log("HELLOOOOO")
    res.send(greeting.toUpperCase());
})

app.get('/search', (req, res) => {
    // const {term , sort} = req.query;
    const {term = 'piggies', sort = 'top'} = req.query;
    return res.send(`SEARCH PAGE! Term is: ${term}, sort is: ${sort}`)
})

app.get('/show-me-headers', (req, res) => {
    console.log(req.rawHeaders)
    console.log(req.headers)
    res.send(req.headers)
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language']
    res.send(`Your language preference is: ${lang}`)
})

app.post('/register', (req, res) => {
    res.send(`Welcome, ${req.body.username}!!!`);
})

app.listen(5000, () => {
    console.log('App on port 5000');
})

