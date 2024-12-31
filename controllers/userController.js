import bcrypt from 'bcrypt';
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