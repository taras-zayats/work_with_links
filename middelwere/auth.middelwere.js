const jwt = require('jsonwebtoken')
const config = require('config')

module.exports =  function (req, res, next){
    if(req.method === "OPTIONS"){
        return next()
    }

    try{

        //console.log('req',req.headers)
        //const token = req.header.authorization.split(' ')[1] //'Bearer token'
       // console.log('userId', )
    
        if(!req.headers.userid){
            return res.json(401).json({message:'User does`nt authorization'})
        }
        
        /*
        const decode =  jwt.verify(token, 'secret',function(err, decoded) {
            console.log('good') // bar
          })
        console.log('1111111111111111111111111111111', decode)*/
        req.user = req.headers.userid
        next()
        
    }catch(e){
        return  res.json(401).json({message:'User does`nt authorization'})
    }
}