const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    product_type: {
        type: String,
        default: false
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product