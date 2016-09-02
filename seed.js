// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
console.log('Sanity Test');
var db = require('./models');
var sf = {
  name: 'San Francisco',
  location: 'California, USA',
  description: "The wealthiest city of the Bay Area, and the USA's most expensive city to live in"
};

console.log("about to clear cities");
db.City.remove({}, function(err, cities){
  console.log("erasing cities");
});

console.log("about to create", sf)

db.City.create(sf, function(err, city){
  console.log("created", city)
  if(err){
    console.log("Error:", err);
  }
  console.log('why');
  process.exit(); // we're all done! Exit the program.
});

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
