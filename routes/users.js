var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {UserDetails} = require('../Schema');

mongoose.connect(dbUrl);

router.get('/',async(req,res)=>{
  
  try{
    const details = await UserDetails.find()
    res.send({
      statusCode:200,
      users:details
    })
  }
  catch(error)
  {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})
router.post('/',async(req,res)=>{
    try {
      const details = await UserDetails.create(req.body)
      res.send({
        statusCode:200,
        message:"User Created"
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
    }

})

router.put('/:id',async(req,res)=>{
  try{
    const details = await UserDetails.updateOne({_id:req.params.id},req.body)
    res.send({
      statusCode:200,
      message:"Changes Saved"
    })
  }
  catch(error)
  {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})


router.delete('/:id', async(req,res)=>{
  try {
    await UserDetails.deleteOne({_id:req.params.id})
    res.send({
      statusCode:200,
      message:"User Deleted"
    })
  } catch (error) {
    console.log(error)
      res.send({
        statusCode:500,
        message:"Internal Server Error",
        error:error
      })
  }
})
module.exports = router;
