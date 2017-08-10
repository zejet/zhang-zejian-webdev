 var app = require('./express');
 
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(app.express.static(__dirname + '/public'));
   
 var port = process.env.PORT || 3000;
 // require("./test/app");
 require("./assignment/app");
 require("./project/app");
  
 app.listen(port);