var express = require('express');
var router = express.Router();
var rootkey = "db0954e9af4006171422f307c8b86597";
var userkey = "b44f452ef55682591b1f525e219fbfcb";
/* For username and password verification */
router.get('/users', function(req, res, next) {
	//console.log(req.query.username);
	//console.log(req.query.password);

    //if(req.query.subscriptionkey != rootkey)
    //{
      //  res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    //}else{
	   var db = req.db;
        db.collection('userlist').find().toArray(function (err, items) {
        	res.json(items);
	   });
    //}
  	res.send('receive users'+req.query.username+req.query.password);
});

router.post('/login', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.body.username==null || req.body.password==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{
        res.contentType('json');
        var db = req.db;
        var userlist = db.collection('userlist');
        userlist.find({username:req.body.username}).toArray(function (err, result) {
    	   if(result.length<=0)
    	   {
                res.send(JSON.stringify({ RET:400,status:"can't find username" }));
    	   }else if(result[0].password != req.body.password)
    	   {
                res.send(JSON.stringify({ RET:401,status:"password incorrect" }));
    	   }else{
                res.send(JSON.stringify({ RET:200,status:"success" }));
    	   }
    	//res.json(result);
        });
    }
});

router.post('/signup', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.body.username==null || req.body.password==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{
	   res.contentType('json');
	   var db = req.db;
	   var userlist = db.collection('userlist');
        userlist.find({username:req.body.username}).toArray(function (err, result) {
        console.log(result);
    	if(result.length==0)
    	{
            console.log(req.body.username);
            console.log(req.body.password);
    		userlist.insert({username:req.body.username, password:req.body.password}, function(err, result) {
    			if(err)
    			{
    				res.send(JSON.stringify({ RET:500,status:"internal error" }));
    			}else{
    				res.send(JSON.stringify({ RET:200,status:"success" }));
    			}
    		});
    		
    	}else{
    		res.send(JSON.stringify({ RET:400,status:"username already existed" }));
    	}
    	//res.json(result);
	});
    }
});

router.get('/passages', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else {
	   var db = req.db;
        db.collection('passages').find().toArray(function (err, items) {
    	   res.json(items);
	   });
    }
});

router.get('/passages/:id', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
	   var db = req.db;
        db.collection('passages').find({id:req.params.id}).toArray(function (err, result) {
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
    }
});

router.post('/passages', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.body.id==null || req.body.passage==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
        var db = req.db;
        db.collection('passages').insert({id:req.body.id, passage:req.body.passage, title:req.body.title, picture:req.body.picture, time:req.body.time}, function (err, result) {
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

router.put('/passages/:id', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.params.id==null || req.body.passage==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('passages').update({id:req.params.id}, {id:req.params.id, passage:req.body.passage, title:req.body.title, picture:req.body.picture, time:req.body.time}, {safe: true}, function (err, result) {
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

router.delete('/passages/:id', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
	   var db = req.db;
        db.collection('passages').remove({id:req.params.id}, function (err, result) {
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


router.get('/profiles', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
	   var db = req.db;
         db.collection('profiles').find().toArray(function (err, items) {
    	   res.json(items);
	   });
     }
});

router.get('/profiles/:username', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
	   var db = req.db;
        db.collection('profiles').find({username:req.params.username}).toArray(function (err, result) {
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
    }
});

router.post('/profiles', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.body.username==null || req.body.age==null || req.body.weight==null || req.body.height==null || req.body.queries==null )
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('profiles').insert({username:req.body.username, age:req.body.age, weight:req.body.weight, height:req.body.height, queries:req.body.queries}, function (err, result) {
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

router.put('/profiles/:username', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.params.username==null || req.body.age==null || req.body.weight==null || req.body.height==null || req.body.queries==null )
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
	   var db = req.db;
        db.collection('profiles').update({username:req.params.username}, {username:req.params.username, age:req.body.age, weight:req.body.weight, height:req.body.height, queries:req.body.queries}, {safe: true}, function (err, result) {
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

router.delete('/profiles/:username', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else {
	   var db = req.db;
        db.collection('profiles').remove({id:req.params.username}, function (err, result) {
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


router.get('/feedback', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
       var db = req.db;
         db.collection('feedback').find().toArray(function (err, items) {
           res.json(items);
       });
     }
});

router.get('/feedback/:username', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else{
       var db = req.db;
        db.collection('feedback').find({username:req.params.username}).toArray(function (err, result) {
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
    }
});

router.post('/feedback', function(req, res, next) {
    if(req.query.subscriptionkey != userkey && req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else if(req.body.username==null || req.body.content==null)
    {
        res.send(JSON.stringify({ RET:402,status:"wrong JSON format" }));
    }else{ 
       var db = req.db;
        db.collection('feedback').insert({username:req.body.username, content:req.body.content}, function (err, result) {
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

router.delete('/feedback/:username', function(req, res, next) {
    if(req.query.subscriptionkey != rootkey){
        res.send(JSON.stringify({ RET:404,status:"permission denied" }));
    }
    else {
       var db = req.db;
        db.collection('feedback').remove({id:req.params.username}, function (err, result) {
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

module.exports = router;
