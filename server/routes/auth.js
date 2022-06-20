const router = require('express').Router()
const { User } = require('../models/user')
const Joi = require('joi')
const bcyrpt = require('bcrypt')

router.post('/', async (req, res) => {

    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).send({ message: "Invalid email or Password" })
        }

        const validPassword = await bcyrpt.compare(
            req.body.password, user.password
        )

        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or Password" })
        }

        const token = user.generateAuthToken();
        return res.status(200).send({ data: token, email: req.body.email, favoriteRecipeIds: user.favoriteRecipeIds, message: "Logged In" })

    } catch (error) {
        res.status(500).send({ message: "internal server error" })
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
}

module.exports = router