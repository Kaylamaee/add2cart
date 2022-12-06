const Product = require('../models/products');

exports.getProductForm = (req,res,next) => {
    res.render('add-product');
}

exports.postProduct = (req,res,next) => {

    const prod = new Product({
        name: req.body.name,
        price: req.body.price,
        imageURL: req.body.imageURL,
        brand: req.body.brand,
        category: req.body.category
    });
    prod.save()
        .then(result => {
            res.redirect('/index');
        }).catch(err => console.log(err));
}

exports.editProduct = (req, res, next) => {
    Product.findById(req.params.prodID)
        .then(product => {
            res.render('edit-product', {products: product}); 
        }).catch(err => console.log(err));
    
}

exports.editProductPost = (req,res,next) => {
    
    Product.updateOne({_id: req.body.id}, {$set: {name: req.body.name, price: req.body.price, imageURL: req.body.imageURL, brand: req.body.brand, category: req.body.category}})
        .then(result => {
               //res.redirect('/product/' + req.body.id);
               res.redirect('/index');
           })
           .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
   Product.findByIdAndRemove(req.body.id) // findAndModify
        .then(result => {
            res.redirect('/index');
        })
        .catch(err => console.log(err));
   
}