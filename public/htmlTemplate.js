(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['html'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!DOCTYPE html>\n<html>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"head"),depth0,{"name":"head","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	 \n    <header>\n        <h1 class = \"site-title\"><a href = \"#\">Floppy Fish</a></h1>\n    </header>\n  \n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"body","hash":{},"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":9,"column":14}}}) : helper))) != null ? stack1 : "")
    + "\n    \n\n</html>      \n";
},"usePartial":true,"useData":true});
})();