const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();
const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAll();
};



router.get('/details', (req, res) =>{
    getAllUsers().then(user => res.json(user));
});

router.put('/update', checkAuth, (req, res) => {
//    console.log(req.body)
//    res.json(req.body)
User.update(req.body, 
    { where: {user_id: req.userData.user.user_id}}).then(user =>
        res.status(200).json({ user, msg: 'account updated successfully' }) ).catch (err => {
            res.send(err)
        });
})

router.delete('/delete', checkAuth, (req, res) => {
    //    console.log(req.body)
    //    res.json(req.body)
    User.destroy(
        { where: {user_id: req.userData.user.user_id}}).then(user =>
            res.status(200).json({ user, msg: 'account deleted successfully' }) ).catch (err => {
                res.send(err)
            });
    })
router.get('/image', checkAuth, (req, res) => {
    res.send(req.userData.user.user_image);
})
    


module.exports = router;


