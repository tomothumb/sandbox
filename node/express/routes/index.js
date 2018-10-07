const request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/demo', function(req, res, next) {
    res.send('get demo');
});
router.post('/demo', function(req, res, next) {
    console.log('receive post request.');
    console.log(req.body);
    res.send('post demo');
});

router.get('/get_sample', function(req, res, next) {
    request.post('http://127.0.0.1:3001/demo',{
        qs: {
            'title': 'xxxx',
            'body': 'yyyy'
        }
    }, function (err,res,body) {
        console.log(err, res, body);
        // console.log(response.statusCode) // 200
        // console.log(response.headers['content-type']) // 'image/png'
        // console.log(response) // 200
        res.send(body);
    });
});
router.get('/post_sample', function(req, res, next) {
    request.post('http://127.0.0.1:3001/demo',{
        form: {
            'title': 'xxxx',
            'body': 'yyyy'
        }
    }, function (err,res,body) {
        console.log(err, res, body);
        // console.log(response.statusCode) // 200
        // console.log(response.headers['content-type']) // 'image/png'
        // console.log(response) // 200
        res.send(body);
    });
});


module.exports = router;
