const Recent = require('../models/recentlyViewed')

exports.addToRecentlyViewed = (req, res) => {
    
    Recent.findOne({user: req.user._id}).exec((err, recent) => {
        if(err) return res.status(400).json({message: 'Something went wrong'})
        if(recent){
            //if recent already exists then update recently

            const product = recent.recentItems.find(r => r.product == req.body.recentItems.product);

            if(product){
                Recent.findOneAndUpdate({user: req.user._id, "recentItems.product": req.body.recentItems.product}, {
                    "$pull": {
                        "recentItems": req.body.recentItems
                    },

                    "$push": {
                        "recentItems": product
                    }
                }).exec((err, _recent) => {
                    if(err) return res.status(400).json({message: 'Something went wrong'})
                    if(_recent){
                        return res.status(201).json({ _recent })
                    }
                })
            }

            Recent.findOneAndUpdate({user: req.user._id}, {
                "$push": {
                    "recentItems": req.body.recentItems
                }
            }).exec((err, _recent) => {
                if(err) return res.status(400).json({message: 'Something went wrong'})
                if(_recent){
                    return res.status(201).json({ _recent })
                }
            })
            
            // res.status(200).json({message: recent})
        } else {
            //if recent does not exist, then create new recent
            const recent = new Recent({
                user: req.user._id,
                recentItems: [req.body.recentItems]
            })
        
            recent.save((err, recent) => {
                if(err) return res.status(400).json({message: 'Something went wrong'})
                if(recent){
                    return res.status(201).json({ recent })
                }
            })
        }
    })
    
   

}