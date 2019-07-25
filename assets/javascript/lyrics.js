$('#search-form').submit(function(event){
  event.preventDefault();  
});

//a submit function to search through the youtube api
function searchLyrics(){
  
  //clear results
  $('#results').html('');
    
  //get form input
  artist = $('#artist').val();
  track = $('#track').val();
    
  //runs GET request on api
  $.get(
  "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + track + "?apikey=zouSrHlkAxmQZA4mbZKxKfjrTEgAd6m71HANOV4TPMHTAUlV4uDr6aeGcQP8NOrQ",
    
  function(data){

        //Get output
        var output = data.result;
        
        //display result
        $('#results').html("<li>" +
        "<div class='list-left'>" +
          "<p> Name: " + output.artist.name + "</p><p> Song Title: " + output.track.name + "</p><p>" +
          output.track.text + "</p>"
        + "</div></li>");
      
    }
  )
  $('#artist').val('');
  $('#track').val('');    
}
  