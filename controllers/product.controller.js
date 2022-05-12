let product = require('../models/product.model')

async function getAllProducts(req,res){
    let products = await product.findAll()
    res.render('customer/products/all-products',{products: products})
}

async function getProductDetails(req,res,next){
    let prod
    try {
        prod = await product.findById(req.params.id)
        res.render('customer/products/product-details',{product: prod})

        
    } catch (error) {
        next(error)
        
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails
    
}