var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig')
const {hashing,hashCompare,role,sample,createJWT,authVerify} = require('../auth')

router.post('/register',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try{
    let db = await client.db('b28we');
    let user = await db.collection('users').findOne({email:req.body.email})

    if(user)
    {
      res.send({
        statusCode:400,
        message:"User already exists"
      })
    }
    else
    {
        //hashing the password and saving it in the db
        let hashedPassword = await hashing(req.body.password)
        req.body.password = hashedPassword;
        let doc = await db.collection('users').insertOne(req.body)
        res.send({
          statusCode:200,
          message:'Account Created'
        })
    }
  }
  catch(error)
  {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server error"
    })
  }
  finally{
    client.close();
  }

})


router.post('/login',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try{
    let db = await client.db('b28we');
    let user = await db.collection('users').findOne({email:req.body.email})

    if(!user)
    {
      res.send({
        statusCode:400,
        message:"User Not found"
      })
    }
    else
    { 
      //COMPARE THE PASSWORD AND ALLOW FOR LOGIN
      let compare = await hashCompare(req.body.password,user.password)
      console.log(compare)
      if(compare==true)
      {
        //jwt token
        const token = await createJWT({email:req.body.email})
        res.send({
          statusCode:200,
          token,
          message:'Login Successfull'
        })
      }
      else{
        res.send({
          statusCode:401,
          message:'Invalid Password'
        })
      }
    }
  }
  catch(error)
  {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal Server error"
    })
  }
  finally{
    client.close();
  }

})


router.get('/verify-token/:token',async(req,res)=>{
    const validity = await authVerify(req.params.token)
    if(validity)
    {
      res.send({
        statusCode:200,
        message:"Valid Session"
      })
    }
    else
    {
      res.send({
        statusCode:401,
        message:"Session Timedout"
      })
    }
})
module.exports = router;
