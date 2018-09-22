var express = require('express');
var router = express.Router();
var demoController = require('../controller/demoController');

router.get('/', function(req, res, next) {
    res.render('demo',{ title: 'DDEEMMOO'});
});
//
// router.get('/sample', function(req, res, next) {
//     res.send('sample');
// });
//
// router.get('/param/:userId/:bookId', function (req, res) {
//     res.send(req.params)
// });
// router.get('/param_demo/:userId/:bookId', function (req, res) {
//     res.render('param_demo',{param:req.params})
// });


router.get('/list', demoController.getList);
router.get('/detail/:pageId', demoController.getDetail);




module.exports = router;
