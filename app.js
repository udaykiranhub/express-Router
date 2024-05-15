var express=require("express")
var app=express()
console.log("k")
console.log("hiiiiii");
app.listen(300,function(err){
    if(err){
        console.log("Error in server running!");
    }
    else{
        console.log("Server is Running!");
    }
})
