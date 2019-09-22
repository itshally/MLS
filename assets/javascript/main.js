$('#search-form').submit(function(event){
  event.preventDefault();  
});

//a submit function to search through the youtube api
function searchMusic(){
  
  //clear results
  $('#results').html('');
  $('#buttons').html('');
    
  //get form input
  q = $('#query').val();
    
  //runs GET request on api
  $.get(
  "https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
    part : 'snippet, id',
    q : q,
    type : 'video',
    key : 'AIzaSyCRwSk1SS6LsbYiOh3b9HVZQhHfWI2QgGM'
  },
    function(data){

      //variables for the page tokens
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;
      
      $.each(data.items, function(index, value){
        
        //Get output
        var output = getOutput(value);
        
        //display result
        $('#results').append(output);
      });

      var pagingBtns = getButtons(prevPageToken, nextPageToken);

      //displaying the buttons
      $('#buttons').append(pagingBtns);
    }
  )
    
  function getOutput(item){
      var videoId = item.id.videoId;
      var title = item.snippet.title;
      var description = item.snippet.description;
      var thumb = item.snippet.thumbnails.high.url;
      var channelTitle = item.snippet.channelTitle;
      var videoDate = item.snippet.publishedAt;
      
      var output = `<div class="col-sm-12 col-md-6">
                      <img src="${thumb}">
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="mv-info">
                        <h3><a data-fancybox href='http://www.youtube.com/embed/${videoId}'>${title}</a></h3> 
                        <small>By <span class='cTitle'>${channelTitle }</span> on ${videoDate}</small>
                        <p>${description}</p>
                        <div class='clearfix'></div>
                      </div>
                    </div>
                    `
      
      return output;
    }
    $('#query').val('');
  }
  
//next page function
function nextPage(){

  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
    
  //clear results
  $('#results').html('');
  $('#buttons').html('');

  //run GET request on api
  $.get(
  "https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
    part : 'snippet, id',
    q : q,
    pageToken : token,
    type : 'video',
    key : 'AIzaSyCRwSk1SS6LsbYiOh3b9HVZQhHfWI2QgGM'
  },
    function(data){
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;
      
      $.each(data.items, function(index, value){

        //Get output
        var output = getOutput(value);
      
        //display result
        $('#results').append(output);
      })

      var pagingBtns = getButtons(prevPageToken, nextPageToken);

      //displaying the buttons
      $('#buttons').append(pagingBtns);
    }
  )
  
  function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    var output = "<li>" +
    "<div class='list-left'>" +
    "<img src='" + thumb + "'>" +
    "</div>" +
    "<div class='list-right'>" + 
    "<h3><a data-fancybox href='http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" + 
    "<small>By <span class='cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" +
    "<p>" + description + "</p>" +
    "</div></li>" + "<div class='clearfix'></div>"
    
    return output;
  }
}

//prev page function
function prevPage(){

  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');

  //clear results
  $('#results').html('');
  $('#buttons').html('');

  //run GET request on api
  $.get(
  "https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
    part : 'snippet, id',
    q : q,
    pageToken : token,
    type : 'video',
    key : 'AIzaSyCRwSk1SS6LsbYiOh3b9HVZQhHfWI2QgGM'
  },
    function(data){
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;
      
      console.log(data);
      
      $.each(data.items, function(index, value){
      //Get output
      var output = getOutput(value);
      // isMusicCategory(output);
      //display result
      $('#results').append(output);
      })

      var pagingBtns = getButtons(prevPageToken, nextPageToken);

      //displaying the buttons
      $('#buttons').append(pagingBtns);
    }
  )
    
  function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;
    
    var output = `<div class="col-sm-12 col-md-6">
                      <img src="${thumb}">
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="mv-info">
                        <h3><a data-fancybox href='http://www.youtube.com/embed/${videoId}'>${title}</a></h3> 
                        <small>By <span class='cTitle'>${channelTitle }</span> on ${videoDate}</small>
                        <p>${description}</p>
                        <div class='clearfix'></div>
                      </div>
                    </div>
                    `

    return output;
  }
  $('#query').val('');
}

  
//Building the buttons
function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = "<div class='button-container'>" + 
      "<button id='next-button' class='paging-button' data-token='" + nextPageToken + "' data-query='" + q + "'" +
      "onclick='nextPage();'>Next</button></div>";
  }else{
    var btnoutput = "<div class='button-container'>" + 
      "<button id='prev-button' class='paging-button' data-token='" + prevPageToken + "' data-query='" + q + "'" +
      "onclick='prevPage()'>Prev</button>" +
      
      "<button id='next-button' class='paging-button' data-token='" + nextPageToken + "' data-query='" + q + "'" +
      "onclick='nextPage()'>Next</button>"+ 
      
      "</div>";
  }
  return btnoutput;
}