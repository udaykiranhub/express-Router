var express=require("express");

var router=express.Router();

router.all("/all",async function(req,res){
    try{

res.send("All Method executed!");
    }
    catch(err){
        console.log("Error in user method!"+err);
    }
})

module.exports=router;

console.log("I am User Router!");