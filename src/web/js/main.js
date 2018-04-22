// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(destination, template, data){
  // render the data into the template
  var html    = template(data);
  // put the rendered template into the DOM
  $(destination).html(html);
}

// HTML has been loaded, lets do initial setup
$(document).ready(function(){
  // display the navbar
  // this must be done before the click events are registered
  showTemplate('#navbar_content', navbar_template, {});

  // sort the songs by artist and then by song title
  song_list.songs.sort(dynamicSortMultiple("artist", "title"));

  // display the songs table
  showTemplate('#main_content', songs_template, song_list);

  $('#songs_table').searchable({
    striped: true,
    searchType: 'default',
    clearOnLoad: true
  });
});
