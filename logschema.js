var mongoose=require("mongoose");

var schema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },

    id:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("one",schema);

console.log(" Schema is imported!");