'use strict';
var ngram = require('../util/ngram'),
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
        var firstPos = parseInt(res[0]);
        var checkVal = res.reduce(function(a,b) { return parseInt(a) + parseInt(b)});
        var checkSum = res.length * (firstPos + (firstPos + res.length - 1)) / 2;

        if (checkVal == checkSum) {
          results.push({no:docNo, pos:res[0]});
        }

        if (docNo == documentNumbers[documentNumbers.length - 1]) {
          client.end();
          callback(null, results);
        }
      });
    });
  });
}

module.exports = search;

