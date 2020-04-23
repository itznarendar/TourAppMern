const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart:req.user.cart,
        hitstory:req.user.history,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});
router.get("/addToCart", auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        console.log(userInfo ," userInfo   changing     already exists      ??  ",userInfo.cart,err,"   erro ");
       
        let alreadyExists=false;
        if(userInfo.cart){
            console.log("changing     already exists")
        userInfo.cart.forEach(cartInfo => {
            if(cartInfo.id===req.query.productId){
                alreadyExists=true

            }
            
        });}
        if(alreadyExists){
            console.log("changing     already exists    ",alreadyExists)

            User.findOneAndUpdate({_id:req.user._id,"cart.id":req.query.productId},{$inc:{"cart.$.quantity":1}},{new:true},()=>{
                if(err) 
              return  res.status(400).json({success:false,err})
              return res.status(200).json(userInfo.cart)
            })
        }
        else{
            User.findOneAndUpdate({_id:req.user._id},{$push:{
                cart:{
                    id:req.query.productId,
                    quantity:1,
                    date:Date.now()

                }

            }},{new:true},(err,userInfo)=>{
                if(err) return res.status(400).json({success:false,err})
                return res.status(200).json(userInfo.cart)
                 
            }

            )}
    
});
})

router.get("/removeFromCart", auth, (req, res) => {
    console.log("-----------------------------------------------------",req.query)

    User.findOneAndUpdate({_id:req.user._id},{"$pull":{"cart":{"id":req.query.productId}}},{new:true},(err,userInfo)=>{
        console.log("-----------------------------------------------------")
        console.log(userInfo,"===============================>  user info")
        let cart=userInfo.cart;
        let idArray=cart.map(item=>{
            return item.id;
        })
        Product.find({id:{$in:idArray}}).populate('writer')
        .exec((err, cartDetail) => {
            return res.status(200).json({
                cartDetail,
                cart
            })
        })
    })
})

module.exports = router;
