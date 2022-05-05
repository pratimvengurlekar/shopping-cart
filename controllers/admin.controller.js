const Product = require("../models/product.model")

async function getProducts(req, res, next){
    let products 
    try{
        products = await Product.findAll()
        res.render('admin/products/all-products',{products: products})


    }catch(error){
        next(error)
        return

    }
    
}
function getNewProduct(req, res){
    let product = {
        title: '',
        summary: '',
        description: '',
        price: ''
    }
    res.render('admin/products/new-product',{product: product})
}
async function createNewProduct(req, res, next){
    let product = new Product({
        ...req.body,
        image: req.file.filename
    })
    try{
        await product.save()


    }
    catch(error){
        next(error)
        return
    }
    res.redirect('/admin/products')
}

async function getUpdateProduct(req, res, next){
    try {
        let product = await Product.findById(req.params.id)
        res.render('admin/products/update-product',{product:product})
    } catch (error) {
        next(error)
        
    }
}
async function updateProduct(req, res, next){

    let product = new Product({
        ...req.body,
        _id: req.params.id
    })

    if(req.file){
        product.replaceImage(req.file.filename)
    }
    
    try {
        await product.save()
        
    } catch (error) {
        next(error)
        
    }
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct
}