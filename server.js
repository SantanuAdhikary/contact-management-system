const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const {join} = require("path")
const CONTACT_SCHEMA = require("./models/contactSchema")
const contactRoute = require("./Routes/contact_route")
const {connect} = require("mongoose");

const methodOverride = require("method-override");

let MONGODB_URL ="mongodb://127.0.0.1:27017/contact-app"

let connectDB = async()=>{
    
    try{
     await connect(MONGODB_URL);
     console.log('database is connected')
    }
    catch(err){
     console.log(err)
    }
 }
 
 connectDB()

app.engine("handlebars",engine())
app.set("view engine","handlebars");
app.use(express.static(join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));




app.get("/",async (req,res)=>{
    // res.send("hello ")

    let payload = await CONTACT_SCHEMA.find({}).lean();
    res.render("home",{title:"home page ", payload})
})


app.use("/contact",contactRoute);

app.listen(5000,err=>{
    if(err) throw err;

    console.log("app is running on port 5000");
})