const jwt = require('jsonwebtoken');
const User = require('../models/users');
const crypto = require('crypto')

exports.signup = (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        if(user) return res.status(400).json({message: 'User already exists'});

        const {identity, fullName, email, phoneNum, username, password, birthday, gender} = req.body;
        
        const newUser = new User({ identity, fullName, email, phoneNum, password, birthday, gender, username })

        // newUser.setUsername(req.body.username);
        newUser.setPassword(req.body.password);
        console.log('username: ' + newUser.username)

        newUser.save((err, data) => {
            if(err) return (console.log(err), res.status(400).json({message: "Something went wrong"}))
            // return res.redirect(`/user/${newUser.username}`)
            return res.status(201).json({message: data})
        })
    })
}

// exports.decrpytUsername = (req, res) => {
//     console.log('\nbefore decrypting: ' + req.params.username)

//     const decipher = crypto.createDecipher('aes192', 'agdfaklf')
//     let decrypted = decipher.update(req.params.username, 'hex', 'utf8')
//     decrypted += decipher.final('utf8')

//     console.log('after decrypting: ' + decrypted + '\n')

//     res.status(200).json({encrypted: req.params.username, decrypted: decrypted})
// }

exports.deleteUser = (req, res) => {
    User.deleteOne({username: req.params.username}).exec((err, user) => {
        if(user) return res.send("User has been deleted");
        else return res.send("Something went wrong.")
    })
}

exports.users = (req, res) => {
    User.find({}).exec((err, users) => {
        if(users) return res.send(users)
        else return res.send("Something went wrong")
    })
}

exports.findUser = (req, res) => {
    User.findOne({username: req.params.username}).exec((err, user) => {
        if(user) return res.send(user);
        else res.send("User does not exist!")
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id).exec((err, user) => {
        if(user) {
            user.username = req.body.username;
            user.save()
            res.send(user);
        } else res.send("User does not exist!")
    })
}


exports.login = (req, res) => {
    
    User.findOne({username: req.body.username}).exec((err, user) => {
        if(err) return res.status(400).json({ message: err })

        if(user){
            if(user.authenticate(req.body.password) && user.identity === 'customer'){
                console.log('customer login')
                const token = jwt.sign({ id: user._id, identity: user.identity }, 'secretToken', { expiresIn: '1h' })
                const { _id, identity, fullName, email, phoneNum } = user;
                console.log({
                    token,
                    user: {_id, identity, fullName, email, phoneNum}
                })

                return res.redirect('/shop-now')
            } else if(user.authenticate(req.body.password) && user.identity === 'admin'){
                console.log('admin login')
                const token = jwt.sign({ id: user._id, identity: user.identity }, 'secretToken', { expiresIn: '1h' })
                const { _id, identity, fullName } = user;
                console.log({
                    token,
                    user: {_id, identity, fullName}
                })

                return res.redirect('/index')
            }else{
                console.log("Invalid Credentials")
                return res.redirect('/user/login')
            }
        } else{
            // res.status(400).json({message: "Something went wrong"})
            console.log('User does not exist')
            return res.redirect('/user/login')
        }
    })
}

exports.resetPassword = (req, res) => {
    User.findOne({_id: req.user._id}).exec((err, user) => {
        if(err) return res.redirect('/my-account/security')

        if(user) {
            if(user.authenticate(req.body.password) || user.authenticate(req.body.cnfmPassword)){
                console.log('You cannot enter your previous password')
                return res.redirect('/my-account/security')
            } else if(!user.authenticate(req.body.password) && (req.body.password !== req.body.cnfmPassword)){
                console.log('Confirm Password does not match New Password')
                return res.redirect('/my-account/security')   
            } else {
                console.log('old pass: ' + user.hash_password)
                user.setPassword(req.body.cnfmPassword)
                console.log('new pass: ' + user.hash_password)
                user.save((err, data) => {
                    if(err) return (console.log(err), res.status(400).json({message: "Something went wrong"}))
                    return res.redirect('/user/my-account')
                })
            }
        }
    })
}

