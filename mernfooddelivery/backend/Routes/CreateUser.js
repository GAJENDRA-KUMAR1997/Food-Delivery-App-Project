const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdfghjklpoiuytrewqzxcvbnmokmijn";

router.post(
  "/createUser",
  body("email", "Please Enter Valid Email").isEmail(),
  body("password", "Please Enter Valid Password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  body("email", "Please Enter Valid Email").isEmail(),
  body("password", "Please Enter Valid Password").isLength({ min: 8 }),async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email; 
    try {
      let UserData = await User.findOne({email});
      if(!UserData){
        return res.status(400).json({ errors: "Try logging with correct credentials"});
      }
      const cmpPassword = await bcrypt.compare(req.body.password,UserData.password); 
      if(!cmpPassword){
        return res.status(400).json({ errors: "Try logging with correct credentials"});
      }
      const data = {
        user : {
          id:UserData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({success : true,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
