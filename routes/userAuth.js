const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const JWT_SECRET = "Hello world";



router.post('/userSignup',async (req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }
     try {
       let user = await User.findOne({email: req.body.email});
       if(user){
         return res.status(400).json({errors: "Sorry a user with this email already exits"})
        }
        
     
       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password,salt)

       user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          DOB: req.body.DOB,
          address: req.body.address,
       });
       

       const data = {
           user : {
               id: user.id,
               name: user.name
           }
       }

       const authtoken = jwt.sign(data, JWT_SECRET);
      //  res.json({authtoken});
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
     }
});



router.post("/userLogin", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req,res) => {
      let success = false;
      
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
      }
      let {email, password} = req.body;
      try {
          let user = await User.findOne({email});
          if(!user){
              success = false;
              return res.status(400).json({error : "Please try to login with correct credentials"});
            } 

          const passwordCompare = await bcrypt.compare(password, user.password);
          if(!passwordCompare){
            success = false;
            return res.status(400).json({error : "Please try to login with correct credentials"});
          }


          const data = {
            user : {
                id: user.id,
                name: user.name
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");  
      }
  })


module.exports = router;