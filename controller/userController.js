const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.createUser = async(req, res) => {
    try {
        let {name, lastName, email, password} = req.body
        const salt = bcrypt.genSaltSync(10);
        password = await bcrypt.hashSync(password, salt)
        const user = await new User({name, lastName, email, password})
        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
        res.send('Hubo un error').status(400)
    }
}


exports.login = async(req, res) => {
    try {
        
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send('Datos incorrectos')
        }
        const correct = await bcrypt.compare(req.body.password, user.password);
        if (!correct) {
            return res.status(400).send('Datos incorrectos')
        }
        const {password, ...userWithoutPass} = user
        const payload = {
            usuario: {
                id: user.id,
                name: user.name,
                last_Name: user.lastName
            }
        } 
        const token = await jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        })

        return res.send(token)
    } catch (error) {
        console.log(error)
        return res.send('Hubo un error').status(400)
    }
}