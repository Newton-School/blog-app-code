const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const blogRoutes = require("./server/routes/blogRoutes");
const port = 3000;
const serialiser = require("node-serialize");
const mongodb = require("mongodb");

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
const mongoURI = "mongodb://localhost:27017/blog";
console.log(mongoURI);

if ("development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
const connection = mongodb.MongoClient.connect(mongoURI, (err, dbClient) => {
  if (err) {
    console.log("connection failed");
    return;
  }
});

app.get("/", (req, res) => res.send("Hello World!"));

// your code goes here

// here
app.use("/", blogRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// mongoose
//   .connect(mongoURI, {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`DB connected and the server is runnning at ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Db connection failed", err);
//   });

module.exports = app;
