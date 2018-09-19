var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hoge', function(req, res, next) {
    res.send('hoge');
});

router.get('/demo', function(req, res, next) {
    res.render('demo',{ title: 'DDEEMMOO23'});
});

router.get('/param/:userId/:bookId', function (req, res) {
    res.send(req.params)
});
router.get('/param_demo/:userId/:bookId', function (req, res) {
    res.render('param_demo',{param:req.params})
});


module.exports = router;
