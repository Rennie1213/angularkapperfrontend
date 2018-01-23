angular
	.module('project.run', ['ui.router', 'project.home'])
	.run(runApp);

function runApp() {
	console.debug('E-learning app started');
}