var express = require('express');
var router = express.Router();
var sign = require('../sign');
var config = require('../config');

router.get('/courses', function(req, res, next) {
    var outputs = '';
    //var output = '';
	var servers = config.getServerList('courses');
    for(var index = 0; index < servers.length; index++) {
        var serverlist = servers[index].split(':');
        sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
           console.log(data);
        })
        console.log(output);
        outputs += outputss;
    }
    res.send(outputs);
});

router.get('/courses/:name', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.params.name[0]);
    var serverlist = server.split(':');
    sign.findGroup(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.post('/courses', function(req, res, next) {
    var output = '';
    //console.log(req.body);
    //var server = config.find('courses', req.body.name[0]);
    var server = 'localhost:8000';
    var serverlist = server.split(':');
    //console.log(serverlist);
    sign.findGroup(req, res, serverlist[0], serverlist[1], output);
  	
});

router.post('/findCourses', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.body.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.post('/addStudentToCourse', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.body.coursename[0]);
    var serverlist = server.split(':');
    sign.findSpecific(req, res, serverlist[0], serverlist[1], output, '/addStudentToCourse', function(res2, data){
        console.log(data);
        //res.send(data);
    })
    server = config.find('students', req.body.studentname[0]);
    serverlist = server.split(':');
    sign.findSpecific(req, res, serverlist[0], serverlist[1], output, '/addCourseToStudent', function(res2, data){
        console.log(data);
        //res.send(data);
    })
    res.send(JSON.stringify({ RET:200,status:"success" }));
});

router.put('/courses/:name', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.params.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.delete('/courses/:name', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.params.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.delete('/deleteStudentFromCourse', function(req, res, next) {
    var output = '';
    var server = config.find('courses', req.body.coursename[0]);
    var serverlist = server.split(':');
    sign.findSpecific(req, res, serverlist[0], serverlist[1], output, '/deleteStudentFromCourse', function(res2, data){
        console.log(data);
        //res.send(data);
    })
    server = config.find('students', req.body.studentname[0]);
    serverlist = server.split(':');
    sign.findSpecific(req, res, serverlist[0], serverlist[1], output, '/deleteCourseFromStudent', function(res2, data){
        console.log(data);
        //res.send(data);
    })
    res.send(JSON.stringify({ RET:200,status:"success" }));
    
});

router.get('/students', function(req, res, next) {
    var outputs = '';
    var output = '';
    var servers = config.getServerList('students');
    for(var index = 0; index < servers.length; index++) {
        var serverlist = servers[index].split(':');
        sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
            
        })
        outputs += output;
    }
    res.send(outputs);
});

router.get('/students/:name', function(req, res, next) {
    var output = '';
    var server = config.find('students', req.params.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.post('/students', function(req, res, next) {
    var output = '';
    var server = config.find('students', req.body.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.put('/students/:name', function(req, res, next) {
    var output = '';
    var server = config.find('students', req.params.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

router.delete('/students/:name', function(req, res, next) {
    var output = '';
    var server = config.find('students', req.params.name[0]);
    var serverlist = server.split(':');
    sign.find(req, res, serverlist[0], serverlist[1], output, function(res2, data){
        console.log(data);
        res.send(data);
    })
});

module.exports = router;
