const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../config/jwtOptions');
const {v4:uuidv4} = require("uuid")
const uploadFile = require("../middleware/upload")
//function to add a user
const createUser = async ({ user_name , total_order, user_email , user_password, user_id, user_image }) => {
    return await User.create({ user_name , total_order,  user_email , user_password, user_id, user_image });
};

// find user
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};


// login
router.post('/login', async function(req, res, next) {
    
    const { user_email, user_password } = req.body;
    
    if (user_email && user_password) {
        let user = await getUser({ user_email: user_email });
        if (!user) {
          return  res.status(401).json({ message: 'No such user found' });
        }

        bcrypt.compare( user_password , user.user_password, (err, result) =>{
            if(err){
                 res.status(403).json({message :'incorrect user_password'});
            }
            if(result){
                let payload = { user };
                console.log(jwtOptions.secretOrKey);
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
               return res.status(200).json({ message: 'ok', token });
            }
            else{
              return  res.status(403).json({message :'incorrect user_password'});
            }

        })

    }
});

//register a new user
router.post('/insert', uploadFile.single('image'), async (req, res, next) => {

    const user = await getUser({user_email : req.body.user_email});

    if(user)
    return   res.status(409).json({message : 'user_email already exists'});

    bcrypt.hash(req.body.user_password , null , null, (err, hash) => {

        createUser({
            user_name: req.body.user_name,
            user_id: uuidv4(),
            total_order: req.body.total_order,
            user_email : req.body.user_email ,
            user_password : hash ,
            user_image: req.body.user_image
        }).then(user =>
            res.status(200).json({ user, msg: 'account created successfully' }) );
    })

});


module.exports = router;
