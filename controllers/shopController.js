const Product = require('../models/products')
const Cart = require('../models/cart')

exports.getAllProducts = (req,res,next) => {

    Product.find()
        .then(product => {
            // console.log('shop.js', product)
            res.render('index', {prods: product});
            
        })
        .catch(err => console.log(err));
   
}

exports.getProductDetail = (req,res,next) => {
    Product.findById(req.params.prodID)
        .then(products => {
            res.render('prod-view', {prod : products});
        })
        .catch(err => console.log(err));

}

exports.getSearchResult = (req, res, next) => {
    Product.findOne({name: req.body.search})
    .then(product => {
        console.log(product)
        prodID = product._id
        console.log(prodID)
        console.log(prodID.toString())
        
        prodID.toString();
        res.redirect(`/product/${prodID}`)
    })
    .catch(err => console.log(err))
}

exports.getMenDetail = (req, res, next) => {
    Product.find({$or: [{category: '1'}, {category: '2'}]})
        .then(products => {
            res.render('men', {prod: products, brand: 'All Products'});
        })
        .catch(err => console.log(err));
}

exports.getWomenDetail = (req, res, next) => {
    Product.find({$or: [{category: '0'}, {category: '2'}]})
        .then(products => {
            res.render('women', {prod: products, brand: 'All Products'});
        })
        .catch(err => console.log(err));
}

exports.getMenBrand = (req,res) => {
    Product.find({$and: [{$or: [{category: '1'}, {category: '2'}]}, {brand: req.params.brand}]})
    .then(products => {
        res.render('men', {prod: products, brand: req.params.brand});
    })
    .catch(err => console.log(err));
}

exports.getWomenBrand = (req,res) => {
    Product.find({$and: [{$or: [{category: '0'}, {category: '2'}]}, {brand: req.params.brand}]})
    .then(products => {
        res.render('women', {prod: products, brand: req.params.brand});
    })
    .catch(err => console.log(err));
}

exports.addToCart = (req,res, next) => { 
    Product.findById(req.body.id)
        .then(product => {
            Cart.save(addedProduct);
            req.user.addToCart(product)
                .then(result => {
                    res.redirect('/');
                })
            
        })
        .catch(err => console.log(err));
}


