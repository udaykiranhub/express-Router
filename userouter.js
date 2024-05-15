
const express=require('express');
const app=express();
//var bodyparser=require('body-parser');
//app.use(bodyparser.json());
var router=express.Router();
//all requests to this router first hit this middleware

router.use(function(req,res,next){
    console.log(req.body);
    console.log("middle ware invoked!");
    next();

})
router.use(function(req,res,next){
   
    res.send("i am comming from the use router!");
})

module.exports=router;
console.log("use router file  is imported!@");