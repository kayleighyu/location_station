var express = require('express');
var server = express();
var port = process.env.PORT || 8080;

var apiKey = require('./secrets').GeocodeAPIKey;

var axios = require('axios');

server.get('/posts/:postId', function(request, response){
  var url = `https://jsonplaceholder.typicode.com/posts/${request.params.postId}`;
  axios.get(url)
        .then(function(results){
          response.send(results.data);
        })
        .catch(function(err){
          response.send(err);
        });
});

server.get('/location/:address', function(request, response){
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.params.address}&key=${apiKey}`;
  axios.get(url)
        .then(function(results){
          response.send(results.data);
        })
        .catch(function(err){
          response.send(err);
        });
});

server.listen(port, function(){
  console.log('Now listening on port...', port);
});
