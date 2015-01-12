'use strict';
var ngram = require('../util/ngram'),
    _ = require('underscore'),
    redis = require("redis"),
    client = redis.createClient();

var search = {};

search.basic = function(query, n, callback) {
  var grams = ngram(query, n),
      results = [];

  client.sinter(grams, function(err, documentNumbers){
    if (documentNumbers.length == 0) {
      client.end();
      callback(null, results);
    }

    documentNumbers.forEach(function(docNo) {
      var positions = grams.map(function(gram){
        return gram + "-" + docNo
      });

      client.mget(positions, function(err, res){
        var charPositions = res.map(function(pos){
          return pos.split(",").filter(function(e){return e !== ""}).map(function(e){return parseInt(e)});
        });

        for(var i=1; i<charPositions.length; i++) {
          charPositions[i] = charPositions[i].map(function(v) {return v-i});
        }

        charPositions.reduce(function(a,b) {return _.intersection(a,b)}).forEach(function(position) {
          results.push({no:docNo, pos:position});
        });

        if (docNo == documentNumbers[documentNumbers.length - 1]) {
          client.end();
          callback(null, results);
        }
      });
    });
  });
}

module.exports = search;

