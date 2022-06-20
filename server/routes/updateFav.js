const router = require('express').Router()
const { User } = require('../models/user')

router.put('/', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        user.favoriteRecipeIds = req.body.favoriteRecipeIds
        console.log(user);

        await user.save()
        res.status(200).send({ message: 'success', result: user })
    } catch (error) {
        res.status(500).send({ message: "internal server error" })
    }
})

module.exports = router