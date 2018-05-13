this["usdxSongList"] = this["usdxSongList"] || {};
this["usdxSongList"]["templates"] = this["usdxSongList"]["templates"] || {};
this["usdxSongList"]["templates"]["navbar-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- navbar expands on large screens and it stays always on top, even when scrolling on long pages -->\r\n<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark text-white\">\r\n  <div class=\"container-fluid\">\r\n    <a class=\"navbar-brand\" href=\"#\">My UltraStar Song List</a>\r\n  </div>\r\n</nav>";
},"useData":true});
this["usdxSongList"]["templates"]["search-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- The ID of the search input can be used with the searchable js\r\n-->\r\n<div class=\"container\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n\r\n      <div class=\"row\">\r\n        <!-- search input -->\r\n        <div class=\"col-10 col-md-11 col-lg-8 pr-0\">\r\n          <div class=\"input-group h-100\">\r\n            <input id=\"searchInputBox\" value=\"\" class=\"form-control\" type=\"search\" placeholder=\"Search...\" aria-label=\"Search...\">\r\n          </div>\r\n        </div>\r\n        <div class=\"col-2 col-md-1 col-lg-1 pl-0\">\r\n          <div class=\"input-group-append w-100 h-100\">\r\n            <a role=\"button\" class=\"btn-lg btn-block p-0\" id=\"searchClearButton\">\r\n              <span class=\"input-group-text h-100 d-flex justify-content-center align-self-center\"><i id=\"searchClearIcon\" class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <!-- button to expand advanced search -->\r\n        <div class=\"col-12 col-md-12 col-lg-3 pb-0 mb-0 mt-2\">\r\n          <p class=\"card-title m-0\"><a data-toggle=\"collapse\" href=\"#advanced_search\">Advanced Search</a></p>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <!-- card content: advanced search options -->\r\n    <div id=\"advanced_search\" class=\"card-body collapse\">\r\n      <div class=\"row\">\r\n"
    + ((stack1 = container.invokePartial(partials["dropdown-template"],depth0,{"name":"dropdown-template","hash":{"dropdown_id":"video","option_text":"Video"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["dropdown-template"],depth0,{"name":"dropdown-template","hash":{"dropdown_id":"mp3","option_text":"MP3"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["dropdown-template"],depth0,{"name":"dropdown-template","hash":{"dropdown_id":"new","option_text":"New"},"data":data,"indent":"        ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
this["usdxSongList"]["templates"]["songs-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "          <tr>\r\n            <td>"
    + alias3(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>\r\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.hasVideo : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\r\n            <td>\r\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.hasMp3 : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\r\n            <td>\r\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.isNew : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\r\n          </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "              <span class=\"fa fa-video\"></span>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "              <span class=\"fa fa-music\"></span>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "              <span class=\"fa fa-star\"></span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<!-- this template displays a list of matches.\r\nusage: > songs-template\r\n-->\r\n<div class=\"container\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end\">\r\n      <p><span id=\"shown_songs\">"
    + alias3(((helper = (helper = helpers.shown_songs || (depth0 != null ? depth0.shown_songs : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"shown_songs","hash":{},"data":data}) : helper)))
    + "</span> of "
    + alias3(((helper = (helper = helpers.total_songs || (depth0 != null ? depth0.total_songs : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"total_songs","hash":{},"data":data}) : helper)))
    + " songs</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-12 col-sm-12 col-md-12 col-lg-12\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table table-hover\" id=\"songs_table\">\r\n          <col class=\"col-large\">\r\n          <col class=\"col-large\">\r\n          <col class=\"col-small\">\r\n          <col class=\"col-small\">\r\n          <col class=\"col-small\">\r\n          <thead class=\"thead-light\">\r\n          <tr>\r\n            <th scope=\"col\">Artist</th>\r\n            <th scope=\"col\">Song</th>\r\n            <th scope=\"col\"></th>\r\n            <th scope=\"col\"></th>\r\n            <th scope=\"col\"></th>\r\n          </tr>\r\n          </thead>\r\n          <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.songs : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div> <!-- / div row -->\r\n</div>\r\n";
},"useData":true});
this["usdxSongList"]["templates"]["_dropdown-template"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "<!-- usage: dropdown option_text=\"text\" dropdown_id=\"id\" -->\r\n<div class=\"col-12 col-md-4 col-lg-4 my-1\">\r\n  <div class=\"btn-group w-100 d-flex justify-content-center\">\r\n    <div class=\"row w-100 d-flex justify-content-center\">\r\n\r\n      <div class=\"col-6 col-md-4 col-lg-4 my-1 pl-0 pr-0\">\r\n        <button class=\"btn btn-outline-light btn-block text-dark\" type=\"button\">"
    + alias3(((helper = (helper = helpers.option_text || (depth0 != null ? depth0.option_text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"option_text","hash":{},"data":data}) : helper)))
    + "</button>\r\n      </div>\r\n\r\n      <div class=\"col-6 col-md-4 col-lg-4 my-1 pl-0 pr-0\">\r\n        <div class=\"dropdown w-100\">\r\n          <button type=\"button\" class=\"btn btn-block dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n            <span id=\"selected_option_text_"
    + alias3(((helper = (helper = helpers.dropdown_id || (depth0 != null ? depth0.dropdown_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dropdown_id","hash":{},"data":data}) : helper)))
    + "\">Any</span>\r\n          </button>\r\n          <div class=\"dropdown-menu\">\r\n            <a class=\"dropdown-item js-"
    + alias3(((helper = (helper = helpers.dropdown_id || (depth0 != null ? depth0.dropdown_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dropdown_id","hash":{},"data":data}) : helper)))
    + "\" href=\"#\" data-id=\"Yes\">Yes</a>\r\n            <a class=\"dropdown-item js-"
    + alias3(((helper = (helper = helpers.dropdown_id || (depth0 != null ? depth0.dropdown_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dropdown_id","hash":{},"data":data}) : helper)))
    + "\" href=\"#\" data-id=\"No\">No</a>\r\n            <a class=\"dropdown-item js-"
    + alias3(((helper = (helper = helpers.dropdown_id || (depth0 != null ? depth0.dropdown_id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dropdown_id","hash":{},"data":data}) : helper)))
    + "\" href=\"#\" data-id=\"Any\">Any</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n";
},"useData":true});