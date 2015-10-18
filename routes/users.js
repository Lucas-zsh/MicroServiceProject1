var express = require('express');
var router = express.Router();

router.get('/courses', function(req, res, next) {
    /*if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else {*/
	   var db = req.db;
        db.collection('courses').find().toArray(function (err, items) {
    	   res.json(items);
	   });
    //}
});

router.get('/courses/:id', function(req, res, next) {
    /*if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{*/
	   var db = req.db;
        db.collection('courses').find({id:req.params.id}).toArray(function (err, result) {
    	   if(err)
    	   {
    		  res.contentType('json');
    		  res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else if(result.length==0){
    		  res.contentType('json');
    		  res.send(JSON.stringify({ RET:400,status:"passage not found" }));
    	   }
    	   else{
    	       	res.json(result[0]);
    	   }
	   });
    //}
});

router.post('/courses', function(req, res, next) {
    /*if(req.param.subscriptionkey != rootkey){
        console.log(req.param.subscriptionkey);
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }*/
    if(req.body.id==null || req.body.passage==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
        var db = req.db;
        db.collection('courses').insert({id:req.body.id, passage:req.body.passage, title:req.body.title, picture:req.body.picture, time:req.body.time}, function (err, result) {
    	   if(err)
        	{
    		  res.contentType('json');
    		  res.send(JSON.stringify({ RET:500,status:err }));
    	   }else{
    		  res.contentType('json');
  			   res.send(JSON.stringify({ RET:200,status:"success"}));
  		    }
        });
    }
  	
});

router.post('/findCourses', function(req, res, next) {
    
    
});

router.post('/addStudentToCourse', function(req, res, next) {
    
    
});

router.put('/courses/:id', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }*/
    if(req.params.id==null || req.body.passage==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('courses').update({id:req.params.id}, {id:req.params.id, passage:req.body.passage, title:req.body.title, picture:req.body.picture, time:req.body.time}, {safe: true}, function (err, result) {
    	   console.log(result);
    	   if(err)
    	   {
    	       	res.contentType('json');
    		  res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else{
    	       	res.contentType('json');
  			   res.send(JSON.stringify({ RET:200,status:"success"}));
  		    }
	   });
    }
});

router.delete('/courses/:id', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{*/
	   var db = req.db;
        db.collection('courses').remove({id:req.params.id}, function (err, result) {
    	   if(err)
    	   {
    		  res.contentType('json');
    	       res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else{
    		  res.contentType('json');
  			   res.send(JSON.stringify({ RET:200,status:"success"}));
  		    }
     });
    //}	
});

router.delete('/deleteStudentFromCourse', function(req, res, next) {
    
    
});

router.get('/students', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{*/
	   var db = req.db;
         db.collection('students').find().toArray(function (err, items) {
    	   res.json(items);
	   });
    // }
});

router.get('/students/:id', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{*/
	   var db = req.db;
        db.collection('students').find({username:req.params.id}).toArray(function (err, result) {
    	   if(err)
    	   {
    	       	res.contentType('json');
    	       	res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else if(result.length==0){
    	       	res.contentType('json');
    	       	res.send(JSON.stringify({ RET:400,status:"profile not found" }));
    	   }
    	   else{
    	       	res.json(result[0]);
    	   }
	   });
   // }
});

router.post('/students', function(req, res, next) {
    /*if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else */if(req.body.username==null || req.body.age==null || req.body.weight==null || req.body.height==null || req.body.queries==null )
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('students').insert({username:req.body.username, age:req.body.age, weight:req.body.weight, height:req.body.height, queries:req.body.queries}, function (err, result) {
    	   if(err)
    	   {
                res.contentType('json');
    	       	res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else{
    		  res.contentType('json');
  		    	res.send(JSON.stringify({ RET:200,status:"success"}));
  		    }
     });
    }
  	
});

router.post('/addCourseToStudent', function(req, res, next) {
    
    
});

router.put('/students/:username', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else */if(req.params.username==null || req.body.age==null || req.body.weight==null || req.body.height==null || req.body.queries==null )
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('students').update({username:req.params.username}, {username:req.params.username, age:req.body.age, weight:req.body.weight, height:req.body.height, queries:req.body.queries}, {safe: true}, function (err, result) {
    	   console.log(result);
    	   if(err)
        	{
    		  res.contentType('json');
    		  res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else{
    		  res.contentType('json');
  		    	res.send(JSON.stringify({ RET:200,status:"success"}));
  		    }
	   });
    }
});

router.delete('/students/:username', function(req, res, next) {
    /*if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else {*/
	   var db = req.db;
        db.collection('students').remove({id:req.params.username}, function (err, result) {
    	   if(err)
    	   {
    		  res.contentType('json');
    		  res.send(JSON.stringify({ RET:500,status:"internal error" }));
    	   }else{
    	       	res.contentType('json');
  			   res.send(JSON.stringify({ RET:200,status:"success"}));
  	 	    }
        });
    //}
  	
});

router.delete('/deleteCourseFromStudent', function(req, res, next) {
    
    
});
module.exports = router;
