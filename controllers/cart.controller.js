const Product = require("../models/product.model")

async function addCartItem(req, res, next){
    let product
    try {
        product = await Product.findById(req.body.productid)
        
    } catch (error) {
        next(error)
        return
        
    }

    const cart = res.locals.cart
    cart.addItem(product)
    req.session.cart = cart

    res.status(201).json({
        message: 'Cart updated',
        newTotalItems: cart.totalQuantity 
    })


}

function updateCartItem(req,res){
    let cart = res.locals.cart
    let updatedItemData = cart.updateItem(req.body.productId, req.body.quantity)
    req.session.cart = cart
    res.json({
        message:'Item Updated',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedPrice: updatedItemData.updatedItemPrice

        }
    })
}

function getCart(req,res){
    res.render('customer/carts/cart')
}


module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem
}