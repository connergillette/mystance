export class MainController {
	constructor($http) {
		'ngInject';
		this.$http = $http;

		this.getTopic();
	}

	getTopic(params) {
		var vm = this;

		this.$http.get("http://localhost:4000/topic/featured").then(function(topic) {
			if (!topic) {
				alert("Invalid topic id.");
			}
			vm.data = topic.data;
			console.log(topic);
		});
	}
}
