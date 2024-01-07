const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // extract token from header
    const token = authorization.split(' ')[1]

    // verify token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findById(_id)

        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'Authorization token invalid' })
    }
}

module.exports = requireAuth;