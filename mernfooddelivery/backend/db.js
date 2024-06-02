const mongoose = require("mongoose");

const URI = "mongodb+srv://gajendrakumar325:gprradha%40123@cluster0.ovbdyjy.mongodb.net/FOODZONEMERN?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery', false);

const mongoDB = async() =>{
    await mongoose.connect(URI,{useNewUrlParser:true},(err,result)=>{
    if(err) console.log("Not Connected",err);
    else {
        console.log("Connected");
        const fetchdata =  mongoose.connection.db.collection("sample");
        fetchdata.find({}).toArray(async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("FoodCategary");
            foodCategory.find({}).toArray(function(err,CatData){
                if(err) console.log("Error Occured",err);
                else{
                    global.food_items = data;
                    global.food_Category = CatData;
                }
            })
        })
    }
})
}
module.exports = mongoDB;