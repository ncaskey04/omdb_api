var express = require("express");
var request = require("request"); // handles API request
var app = express();

app.set("view engine", "ejs");

// requests info from url '/' and responds with index.ejs
app.get('/', function (req, res){
  res.render('index');
});

// links the form action 'search' in index.ejs to url in app.get and sends the user to 'search page'
app.get('/search', function (req, res){
  var query = req.query.searchTerm;
  // res.send("search page: " + query);
  var url = "http://www.omdbapi.com/?s=" + query;
  
  request(url, function (error, response, body) { //error object if something goes wrong, body which is the content of the message
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body); //take all the string data and we process it in a JS object
      console.log(data);
      res.render("results", {movieList : data.Search || [] });
       }
  });

  app.get('/movie/:id/', function (req,res){
    var movieId = req.params.id;
    var url = 'http://www.omdbapi.com/?i=' + movieId;

    request(url, function (error, response, body){
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        console.log(data);
        res.render('show', {movie: data});
      }
    }) // end of request

  }); // this is the end of the omdbID API call
  
}); // end of app.get 

//request will just request data from the url, that data returns when the request function gets called


app.listen(3000, function(req,res){
  console.log("LISTENING ON localhost:3000");
});