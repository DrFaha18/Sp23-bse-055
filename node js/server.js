const express =  require('express')
let app = express()

app.use(express.static('public'))

app.set('view engine' , "ejs")


 

app.get("/contact" , (req , res)=>{
    res.render("resume")
})

app.get("/home" , (req , res)=>{
    res.render("index")
})

app.listen (5000 , ()=>{
    console.log('server stated at localhost : 5000');
})
