'use strict';
var core = {};

core.start = function(program) {
  if (program.indexing) {
    var index = require(__dirname + '/index/redis');
    index.redis(program.indexing);
  }

  if (program.search) {
    var search = require(__dirname + '/search/basic');

    search.basic(program.search, 2, function(err, res){
      console.log(res);
    });

  }
}

module.exports = core;

