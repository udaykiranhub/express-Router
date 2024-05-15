var jwt=require("jsonwebtoken");

var secret="udaykiransdfsdffffffffffffffffffffffffffffdadadad";

var obj={
    "name":"uday",
    "pass":"123"
}
var encode=jwt.sign({obj},secret,{expiresIn:'5s'});
console.log(encode);
jwt.verify(encode,secret,function(err,d){
    if(err){
        console.log("err");
    }
    else{
        console.log(d);
    }
})

/*
In this example, the token will expire 1 hour after it's generated. You can change the expiresIn value to set the expiration time according to your requirements. It can be set in seconds
 (e.g., '3600'), minutes (e.g., '60m'), hours (e.g., '1h'), days (e.g., '1d'), and so on.

*/