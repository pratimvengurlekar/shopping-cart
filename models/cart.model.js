let db = require('../data/database')
let mongodb = require('mongodb')

class Cart{
    constructor(items=[], totalQuantity= 0, totalPrice= 0){
        this.items = items
        this.totalQuantity = totalQuantity,
        this.totalPrice = totalPrice
    }
    addItem(product){
        let cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price

        }

        for(let i=0; i< this.items.length; i++){
            const item = this.items[i]
            if(item.product.id == product.id){
                cartItem.quantity = cartItem.quantity+1
                cartItem.totalPrice = item.totalPrice+ product.price
                this.items[i] = cartItem
                this.totalQuantity++
                this.totalPrice = this.totalPrice + product.price
                return

            }
        }
        this.items.push(cartItem)
        this.totalQuantity++
        this.totalPrice = this.totalPrice + product.price
    }

    updateItem(productId, newQuantity){

        for(let i=0; i< this.items.length; i++){
            const item = this.items[i]
            if(item.product.id == productId && newQuantity>0){
                let cartItem = {...item}
                let quantityChange = newQuantity - item.quantity
                cartItem.quantity = newQuantity
                cartItem.totalPrice = newQuantity * item.product.price
                this.items[i] = cartItem
                this.totalQuantity = this.totalQuantity + quantityChange
                this.totalPrice += quantityChange * item.product.price
                return { updatedItemPrice: cartItem.totalPrice}

            }else if(item.product.id == productId && newQuantity <= 0){
                this.items.splice(i,1)
                this.totalQuantity = this.totalQuantity - item.quantity
                this.totalPrice -= item.totalPrice
                return{ updatedItemPrice: 0}
            }
        }

    }
}

module.exports = Cart