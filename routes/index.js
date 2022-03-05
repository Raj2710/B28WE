var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig');

//getting all food
router.get('/',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    let db = await client.db('b28we');
    let foods = await db.collection('food').find().toArray();
    console.log(foods)
    res.send({
      statusCode:200,
      data:foods
    })
  } catch (error) {
    console.log(error);
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
  finally{
    client.close()
  }
})

//getting food by category and/or sub-category

//filter by category
//filter by sub - category
//filter by both category and sub-category
router.get('/type',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
    try {
      const db = await client.db('b28we');
      let food;
      if(req.body.category && req.body.sub_category)
      {
          food = await db.collection('food').find({
            $and:[
              {category:req.body.category},
              {sub_category:req.body.sub_category}
            ]
          }).toArray()
      }
      else if(req.body.category && !req.body.sub_category)
      {
        food = await db.collection('food').find({category:req.body.category}).toArray()
      }
      else if(!req.body.category && req.body.sub_category)
      {
        food = await db.collection('food').find({sub_category:req.body.sub_category}).toArray()
      }

      res.send({
        statusCode:200,
        data:food
      })
      
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
    finally{
      client.close();
    }
})

//sort by price
router.get('/sort/:order',async(req,res)=>
{
  let order = req.params.order;
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('b28we');
    let food = await db.collection('food').find().sort({price:order}).toArray()
    res.send({
      statusCode:200,
      data:food
    })
    
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    client.close();
  }
})


//create food
router.post('/',async(req,res)=>{
    const client = await MongoClient.connect(dbUrl);
    try {
      const db = await client.db('b28we');
      let food = await db.collection('food').insertOne(req.body);
      res.send({
        statusCode:200,
        message:"Food Added Successfully",
        data:food
      })
      
    } catch (error) {
      console.log(error);
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
    finally{
      client.close();
    }
})

//update food
router.put('/:id',async(req,res)=>{
  const id = req.params.id;
  const client = await MongoClient.connect(dbUrl)
  try {
    let db = await client.db('b28we');
    let food = await db.collection('food').findOneAndReplace({_id:mongodb.ObjectId(id)},req.body)

    res.send({
      statusCode:200,
      message:"Changes Saved",
    })
  } catch (error) {
    console.log(error);
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
  finally{
    client.close()
  }
})


//delete food
router.delete('/:id',async(req,res)=>{
  const id = req.params.id;
  const client = await MongoClient.connect(dbUrl)
  try {
    let db = await client.db('b28we');
    let food = await db.collection('food').findOneAndDelete({_id:mongodb.ObjectId(id)})
    console.log(food)
    res.send({
      statusCode:200,
      message:"Food Deleted",
    })
  } catch (error) {
    console.log(error);
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
  }
  finally{
    client.close()
  }
})


module.exports = router;
