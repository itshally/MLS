$('#search-form').submit(function(event){
    event.preventDefault();
})


  function searchMusic(){
			

    //clear results
    $('#results').html('');
    $('#buttons').html('');
    
    //get form input
    q = $('#query').val();
    
    //run GET request on api
    $.get(
      "https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
        part : 'snippet, id',
        q : q,
        type : 'video',
        key : 'AIzaSyAgqPcKzYvrjDwyqf_H7THdGoueevTplRo'
      },
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        
        console.log(data);
        
        $.each(data.items, function(index, value){
          //Get output
          var output = getOutput(value);

          //display result
          $('#results').append(output);
        })
      }
      )
      
      function getOutput(item){
          
          var videoId = item.id.videoId;
          var title = item.snippet.title;
          var thumb = item.snippet.thumbnails.high.url;
          var channelTitle = item.snippet.channelTitle;
          var videoDate = item.snippet.publishedAt;
          
          var output = "<li>" +
          "<div class='list-left'>" +
          "<img src='" + thumb + "'>" +
          "</div>" +
          "<div class='list-right'>" + 
          "<h3><a class='fancybox fancybox.iframe' href='http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" + 
          "<small>By <span class='cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" +
          "</div></li>" + "<div class='clearfix'></div>"
          
          return output;
      }
    $('#query').val('');
    
  }

