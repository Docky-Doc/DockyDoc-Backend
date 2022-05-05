const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");


const app = express();


mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Mongodb is connected'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));



app.use(cors({
    origin: "http://localhost:3000/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }))


  app.use("/api/auth", require("./routes/doctorAuth"));
  app.use("/api/auth", require("./routes/userAuth"));


  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 5000;
  }
  app.listen(port, function() {
    console.log("It's UP!");
  })  
