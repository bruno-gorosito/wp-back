const express = require('express');
const userController = require('../controller/userController')


const router = express.Router();


//create an user
router.post('/signup', 
    userController.createUser
)

router.post('/login', 
    userController.login
)

module.exports = router