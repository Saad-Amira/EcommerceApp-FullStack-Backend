const express = require('express');
const router = express.Router();
const{database} = require('../config/helpers');




/* GET akk product. */

router.get('/' , function (req,res){
    let page= (req.query.page !== undefined && req.query.page!== 0) ? req.query.page : 1; //set the current page number
    const  limit =( req.query.limit !== undefined && req.query.limit !== 0 ) ? req.query.limit: 10; //set the limit of page

    let startValue;
    let endValue;

    if (page >0 ) {
        startValue = (page * limit) - limit;
        endValue = page * limit;
    } else
        startValue = 0;
    endValue= 10;


    database.table('products as p ')
        .join([
            {
                table: 'categories  as c',
                on: 'c.id= p.cat_id'
            }
        ])
        .withFields(['c.title as category ' ,
            'p.title as name ',
            'p.price ',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'

        ])
        .slice(startValue, endValue)
        .sort({id: .1})
        .getAll()
        .then(prods => {
            if (prods.length>0 ) {
                res.status(200).json(
                    {
                        count: prods.length,
                        products: prods
                    }
                );
            } else {
                re
                s.json({message: 'no product found '});
            }
        }).catch(err => console.log(err))


});


module.exports = router;
