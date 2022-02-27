var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    statusCode:200,
    message:"Welcome to User"
  });
});

module.exports = router;
