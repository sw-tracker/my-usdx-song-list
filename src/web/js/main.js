var any = "Any", yes = "Yes", no = "No";
var video_search = any, mp3_search = any, new_search = any;
var disp_song_list;

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

function handleFilterClick(type, link_obj) {
  var gen_search = $(link_obj).attr("data-id");
  $('#selected_option_text_' + type).html(gen_search);

  switch (type) {
    case 'video':
      video_search = gen_search;
      break;
    case 'mp3':
      mp3_search = gen_search;
      break;
    case 'new':
      new_search = gen_search;
      break;
    default:
      console.log('Error: invalid search type: ' + type);
  }

  disp_song_list = cloneSongList();
  showTemplate('#main_content', songs_template, disp_song_list);
  registerSearchable(true);
}

function registerFilterClicks() {
  $('.js-video').click(function () {
    handleFilterClick('video', this);
  });
  $('.js-mp3').click(function () {
    handleFilterClick('mp3', this);
  });
  $('.js-new').click(function () {
    handleFilterClick('new', this);
  });
}

function registerSearchable(doChange) {
  if (doChange) {
    var search_input = $('#searchInputBox').val();
  }

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

  if (doChange) {
    $('#searchInputBox').val(search_input);
    $("#searchInputBox").trigger('change');
  }
}

function cloneSongList() {
  var temp_song_list = {songs : []};
  var doAdd = false;
  for (var one_song in song_list.songs) {
    var this_song = song_list.songs[one_song];

    // video filter
    doVideoAdd = false;
    switch (video_search) {
      case yes:
        if (this_song.hasVideo) {
          doVideoAdd = true;
        }
        break;
      case no:
        if (!this_song.hasVideo) {
          doVideoAdd = true;
        }
        break;
      case any:
      default:
        doVideoAdd = true;
    }

    // mp3 filter
    doMp3Add = false;
    switch (mp3_search) {
      case yes:
        if (this_song.hasMp3) {
          doMp3Add = true;
        }
        break;
      case no:
        if (!this_song.hasMp3) {
          doMp3Add = true;
        }
        break;
      case any:
      default:
        doMp3Add = true;
    }

    // new filter
    doNewAdd = false;
    switch (new_search) {
      case yes:
        if (this_song.isNew) {
          doNewAdd = true;
        }
        break;
      case no:
        if (!this_song.isNew) {
          doNewAdd = true;
        }
        break;
      case any:
      default:
        doNewAdd = true;
    }

    if (doVideoAdd && doMp3Add && doNewAdd) {
      temp_song_list.songs.push(this_song.clone());
    }
  }
  return temp_song_list;
}

// HTML has been loaded, lets do initial setup
$(document).ready(function(){
  // display the navbar
  // this must be done before the click events are registered
  showTemplate('#navbar_content', navbar_template, {});
  showTemplate('#search_content', search_template, {});

  // sort the songs by artist and then by song title
  song_list.songs.sort(dynamicSortMultiple("artist", "title"));

  // this is the song list we use for displaying
  disp_song_list = cloneSongList();

  // display the songs table
  showTemplate('#main_content', songs_template, disp_song_list);

  // the searchable plugin doesnt notice when we set the value via software
  // here we force it to update the search after we clear the search input
  $('#searchClearButton').click(function () {
    if ($('#searchClearIcon').hasClass('fa-times')) {
      $('#searchInputBox').val('');
      handleSearchClearButton(false);
      $("#searchInputBox").trigger('change');
    }
  });

  // handle search drop-down boxes
  registerFilterClicks();
  registerSearchable(false);
});
