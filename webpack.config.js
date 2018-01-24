var webpack = require('webpack');
var path 	= require('path');
var glob    = require('glob');

module.exports = {

	entry: {
		// toObject(glob.sync('./app/**/*.js*')),
		js: glob.sync("./app/**/*.js")  
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	}

}

function toObject(paths) {
  var ret = {};

  paths.forEach(function(path) {
    // you can define entry names mapped to [name] here
    ret[path.split('/').slice(-1)[0]] = path;
  });

  return ret;
}
