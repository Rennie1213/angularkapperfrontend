angular
	.module('project.run', ['ui.router', 'project.header', 'project.home', 'project.form'])
	.run(runApp);

function runApp() {
	console.debug('init dependencies');
}