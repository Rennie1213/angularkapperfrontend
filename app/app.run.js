angular
	.module('angularkapperfrontend.run', ['ui.router', 'angularkapperfrontend.home', 'angularkapperfrontend.form'])
	.run(runApp);

function runApp() {
	console.debug('init dependencies');
}