const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const mongoose=require('mongoose')

app.use(express.urlencoded());
app.use(express.json());


// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb+srv://Umesh123:Umesh123@cluster0.moi8u.mongodb.net/blog?retryWrites=true&w=majority"
console.log(mongoURI);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","Origin, X-Requested-with, Content-Type, Accept")
    next();
  });


mongoose.connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify:true })    
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err))

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/',require('./route/api'))
// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;