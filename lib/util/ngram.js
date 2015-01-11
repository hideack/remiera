'use strict';

var ngram = function(words, n) {
  var i;
  var grams = [];

  for(i=0; i<=words.length-n; i++) {
    grams.push(words.substr(i, n).toLowerCase());
  }

  return grams;
}

module.exports = ngram;
