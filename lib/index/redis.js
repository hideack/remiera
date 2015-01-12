'use strict';
var ngram = require('../util/ngram'),
    redis = require("redis"),
    client = redis.createClient(),
    fs = require('fs'),
    byline = require('byline');

var index = {};

var indexing = function(no, str) {
  ngram(str, 2).forEach(function(gram, index, array) {
    client.sadd(gram, no);
    client.append(gram + "-" + no, index + ",");
  });
}

index.redis = function(path) {
  client.flushdb(function(err, didSucceed) {
    var stream = byline(fs.createReadStream(path, { encoding: 'utf8' }));

    var i=0;
    stream.on('data', function(line) {
      indexing(i, line);
      i++;
    });

    stream.on('finish', function(){
      client.end();
    });
  });
}

module.exports = index;

