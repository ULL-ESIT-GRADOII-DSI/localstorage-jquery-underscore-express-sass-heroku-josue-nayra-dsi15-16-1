"use strict";

var regexp = /"((?:[^"\\]|\\.)*)"|([^,\s]+)|,\s*(?=,|$)|^\s*,/g
module.exports.calculate = function(original) {
    if(original != null)
    {
      console.log("Generando tabla");
      var lines = original.split(/\n+\s*/);
      var commonLength = lines[0].match(regexp).length;
      var r = [];
      var removeQuotes = function(field) {
        var removecomma = field.replace(/,\s*$/, '');
        var remove1stquote = removecomma.replace(/^\s*"/, '');
        var removelastquote = remove1stquote.replace(/"\s*$/, '');
        var removeescapedquotes = removelastquote.replace(/\\"/, '"');
        //console.log("Return funcion calculate:"+removeescapedquotes);
        return removeescapedquotes;
      };
  
      for (var t in lines) {
        var temp = lines[t];
        var m = temp.match(regexp);
        var result = [];
        var error = false;
  
        // skip empty lines and comments
        if (temp.match(/(^\s*$)|(^#.*)/)) continue; 
        if (m) {
          result = m.map(removeQuotes);
          error = (commonLength != m.length);
          var rowclass = error? 'error' : '';
          r.push({ value: result, rowClass: rowclass });
        }
        else {
          var errmsg = 'La fila "' + temp + '" no es un valor de CSV permitido.';
          r.push({value: errmsg.split("").splice(commonLength), rowClass: 'error'});
        }
      }
      return r;
    }
    else
    {
      console.error("No se le ha pasado ningún parámetro a la función calculate...");
    }
};

