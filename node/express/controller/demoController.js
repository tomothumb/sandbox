
const demoController = {};

demoController.getList = function(req,res, next){

    let pages = [
        {'page_id':10},
        {'page_id':12},
        {'page_id':14},
        {'page_id':16},
        {'page_id':18},
        {'page_id':200}
    ];
    res.render('demo/list',{
        'pages': pages
    });

};

demoController.getDetail = function(req,res, next){
    res.render('demo/detail',{
        param:req.params,
        'layout': 'demo/layout'
    })
    // res.send('demoController detail Query:' + req.params.pageId)
};


module.exports = demoController;