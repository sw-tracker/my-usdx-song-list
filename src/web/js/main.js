// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(destination, template, data){
  // render the data into the template
  var html    = template(data);
  // put the rendered template into the DOM
  $(destination).html(html);
}

function handleSearchClearButton(active) {
  if (active) {
    $('#searchClearIcon').removeClass('fa-search');
    $('#searchClearIcon').addClass('fa-times');

  } else {
    $('#searchClearIcon').removeClass('fa-times');
    $('#searchClearIcon').addClass('fa-search');
  }
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

  // use the searchable plugin
  $('#songs_table').searchable({
    striped: true,
    searchType: 'default',
    clearOnLoad: true,
    searchField: '#searchInputBox',
    onSearchActive: function( elem, term ) {
      handleSearchClearButton(true);
    },
    onSearchEmpty: function( elem, term ) {
      handleSearchClearButton(false);
    }
  });

  // the searchable plugin doesnt notice when we set the value via software
  // here we force it to update the search after we clear the search input
  $('#searchClearButton').click(function () {
    if ($('#searchClearIcon').hasClass('fa-times')) {
      $('#searchInputBox').val('');
      handleSearchClearButton(false);
      $("#searchInputBox").trigger('change');
    }
  });
});
