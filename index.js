const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const serialiser = require('node-serialize')
const mongodb = require('mongodb');
const { assert } = require('chai');

app.use(express.urlencoded());


// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017"+ "/blog"

console.log(mongoURI);

const RESULT_PER_PAGE = 5

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI,(err, dbClient) =>{
    if(err){
        console.log('connection failed')
        return
    }
    console.log("Connection successfull")
    const collection = dbClient.db("blog-database").collection("blog")
    collection.createIndex({topic: "text"})

    app.get("/allblog", async (req, res) => {
        const {page, search} = req.query
        try {
            assert(page !== null && page >= 0, "Invalid page value")
            assert(search.length > 0, "Search can't be empty")
            const result = await collection.find({$text: {$search: search}}).skip((page-1)*RESULT_PER_PAGE).limit(RESULT_PER_PAGE).toArray()
            console.log(result)
            res.json({
                status: "success",
                result: result
            })
        }
        catch (err) {
            res.json({
                status: "failure",
                result: err.message
            })
        }
    })

    app.post("/post/blog", async (req, res) => {
        const {topic, description, posted_at, posted_by} = req.body
        try {
            assert(topic !== null && description !== null && posted_at !== null && posted_by !== null, "Invalid values")
            const newBlog = {
                topic,
                description,
                posted_at,
                posted_by
            }
            const result = await collection.insertOne(newBlog)
            res.json({
                status: "success",
                result: result.ops[0]
            })
        }
        catch (err) {
            res.json({
                status: "failure",
                result: err.message
            })
        }
    })

    app.delete("/delete/blog/:id", async (req, res) => {
        const {id} = req.params
        try {
            assert(id !== null, "Invalid ID value")
            const result = await collection.findOneAndDelete({_id: new mongodb.ObjectID(id)})
            res.json({
                status: "success",
                result: result.value
            })
        }
        catch (err) {
            res.json({
                status: "failure",
                result: err.message
            })
        }
    })

    app.put("/update/blog/:id", async (req, res) => {
        const {id} = req.params
        try {
            assert(id !== null, "Invalid ID value")
            const result = await collection.findOneAndReplace({_id: new mongodb.ObjectID(id)}, req.body, {returnOriginal: false})
            if (result.modifiedCount === 0) {
                throw Error("Given ID is not present in database")
            }
            res.json({
                status: "success",
                result: result.value
            })
        }
        catch (err) {
            res.json({
                status: "failure",
                result: err.message
            })
        }
    })
})

app.get('/', (req, res) => res.send('Hello World!'))

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;