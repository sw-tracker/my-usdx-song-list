// this file contains generic helper functions

/* sort an array of objects by the property passed in
  example ascending: People.sort(dynamicSort("Name"));
  example descending: People.sort(dynamicSort("-Name"));
*/
function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

/* sort an array of objects by the properties passed in, like "order by x, y, x desc"
  example: People.sort(dynamicSortMultiple("Name", "-Surname"));
*/
function dynamicSortMultiple() {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0, result = 0, numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while(result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  }
}

/* While URLSearchParams would be ideal, not all browsers support that API.
There's a polyfill available but if you want a tiny function for basic query string parsing,
the following is a function stolen from the A-Frame VR toolkit which parses the query string
to get the key's value you'd like:
*/
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/*
This is really hacky for now
 */
function addUrlParameter(part_id) {
  var params = "";

  if (part_id) {
    params = '?part_id=' + part_id;
  }
  window.location.search = params;
}
