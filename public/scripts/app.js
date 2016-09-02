console.log("Sanity Check: JS is working!");
var path = '/api'
$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: path + '/profile',
    success: handleProfile,
    error: onError,
    dataType: 'json'
  });

  function handleProfile(json){
    var source = $('#profile-template').html();
    var template = Handlebars.compile(source);
    var html = template(json);
    $('#profile-list').append(html);
  }

  $.ajax({
    method: 'GET',
    url: path + '/cities',
    success: handleCities,
    error: onError,
    dataType: 'json'
  });

  function handleCities(json){
    var source = $('#cities-template').html();
    console.log(source);
    var template = Handlebars.compile(source);
    var html = template({cities: json});
    $('#cities-list').append(html);
  }

});
function onError(){
  console.log('error');
}
