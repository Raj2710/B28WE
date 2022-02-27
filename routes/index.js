var express = require('express');
var router = express.Router();

let students = [
  {
      name:"Prakhar",
      class:"B28WE",
      email:"prakhar@gmail.com",
      mobile:"12345667"
  },
  {
      name:"vignesh",
      class:"B28WE",
      email:"vignesh@gmail.com",
      mobile:"123456789"
  },
  {
      name:"Varnisha",
      class:"B28WE",
      email:"varnisha@gmail.com",
      mobile:"9865456896"
  }
]
router.get('/',(req,res)=>{
  res.send({
      statusCode:200,
      data:students
  });
})

router.get('/:id',(req,res)=>{
  if(req.params.id<students.length)
  {
      res.send({
          statusCode:200,
          data:students[req.params.id]
      })
  }
  else
  {
      res.send({
          statusCode:400,
          message:"Invalid Id"
      })
  }
})

router.post('/add',(req,res)=>{
  students.push(req.body)
  res.send({
      statusCode:201,
      message:"Student Added Successfully"
  })
})

router.put('/edit/:id',(req,res)=>{
  if(req.params.id<students.length)
  {
      students.splice(req.params.id,1,req.body)
      res.send({
          statusCode:201,
          message:"Student Edited Successfully"
      })
  }
  else
  {
      res.send({
          statusCode:400,
          message:"Invalid Id"
      })
  }
})

router.delete('/delete/:id',(req,res)=>{
  if(req.params.id<students.length)
  {
      students.splice(req.params.id,1)
      res.send({
          statusCode:200,
          message:"Student Deleted Successfully"
      })
  }
  else
  {
      res.send({
          statusCode:400,
          message:"Invalid Id"
      })
  }
})

module.exports = router;
