const express = require("express");
const Router = express.Router();

Router.post("/foodData",(req,res)=>{
   try {
    res.send([global.food_items,global.food_Category]);
   } catch (error) {
    console.error(error.message);
    res.send("Server Error");
   }
})

module.exports = Router;