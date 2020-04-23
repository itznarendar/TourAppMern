const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const multer=require('multer');
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploading/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")
router.post("/uploadImage", auth, (req, res) => {
    upload(req,res,err=>{
        if(err){
            console.log(err)
            return res.json({success:false,err})
        }
        return res.json({success:true,image:res.req.file.path,fileName:res.req.file.filename})

    })
});
router.post("/uploadProduct", auth, (req, res) => {
    const product=new Product(req.body)
    product.save(( err)=>{
    
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})
}
    )
});
router.post("/getProducts", (req, res) => {
    let order=req.body.order?req.body.order:"desc";
    let sortBy=req.body.sort?req.body.sort:"_id";
    let skip=req.body.skip?parseInt(req.body.skip):0;
    let limit=req.body.limit?parseInt(req.body.limit):100;
    let findArgs = {};
    console.log("req.body.filters")
let term=req.body.seachTerm
if(req.body.filters)
  {  for (let key in req.body.filters) {
    console.log("req.body.filters   @@@@@@@@@@@@ key ",key,"ee##")
        
        console.log(req.body.filters[key]);

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                console.log(req.body.filters,"key============>",key," ===")
                 findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                } 
                console.log(findArgs)
            } 
          /*   if (key === "search"&&req.body.filters[key]) {
                console.log(req.body.filters,"key============>",key," ===")
                 findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                } 
                console.log(findArgs) 
            }
           */  else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    console.log(findArgs); }
 if(term){
    Product.find(findArgs).
    find({ $text: { $search: term } }).
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).exec((err,products)=>{
        if(err) {
            return res.status(400).json({success:false,err})
        }
        else{
        //    console.log(products);
            return res.status(200).json({success:true,products,postSize:products.length})
        }
    })
}
else{Product.find(findArgs).
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).exec((err,products)=>{
        if(err) {
            return res.status(400).json({success:false,err})
        }
        else{
        //    console.log(products);
            return res.status(200).json({success:true,products,postSize:products.length})
        }
    })}
       
}
    );
//products_by_id?id=${productId}&type=single`)

router.get("/products_by_id", (req, res) => {
    console.log(req.query," ==================================================")
    let productIds = req.query.id
    let type = req.query.type


    if (type === 'array') {
 console.log(productIds," is is her  before e ",req.query.id)

 let ids=req.query.id.split(',');
 console.log(ids," is is here ")
  productIds=[];
 productIds=ids.map(item=>{
 console.log(item," item  is here ==")
     
     return item;
 })
    }
    console.log("productIds===============>", productIds)
    

        console.log('req reciebvd     ',req.query)
        Product.find({ '_id': { $in: productIds } })
            .populate('writer')
            .exec((err, product) => {
                if (err) return res.status(400).send(err)
 console.log(" product    is is here ",product);

                return res.status(200).send(product)
            })
    }
);





module.exports = router;
