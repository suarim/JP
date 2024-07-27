const asyncHandler = require("express-async-handler");
const Product = require("../Models/product.js"); // Adjust the path as needed
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createproduct = asyncHandler(async (req, res) => {
    const { name, description, price,  stock, imageUrl } = req.body;
    // return res.json("working")
    // Validate required fields
    if (!name || !description || !price) {
        return res.status(400).json({error:"enter all fields"});
        // throw new Error("Name, description, price, and category are required");
    }

    // Create a new product instance
    const product = new Product({
        name,
        description,
        price,
        stock,
        imageUrl
    });

    // Save the product to the database
    const createdProduct = await product.save();

    // Respond with the created product
    res.status(201).json(createdProduct);
});

// const createproduct = asyncHandler(async(req, res)=>{
//     return res.send("createProduct")
// })

const getallproducts = asyncHandler(async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find({});
        
        // Respond with the fetched products
        res.status(200).json(products);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: "Server Error" });
    }
});

const getproductbyid = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the product ID from request parameters

    // Fetch the product by ID
    const product = await Product.findById(id);

    // Check if the product exists
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    // Respond with the fetched product
    res.status(200).json(product);
});

const buyproduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the product ID from request parameters
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    console.log("id-->",id)
    console.log("product-->",product)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100, // Amount in cents
            currency: 'inr',
            payment_method_types: ['card']
        });

        res.status(201).json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = {
    createproduct,
    getallproducts,
    getproductbyid,
    buyproduct
};