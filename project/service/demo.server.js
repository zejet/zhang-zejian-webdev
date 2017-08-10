var app = require('../../express');
var fs = require('fs');

// html handlers
app.get("/projectapi/test", test);

function test(req,res) {

    res.send("OKKKKK");
}

app.get('/projectapi/music', function(req,res){
    // File to be served

    var fileId = req.query.id;
    var file = __dirname + '/music/' + fileId;
    fs.exists(file,function(exists){
        if(exists)
        {
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else
        {
            res.send("Its a 404");
            res.end();
        }

    });

});

app.get('/projectapi/download', function(req,res){
    var fileId = req.query.id;
    var file = __dirname + '/music/' + fileId;
    fs.exists(file,function(exists){
        if(exists)
        {
            res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
            res.setHeader('Content-Type', 'application/audio/mpeg3')
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else
        {
            res.send("Its a 404");
            res.end();
        }
    });


});