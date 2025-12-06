const userSchema = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signup = async (req, res) => {
    try{
        const {email, password, confirmPassword} = req.body;

        if(!email || !password || !confirmPassword){
            return res.status(400).json("All fields are required");
        }

        if(email.indexOf('@') === -1){
            return res.status(400).json("Please enter a valid email");
        }

        if(password.length < 6){
            return res.status(400).json("Password must be at least 6 characters long");
        }

        if(password !== confirmPassword){
            return res.status(400).json("Passwords do not match");
        }

        const existingUser = await userSchema.findOne({email});
        if(existingUser){
            return res.status(400).json("Email is already registered");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userSchema.create({email, password: hashedPassword});

        const token = createToken(user._id);

        res.status(201).json({_id: user._id, email, token});

    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);    
    }
}

const signin = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json("All fields are required");
        }

        const user = await userSchema.findOne({email});
        if(!user){
            return res.status(400).json("User does not exist");
        }

        if(user){
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                return res.status(400).json("Incorrect password");
            }
            const token = createToken(user._id);
            return res.status(200).json({_id: user._id, email, token});
        }


    }catch(error){
        console.error(error.message);
        return res.status(400).json(error.message);    
    }
}

module.exports = {
    signup,
    signin
}