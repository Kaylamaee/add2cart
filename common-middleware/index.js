const jwt = require('jsonwebtoken')

exports.requireLogin = (req, res, next) => {
    
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1] //bearer token
        const user = jwt.verify(token, 'secretToken')
        req.user = user;
    } else{
        console.log('Authorization required')
        res.redirect('/user/login')
    }
    next(); 
    
}
//add token in authorization in postman headers

exports.userMiddleware = (req, res, next) => {
    if(req.user.identity !== 'customer'){
        return res.status(400).json({ message: 'Access Denied' })
    }
    next();
}

exports.adminMiddleware = (req, res, next) => {
    if(req.user.identity !== 'admin'){
        return res.status(400).json({ message: 'Access Denied' })
    }
    next();
}
