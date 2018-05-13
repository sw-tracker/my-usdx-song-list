// this file belongs to me, nit didnt come with handlebars

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled
// templates many times
var navbar_template, search_template, songs_template;

function loadTemplates() {
  // load templates
  navbar_template = this['usdxSongList'].templates['navbar-template'];
  search_template = this['usdxSongList'].templates['search-template'];
  songs_template = this['usdxSongList'].templates['songs-template'];
}

// to be able to use special date formatting templates
HandlebarsIntl.registerWith(Handlebars);
loadTemplates();
