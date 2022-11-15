const Item = require("../itemConstructor")
const express = require("express")

const router = new express.Router()

// GET /items - this should render a list of shopping items.
// Here is what a response looks like:

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

router.get("/items", function(req,res,next){
  try {
    return res.json({items: Item.findAll()})
  } catch(e) {
    return next(e)
  }
})

// POST /items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request/response looks like:

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

router.post("/items", function (req, res, next) {
  try {
    const newItem = new Item(req.body.name, req.body.price)
    items.push(newItem)
    res.status(201).json({ added: newItem })
  } catch(e) {
    return next(e)
  }
})

// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:

// {“name”: “popsicle”, “price”: 1.45}

router.get("/items/:name", function (req, res, next) {
  try{
    const foundItem = items.find(req.params.name)
    return res.json({ foundItem })
  } catch(e) {
    return next(e)
  }
})

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

router.patch("/items/:name", function (req, res, next) {
  try {
    const foundItem = items.update(req.params.name, req.body)
    return res.json({ updated: foundItem })
  } catch(e) {
    return next(e)
  }
})

// DELETE /items/:name - this route should allow you to delete a specific item from the array.

// Here is what a sample response looks like:

// {message: “Deleted”}

router.delete("/items/:name", function (req, res, next) {
  try {
    Item.remove(req.params.name)
    return res.json({ message: "Deleted" })
  } catch(e) {
    return next(e)
  }
})

module.exports = router;