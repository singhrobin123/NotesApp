require("dotenv").config();
const express = require("express");
const db = require("./app/config/db");

const apiRouter = require("./app/index.route");

//Initialize the app
const app = express();
//Setting database connection object on app

app.set("db",db);

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("HelloWorld");
});

app.use("/app",apiRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
