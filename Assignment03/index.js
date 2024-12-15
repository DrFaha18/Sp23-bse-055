const express = require ('express')
const layouts = require ('express-ejs-layouts')
const app = express()
app.set("view engine","ejs");

app.use(express.static("public"))
app.use(layouts)

app.get('/', function (req, res) {
    
    res.render("index", {title: "Himalayan Salt Exporter : Himalayan Salt Supplier | Pak Salt "}) 
})

app.get('/home', function (req, res) {
    res.render("index" ,  {title: "Himalayan Salt Exporter : Himalayan Salt Supplier | Pak Salt "}) 
})

app.get('/about', function (req, res) {
    res.render("about" ,{ title: "About Us | PakSalt"})
})

app.get('/products', function (req, res) {
    res.render("products"  ,{ title: "Products | PakSalt"})
})

app.get('/contact', function (req, res) {
    res.render("contact" ,{ title: "Contact Us | PakSalt"})
})

app.listen(8000)