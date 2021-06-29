(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['player'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class = \"menuitem first\"> <a href = \"#\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Name") || (depth0 != null ? lookupProperty(depth0,"Name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data,"loc":{"start":{"line":1,"column":44},"end":{"line":1,"column":52}}}) : helper)))
    + "</a> <p class = \"playerscore\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"Score") || (depth0 != null ? lookupProperty(depth0,"Score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Score","hash":{},"data":data,"loc":{"start":{"line":1,"column":82},"end":{"line":1,"column":91}}}) : helper)))
    + "</p> </li>\n";
},"useData":true});
})();