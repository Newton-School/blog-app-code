const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const serialiser = require("node-serialize");
const mongodb = require("mongodb");
const feed = require("./routes/blog");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
const mongoURI =
  "mongodb+srv://duser:K@m123456@sami.ijkpq.mongodb.net/Blog?retryWrites=true&w=majority";
console.log(mongoURI);

app.use(express.json());
const connection = mongodb.MongoClient.connect(
  mongoURI,
  (err, dbClient) => {
    if (err) {
      console.log("connection failed");
      return;
    } else {
      console.log(dbClient);
    }
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/", feed);

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
