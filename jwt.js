const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const secretKey = 'yourSecretKey'; // Replace with a strong, secret key

//Database connections
mongoose.connect("mongodb+srv://peddaudaykiran1:QVzELrpu9BSh4FEv@cluster0.83wx5vb.mongodb.net/testing")
.then(function(){

    console.log("Database connected!@");
})
.catch(function(err){
    console.log("Database connections error@!");
});



const userSchema = new mongoose.Schema({
  username: String,
  password: String, // In a real-world scenario, use bcrypt to hash and store passwords
});
var path=require("path");
var options={
root:path.join(__dirname)
}
const  user= mongoose.model('jwt', userSchema);
app.get("/",function(req,res){
  res.sendFile("jwt.html",options);
})
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  // Check if the user already exists
  const existingUser = await user.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const data= new user({ username, password });
  await data.save()
  .then(function(data){
    console.log("Data Saved!");
  })
  .catch(function(err){
    console.log("Data saving error!");
  })

  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
try{
  // Validate username and password
  const find = await user.findOne({ username, password });

  if (!find) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // If valid, generate a JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '5s' });

  res.json({ token });
}
catch(err){
    console.log("error in the login method!"+err);
}
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected resource accessed successfully' });
  
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token){
console.log("Token is not generated or invalid token!")
  return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("Error in the verify token:"+err);
      return res.status(403).json({ message: 'Forbidden' });
   
    }

    req.user = user;
    console.log("Token verified by comapring with frontened:"+user.username);
    next();
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
