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
        "<div class='list-left' style='width:120%;'>" +
          "<p> Name: " + output.artist.name + "</p><p> Song Title: " + output.track.name + "</p><p>" +
          output.track.text + "</p>"
        + "</div></li>");
      
    }
  )

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part : 'snippet, id',
      q : track,
      type : 'video',
      key : 'AIzaSyCRwSk1SS6LsbYiOh3b9HVZQhHfWI2QgGM'
    },
      function(result){
        
        console.log(result)
        //display result
        $('#music-video').html(
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/' 
        + result.items[0].id.videoId +
        '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        );
      }
    )
  
      
    
  $('#artist').val('');
  $('#track').val('');    
}