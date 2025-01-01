import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from "../models/User.js";

export const createUser = async (req, res) => {
    const { name, age, gender,mobileNo,email,password } = req.body;
  
    try {
        const salt = await bcrypt.genSalt(10);
      const newUser = await User.create({
        name,
        age,
        gender,
        mobileNo,
        email,
        password: await bcrypt.hash(password, salt),
      });
  
      res.json({
        status: 200,
        message: `User ${newUser.name} created succesfully!!`
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  }


  export const userLogin = async (req, res) => {
    try{
    const {email,password} = req.body;
    if(!email || !password){
      throw new Error("All fields are mandatory");
    }
    const existingUser = await getUserByEmail(email);
    if(!existingUser){
      throw new Error(`User with the ${email} not found`);
    }
    const isPasswordMatching = await bcrypt.compare(password, existingUser.password);
    if(isPasswordMatching){
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
      };
      const secretKey = process.env.SECRET_KEY;
      const options = {
        expiresIn: '24h',
      };
      const token = jwt.sign(payload, secretKey, options);
      res.json({
        status: 200,
        token: token
      });
    }else{
      throw new Error("Invalid Password");
    }
    
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
  }


  export const getAllUsers = async (req, res) => {
    try{
      const users = await User.findAll();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users); 
    }catch(error){
      return res.status(500).json({ message: error.message });
    }
  }