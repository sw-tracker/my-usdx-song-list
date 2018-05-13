// this file belongs to me, nit didnt come with handlebars

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled
// templates many times
var navbar_template, search_template, songs_template;

// this function caches the compiled templates so it isnt an issue to call it multiple times
Handlebars.getTemplate = function(name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url : 'templates/' + name + '.hbs',
      success : function(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async : false
    });
  }
  return Handlebars.templates[name];
};

// this function allows me to register a template as a partial template
// so that I can call it from other templates
Handlebars.registerTemplateAsPartial = function(name, template_name) {
  $.ajax({
    url : 'templates/' + template_name + '.hbs',
    success : function(data) {
      Handlebars.registerPartial(name, data);
    },
    async : false
  });
};

function loadTemplates() {
  // load templates
  // I should improve this, loop through all files in the templates folder and load them
  navbar_template = Handlebars.getTemplate('navbar-template');
  search_template = Handlebars.getTemplate('search-template');
  songs_template = Handlebars.getTemplate('songs-template');

  // register templates that I will use from other templates
  Handlebars.registerTemplateAsPartial('dropdown-partial', 'dropdown-template');
}

// to be able to use special date formatting templates
HandlebarsIntl.registerWith(Handlebars);
loadTemplates();
