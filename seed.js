// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
db.City.create(new City{name: 'San Francisco', location: 'California, USA', description: "The wealthiest city of the Bay Area, and the USA's most expensive city to live in"},
                function(err, city){
                  if(err){
                    return console.log("Error:", err);
                  }
                });

process.exit(); // we're all done! Exit the program.

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
