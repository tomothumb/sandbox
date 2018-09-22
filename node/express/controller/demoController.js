
const demoController = {};

demoController.getList = function(req,res, next){
    res.send('demoController list')
};

demoController.getDetail = function(req,res, next){
    res.render('demo/detail',{param:req.params})
    // res.send('demoController detail Query:' + req.params.pageId)
};


module.exports = demoController;