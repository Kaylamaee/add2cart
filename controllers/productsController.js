 const Product = require('../models/products') 

exports.productCreate = (req, res) => {
    Product.findOne({$or: [{ prodID: req.body.prodID }, { name : req.body.name }]}).exec((err, product) => {
        if(product) return res.status(400).json({message: 'Product already exists'});

        const {prodID, image, brand, name, price,category} = req.body;

        const newProduct = new Product({ 
            prodID, 
             image, 
             brand, 
             name, 
             price,
             category
         })

         newProduct.save((err, data) => {
             if(err) return (console.log(err), res.status(400).json({message: "Something went wrong"}))
           else return res.status(201).json({message: "Product was created successfully"})
     })
    })
 }

 exports.deleteProduct = (req, res) => {
     Product.deleteOne({prodID: req.params.prodID}).exec((err, product) => {
        if(product) return res.send("Product has been deleted");
        else return res.send("Something went wrong.")
    })
 }

 exports.products = (req, res) => {
     Product.find({}).exec((err, products) => {
         if(products) return res.send(products)
         else return res.send("Something went wrong")
    })
 }

 exports.findProduct = (req, res) => {
     Product.findOne({prodID: req.params.prodID}).exec((err, product) => {
         if(product) return res.send(product);
         else res.send("Product does not exist!")
     })
 }

 exports.updateProduct = (req, res) => {
     Product.findByIdAndUpdate(req.params.id).exec((err, product) => {
         if(product) {
             product.price = req.body.newPrice;
             product.save()
           res.send(product);
        } else res.send("Product does not exist!")
     })
 }