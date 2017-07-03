export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'main'
		})

		.state('topic-add', {
			url: '/topic/add',
			templateUrl: 'app/topic/topic-add.html',
			controller: 'TopicController',
			controllerAs: 'topic'
		})

		.state('topic', {
			url: '/topic/:id',
			templateUrl: 'app/topic/topic.html',
			controller: 'TopicController',
			controllerAs: 'topic'
		});

	$urlRouterProvider.otherwise('/');
}
