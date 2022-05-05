let db = require('../data/database')
let mongodb = require('mongodb')
class Product{
    constructor(productData){
        this.title = productData.title
        this.summary = productData.summary
        this.price = productData.price
        this.description = productData.description
        this.image = productData.image
        this.updateImageData()
        
        if(productData._id){
            this.id = productData._id.toString()
        }

    }

    static async findById(productId){
        let prodId
        try{
            prodId = new mongodb.ObjectId(productId)

        }
        catch(error){
            error.statuscode = 404
            throw error
        }
       
        let product = await db.getDb().collection('products').findOne({_id: prodId})
        if(!product){

            let error = new Error('Could not fnd product with Id')
            error.statuscode = 404
            throw error
        }
        return new Product(product)
    }

    static async findAll(){
        let productDocuments = await db.getDb().collection('products').find().toArray()
        return productDocuments.map(function(productDocument){
            return new Product(productDocument)
        })

    }

    updateImageData(){
        this.imagePath = `product-data/images/${this.image}`
        this.imageUrl = `/products/assets/images/${this.image}`
    }

    async save(){
        let productData = {
            title: this.title,
            summary: this.summary,
            price: +this.price,
            description: this.description,
            image: this.image
        }

        if(this.id){
            let mid = new mongodb.ObjectId(this.id)

            if(!this.image){
                delete productData.image
            }
            await db.getDb().collection('products').updateOne({_id: mid},
                {
                    $set: productData
                })

        }else{

            await db.getDb().collection('products').insertOne(productData)

        }
    }

    replaceImage(newImage){

    }
}

module.exports = Product