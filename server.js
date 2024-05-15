const express=require("express");
const app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");

app.use(bodyparser.json());
app.use(express.urlencoded())

//files importing
var one=require("./logschema.js");
var router=require("./routerouter");
var use=require("./userouter.js");


var all=require("./allrouter.js");

app.use("/",all);


app.use(router);


//Database connections
mongoose.connect("mongodb+srv://peddaudaykiran1:QVzELrpu9BSh4FEv@cluster0.83wx5vb.mongodb.net/testing")
.then(function(){

    console.log("Database connected!@");
})
.catch(function(err){
    console.log("Database connections error@!");
});



app.use("/using",use);

//json web token testing



///////

app.listen(3000,function(err){
    if(err){
        console.log("Error on while starting server!"+err);
    }
    else{
        console.log("server is running at the port number 3000!@");
    }
});

