
require("dotenv").config();
const express = require ('express')
const path = require ('path')
const layouts = require ('express-ejs-layouts')
const mongoose = require ('mongoose')
const session = require ('express-session')
const  Category  = require('./models/category'); 
const  Products  = require('./models/products'); 
const app = express()
const multer = require('multer');
const port = process.env.port;

app.set("view engine","ejs");
app.use(express.static("public"))
app.use(layouts);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.DB_URI ,{ useNewUrlParser: true  , useUnifiedTopology: true} )
const db = mongoose.connection;

db.on('error' , (error) => console.log(error));
db.once('open' , () => console.log("connected to databse"))


app.use(
    session({
    secret: "my secret key" , 
    resave: false , 
    saveUninitialized: true

}) );

app.use(
    (req , res , next) => {
        res.locals.message = req.session.message;
        delete req.session.message;
        next();
    }
)

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

app.get('/admin', function (req, res) {
    res.render("admin" ,{ title: "Admin | PakSalt"})
})

app.get('/admin/productsA', (req, res) => {
    res.render('productsA' ,{ title: "Products | PakSalt"} )
});


app.get('/admin/categories', (req, res) => {
    res.render('categories'  ,{ title: "Categories | PakSalt"}); 
});

app.get("/admin/contact",(req,res)=>{
    res.render("contact",{ title: "Contact Us | PakSalt"})
});

app.get("/admin/about",(req,res)=>{
    res.render("about",{ title: "About Us | PakSalt"})
});

app.get("/admin/productsA/add" , (req , res) =>{
    res.render("addproduct" ,{ title: " Add Product | PakSalt"})
});



// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Multer middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.post('/admin/productsA/add', upload.single('productImage'), async (req, res) => {
    try {
        const { productName, productId, productPrice, productCategory } = req.body;

        // Check if an image is uploaded
        if (!req.file) {
            return res.status(400).send('Product image is required');
        }

        // Find category ID by name
        const category = await Category.findOne({ name: productCategory });
        if (!category) {
            return res.status(400).send('Invalid category');
        }

        // Create and save the product
        const newProduct = new Products({
            name: productName,
            id: productId,
            price: parseFloat(productPrice),
            category: category._id,
            image: [req.file.filename], // Save the uploaded image filename
        });

        await newProduct.save();
        res.status(201).send('Product added successfully with image');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding product');
    }
});


app.get("/admin/productsA/edit" , (req , res) =>{
    res.render("editproduct" ,{ title: " Edit Product | PakSalt"})
});

app.post('/admin/productsA/edit', upload.single('productImage'), async (req, res) => {
    try {
        const { productId, productName, productPrice } = req.body;

        // Find the product by ID
        const product = await Products.findOne({ id: productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Update product details
        if (productName) product.name = productName;
        if (productPrice) product.price = parseFloat(productPrice);

        // If a new image is uploaded
        if (req.file) {
            // Delete the old image if it exists
            if (product.images && product.images.length > 0) {
                const oldImagePath = path.join(__dirname, 'uploads', product.images[0]);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Remove the old image file
                }
            }

            // Save the new image
            product.images = [req.file.filename];
        }

        // Save updated product
        await product.save();

        res.status(200).send('Product updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating product');
    }
});

// app.get("/admin/productsA/delete" , (req , res) =>{
//     res.render("deleteproduct" ,{ title: " Delete Product | PakSalt"})
// });

// app.post('/admin/productsA/delete', async (req, res) => {
//     try {
//         const { productId } = req.body;

//         // Find the product by ID
//         const product = await Products.findOne({ id: productId });
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }

//         // Delete associated images if they exist
//         if (product.images && product.images.length > 0) {
//             product.images.forEach((image) => {
//                 const imagePath = path.join(__dirname, 'uploads', image);
//                 if (fs.existsSync(imagePath)) {
//                     fs.unlinkSync(imagePath); // Remove the image file
//                 }
//             });
//         }

//         // Delete the product from the database
//         await Products.deleteOne({ id: productId });

//         res.status(200).send('Product deleted successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error deleting product');
//     }
// });

// app.get("/admin/productsA/view" , (req , res) =>{
//     res.render("viewproduct" ,)
// });
app.post('/admin/productsA/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;

        // Find and delete the product by ID
        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }

        // Optionally, delete the associated image file(s) from the uploads folder
        const fs = require('fs');
        const path = require('path');

        // Handle image deletion if the field is an array
        if (Array.isArray(deletedProduct.image)) {
            for (const img of deletedProduct.image) {
                const imagePath = path.join(__dirname, img);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(`Error deleting image file ${img}:`, err);
                    }
                });
            }
        } else if (typeof deletedProduct.image === 'string') {
            // Handle image deletion if the field is a single string
            const imagePath = path.join(__dirname, deletedProduct.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                }
            });
        }

        res.redirect('/admin/productsA/view'); // Redirect to the product list page
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/admin/productsA/view', async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1; // Get the current page from query string (default to 1)
    const pageSize = 2; // Number of products per page (adjust as needed)
  
    try {
      const totalProducts = await Products.countDocuments(); // Get total product count
      const totalPages = Math.ceil(totalProducts / pageSize); // Calculate total pages
  
      const products = await Products.find()
        .skip((currentPage - 1) * pageSize) // Skip products for previous pages
        .limit(pageSize); // Limit the number of products to display
  
      res.render('viewproduct', {
        title: 'View Products',
        products,
        currentPage,
        totalPages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products');
    }
  });


app.get("/category/add" , (req , res) =>{
    res.render("addcategory" ,{ title: "Add Category | PakSalt"})
});

app.post('/category/add', async (req, res) => {
    try {
      const { name } = req.body; // Destructure 'name' from req.body
  
      if (!name) {
        return res.status(400).send('Category name is required'); // Validate input
      }
  
      const newCategory = new Category({
        name: name, // Clean up whitespace
      });
  
      await newCategory.save(); // Save the category to the database
      res.status(201).send('Category added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding category');
    }
  });
  

app.get("/category/edit" , (req , res) =>{
    res.render("editcategory" ,{ title: "Edit Category | PakSalt"})
});

// Edit category route
app.post('/category/edit', async (req, res) => {
    try {
        const { categoryName, newCategoryName } = req.body;

        // Find the category by the current name
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            // If the category doesn't exist
            return res.status(404).send('Category not found');
        }

        // Update the category name
        category.name = newCategoryName;

        // Save the updated category to the database
        await category.save();

        // Redirect or send a success message
        res.send('Category updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating category');
    }
});


app.get("/category/view", async (req, res) => {
    try {
      const categoryData = await Category.find();
      res.render("viewcategory", { title: "View Category | PakSalt", categories: categoryData });
    } catch (error) {
      // Handle errors
    }
  });
app.get("/category/delete" , (req , res) =>{
    res.render("deletecategory" ,{ title: "Delete Category | PakSalt"})
});

// Delete category route
app.post('/category/delete', async (req, res) => {
    try {
        const { categoryName } = req.body;

        // Find and delete the category by name
        const deletedCategory = await Category.findOneAndDelete({ name: categoryName });

        if (!deletedCategory) {
            // If the category doesn't exist
            return res.status(404).send('Category not found');
        }

        // Send success message
        res.send('Category deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting category');
    }
});




app.listen(port || 8000)