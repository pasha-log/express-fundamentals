const express = require('express')

const app = express();

app.use(express.json());

const CANDIES = [
    {name: 'snickers', qty: 43, price: 1.50}, 
    {name: "skittles", qty: 26, price: 0.99}
]

app.get('/candies', (req, res) => {
    res.json(CANDIES)
})

app.post('/candies', (req, res) => {
    if(req.body.name.toLowerCase() === "circus peanuts") {
        res.status(403).json({msg: "HORRIBLE CHOICE. CIRCUS PEANUTS FORBIDEN"})
    }
    CANDIES.push(req.body);
    res.status(201).json(CANDIES)
})

app.listen(5000, () => {
    console.log('App on port 5000');
})

