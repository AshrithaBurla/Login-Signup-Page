const express= require("express")
const app= express()
const path= require("path")
const hbs= require("hbs")
const templatePath=path.join(__dirname,'../tempelates')
const collection=require("./mogodb")

app.use(express.json())
app.set("view engine" , "hbs")
app.set("views" , templatePath)
app.use(express.urlencoded({extended:false}))


const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
app.use('/images', express.static(path.join(templatePath, 'homeImages')));
app.use('/images', express.static(path.join(templatePath, 'signupImages')));




app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.post("/login",async (req,res)=>{
    
    try{
        const check= await collection.findOne({name:req.body.name})
        if(check.password === req.body.password){
            res.render("home")

        }
        else
        {

            res.send("Wrong Password Entered!")
        }
    }
    catch{

        res.send("Wrong Details")
    } 
})

app.listen(3000,()=>{
    console.log("port connected")
})