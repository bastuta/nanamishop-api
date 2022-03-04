const { verifyTokenAndAdmin } = require('./verifyToken');
const Product = require('../models/Product');

const router = require('express').Router();

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try
    {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedProduct);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try
    {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try
    {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const cat = req.query.cat;
    try
    {
        let products;
        if(limit)
        {
            products = await Product.find().sort({createdAt: -1}).limit(limit);
        }        
        if(cat)
        {
            products = await Product.find({categories: {
                $in: [cat]
            }});
        }
        if(!limit && !cat)
        {
            products = await Product.find();
        }

        res.status(200).json(products);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});
 
module.exports = router;