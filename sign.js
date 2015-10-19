var http = require('http');
exports.find = function(req,res,thost,tport,output,success){
    var headers = req.headers;
    headers.host = 'localhost';
    var options = {
        host: thost,
        port: tport,
        path: '/api'+req.path,
        method: req.method,
        headers: headers    
    };
    var req = http.request(options, function(apacheRes) {
        apacheRes.setEncoding('utf8');
        apacheRes.on('data', function (data) {
          var data = JSON.parse(data);

          success(apacheRes,data);
          output = data;

        });
    }); 
    req.on('error', function(e){
       console.log("auth_user error: " + e.message);
    });
    req.end();
}
exports.findGroup = function(req,res,thost,tport,output){
    var header = req.headers;
    header.host = 'localhost';
    var opt = {
        host:     thost,
        port:     tport,
        path:     '/api'+req.path,
        method:   req.method,
        headers:  header
    };
    console.log(opt);
    var body = '';
    var req = http.request(opt, function(res) {
        res.on('data',function(d){
            body += d;
            console.log(body);
        }).on('end', function(){
            res.send(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    })
    req.write(require('querystring').stringify(req.body));
    req.end();
}
exports.findSpecific = function(req,res,thost,tport,output,tpath,success){
    var headers = req.headers;
    headers.host = 'localhost';
    var options = {
        host: thost,
        port: tport,
        path: '/api'+tpath,
        method: req.method,
        headers: headers    
    };
    var req = http.request(options, function(apacheRes) {
        apacheRes.setEncoding('utf8');
        apacheRes.on('data', function (data) {
          var data = JSON.parse(data);

          success(apacheRes,data);
          output = data;
        });
    }); 
    req.on('error', function(e){
       console.log("auth_user error: " + e.message);
    })
    
    req.end();
}