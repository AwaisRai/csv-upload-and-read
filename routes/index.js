var express = require('express');
const request = require('request')
var { Progress } = require('../node_modules/express-progressbar/Progress');
const csv = require('csvtojson');
const csvtojsonV2=require("csvtojson/v2");
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/csv', function (req, res, next) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // const csvFilePath='<path to csv file>'
  const csv=require('csvtojson')
  csv()
  .fromFile(req.files.file.tempFilePath)
  .then((jsonObj)=>{
      console.log(jsonObj);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */ 
  })
  // csv()
  //   .fromStream(request.get(req.files.file.tempFilePath))
  //   .subscribe((json) => {
  //     console.log(json)
  //     //     // return new Promise((resolve,reject)=>{
  //     //         // long operation for each json e.g. transform / write into database.
  //     //     // })
  //   }, onError, onComplete);

  console.log(req.files); // the uploaded file object
  res.send(req.files.file.tempFilePath);
});

router.get('/progress', (request, response) => {
  const p = new Progress(response);

  let i = 0;
  const int = setInterval(() => {
    if (i > 100) {
      p.close();
      clearInterval(int);
    } else {
      p.update(i / 10 * 10, {
        isCool: true
      });

      i++;
    }
  }, 1000);
});



module.exports = router;
