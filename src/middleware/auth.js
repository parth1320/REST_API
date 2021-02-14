const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bools ', '' )
        const decode = jwt.verify(token, 'thisismykey') 
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user) {
            throw new Error
        }
        req.user = User
        req.token = token
        next()    
    } catch (e) {
        res.status(401).send({ Error : 'Please authonticate' })
    }
}

module.exports = auth