const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const router = Router()


 // /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is not corect').isEmail(),
        check('password', 'password will have 6 symbol')
            .isLength({min:6})

    ],
    async(req, res)=>{
        try {

            console.log('Body', req.body)
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'data for register is not corect'
                })
            }

            const {email, password} = req.body

            const candidate = await User.find({email})
         
            if(candidate.length){
                return res.status(400).json({message:'This user is register'})
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashPassword})
         

            await user.save()

            res.status(201).json({message:"Save user"})


        } catch(e){
            res.status(500).json({message: "You have problem! Restart app!"})
        }
    })

//  /api/auth/login
router.post('/login',   
    [
        check('email', 'Email is not corect').normalizeEmail().isEmail(),
        check('password', 'password does not corect').exists()
    ],
    async(req, res)=>{
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'data for login is not corect'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            
            if(!user){
                return res.status(400).json({message:"user doesn`t find"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return  res.status(400).json({message:"data is not corect"})
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                config.get('jwtSecret'),
                {expiresIn:'1h'}
            )
            
            res.json({token, userId: user.id})

        } catch(e){
            res.status(500).json({message: "You have problem! Restart app!"})
        }
})

module.exports = router