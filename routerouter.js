 const express=require("express");
var router=express.Router();
var one=require("./logschema.js")
router.route("/user")
.get(function(req,res,next){
    console.log("get request called!");
    console.log(req.body);
    res.send(req.body);
res.end(); //response is ended with this res.end() another method is not executed,here stop only!

})
.post(function(req,res,next){
    console.log(req.body);
    var data=one({
        name:req.body.name,
        id:req.body.id,
        branch:req.body.branch
    });

    console.log("post request called@");

    data.save()
    .then(function(data){
        console.log("data Saved@");
    })
    .catch(function(errr){
        console.log("Error on Dta Saving!");
    })
    res.send(req.body);


    res.end()
})
.put(async function(req,res,next){
    console.log("put request called!");
    var  find=await one.findOne({"name":req.body.name});
    console.log(find)
    if(find){
  one.updateOne({"name":req.body.name},{"branch":"qqq"})

   .then(function(data){
    console.log("Data updated@");
   })
   .catch(function(err){
console.log("Error or Data Putting!");
   });

    res.send("updated!@");
    }
    else{
        res.send("user not exist!");
    }

    
res.end();

})
module.exports=router;

console.log("Route router imported!@");