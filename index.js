
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const port = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://aishwarya:root@cluster0.oir2lqu.mongodb.net/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        const passCompare = req.body.password === user.password;

        if (!passCompare) {
            return res.json({ success: false, errors: "Wrong password" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
//creating endpoint for new collection data
app.get('/newcollections', async (req, res) => {

    let products = await Product.find({});

    let newcollection = products.slice(1).slice(-8);

    console.log("NewCollection Fetched");

    res.send(newcollection);

})
//creating middleware to fetch user
const fetchUser = async (req,res, next)=>{

    const token = req.header('auth-token');
     if (!token) {
    
     res.status(401).send({errors:"please authenticate using token"})

    }
    else{
        try{
          const data =jwt.verify(token,'secret_ecom');
          req.user= data.user;
          next();
        }catch(error){
            res.status(401).send({errors:"please authenticate using token"})

        }
    }
}



//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});

        userData.cartData[req.body.itemId] += 1;
        
        await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData });
        res.send("Added")

})
//creating end point to remove product from cart

app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
        if(userData.cartData[req.body.itemId] >0)
        userData.cartData[req.body.itemId] -= 1;
        
        
        await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData });
        res.send("removed")

})

//creating endpoint for cartdata
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Failed to fetch cart data' });
    }
});



app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
