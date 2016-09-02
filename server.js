// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/14budig/express-personal-api/README.md",
    baseUrl: "https://ancient-shore-92488.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/cities", description: "List of cool cities"},
      {method: "POST", path: "/api/cities", description: "Add a city to list"},
      {method: "PUT", path: "/api/cities", description: "Update a city to list"},
      {method: "DELETE", path: "/api/cities", description: "Remove a city from list"}
    ]
  })
});

app.get('/api/profile', function(req, res){
  res.json({
    name: "Nick Budig",
    githubLink: "https://github.com/14budig",
    githubProfileImage: 'https://avatars2.githubusercontent.com/u/12077419',
    personalSiteLink: 'https://14budig.github.io',
    currentCity: "San Francisco",
    pets: []
  });
});

app.get('/api/cities', function(req, res){
  db.City.find(function(err, cities){
    if (err) { return console.log("index error: " + err); }
    res.json(cities);
  })
});

app.get('/api/cities/:id', function(req, res){
  db.City.findOne({_id: req.params.id},function(err, cities){
    if (err) { return console.log("index error: " + err); }
    res.json(cities);
  });
});

app.post('/api/cities', function(req,res){
  db.City.save({name: req.body.name,
              location: req.body.location,
              description: req.body.description
  }, function(err, savedCity){
    res.json(savedCity);
  });
});

app.delete('/api/cities/:id', function(req, res){
  db.City.findOneAndRemove({_id: req.params.id}, function(error, city){
    res.json(city);
  });
});

app.put('/api/cities/:id', function(req, res){
  db.City.findOneAndUpdate({id: req.params.id}, {$set:{description: req.body.description}}, {new: true}, function(err, city){
    res.json(city);
  });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
