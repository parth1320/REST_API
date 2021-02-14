const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Product = require('./product')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email invalid!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw Error('Age must be a positive num!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw Error('Password does not contain "password"!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

userSchema.virtual('products', {
    ref: 'Product', 
    localField: '_id',
    foreignFeild: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this 
    const token = await jwt.sign({ _id: user._id.toString() }, 'thisismykey')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login!')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
