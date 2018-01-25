var webpack = require('webpack');
var path 	= require('path');
var glob    = require('glob');

module.exports = {

	entry: {
		js: glob.sync("./app/**/*.js")  
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	}

}

