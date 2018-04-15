// this file contains template helpers
// whatever a function returns will be added to the template as HTML
// all functions should always return text
// subexpressions example:
// {{math (math team5.wins "*" 5) "+" (math team5.ties "*" 2.5)}}

// this function sorts the participants as required by the parameter
// usage: {{sortParticipants participants_scores "name"}}
Handlebars.registerHelper('sortParticipants', function(participants, sortField) {
  participants.sort(dynamicSortMultiple(sortField));
  return "";
});

// this function adds basic maths functionality to templates
// usage: {{math 10 "+" 1}}
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

// this function adds basic maths functionality to templates
// usage: {{math 10 "+" 1}}
Handlebars.registerHelper("add", function(value1, value2, value3, options) {
  value1 = parseFloat(value1);
  value2 = parseFloat(value2);
  value3 = parseFloat(value3);

  return value1 + value2 + value3;
});

/*
This helper provides comparison functionality in templates.
usage:
{{#compare group.name "==" ../name}}
html
{{/compare}}
 */
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

// performs a piece of HTML n times
/*Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});
*/
