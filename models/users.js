const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto')

const usersSchema = new Schema({
    identity: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: false
    },
    phoneNum: {
        type: String,
        required: false,
        trim: true,
        min: 11,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        min: 5,
        max: 12
    },
    hash_password: {
        type: String,
        required: true,
        min: 8,
    },
    birthday: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false
    },
    profilePicture:{
        type: String,
        required: false
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Types.ObjectId,
                ref:'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: Number
    }
}, {versionKey: false}, {timestamps: true});

let salt = 'asdfghjklrtyuiokjh'

usersSchema.methods = {

    authenticate: function(password){
        password = crypto.createHash('sha256', password).update(salt).digest('hex')
        console.log(password)
        return this.hash_password === password;
    },

    setPassword: function(password){
        console.log('before hashing: ' + password)

        this.hash_password = crypto.createHash('sha256', password).update(salt).digest('hex')

        console.log('after hashing: ' + this.hash_password + '\n')
    },

    addToCart: function(product){
        let cart = this.cart;

        if(cart.items.length == 0){
            cart.items.push({productId:product._id, qty:1});
            cart.totalPrice = product.price;
        }else{
            const isExisting = cart.items.findIndex(objInItems => {
                return new String(objInItems.productId).trim() == new String(product._id).trim();
            });
            console.log('isExisting: ', isExisting);
            if(isExisting == -1){
                cart.items.push({productId:product._id, qty:1});
                cart.totalPrice = product.price;
            } else{
                existingProductInCart = cart.items[isExisting];
                existingProductInCart.qty += 1;
                cart.totalPrice = product.price;
            }
            
        }
        console.log('User in schema: ', this);
        return this.save();
       
    }
    // setUsername: function(username){
    //     console.log('before encrpyting: ' + username)

    //     const cipher = crypto.createCipher('aes192', 'agdfaklf');
    //     let encrypted = cipher.update(username, 'utf8', 'hex');
    //     encrypted += cipher.final('hex');
    //     this.username = encrypted

    //     console.log('after encrpyting: ' + this.username + '\n')
    // }
}

let User = mongoose.model("users", usersSchema);
module.exports = User;







//another algo from crypto
        // password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString(`hex`);
        // this.hash_password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
