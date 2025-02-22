const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.use(cookieParser());

async function connectDB() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
      console.error('❌ MongoDB Connection Error:', error);
    }
  }
  
  // Call the function to connect
  connectDB();

const UserSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
})

const User = mongoose.model("User",UserSchema);

app.post("/api/register",async function(req,res){
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const user = new User({email,password:hashedPassword});
        await user.save();
        res.status(201).json({message:"user registered successfully"});

    }catch(err){
        res.status(400).json({message:"user already exists"});

    }

})

app.post("/api/login",async function(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){return res.status(400).json({message:"user does not exist"})};
    const isMatch = await bcrypt.compare(password,user,password);
    if(!isMatch)return res.status(400).json({message:"invalid credentials"});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"2d"});
    res.cookie("token",token,{httpOnly:trur,secure:true,sameSite:"strict"});
    res.json({message:"Login Successful"});

});

app.post("/api/logout",(req,res) => {
    res.clearCookie("token");
    res.json({message:"Logged out successfully"});
});

const port = process.env.Port || 3000;
app.listen(port,() => console.log(`Server is running on port ${port}`));

