export class TopicController {
	constructor($http, $stateParams) {
		'ngInject';
		this.$http = $http;
		this.params = $stateParams;

		// Gets Topic data on page load based on URL
		// this.getTopic($stateParams);
	}

	// Adds a topic with a given question
	addTopic() {
		this.$http.post("www.mystance.co" + "/topic/add", {
			topic: this.topic
		});
	}

	// ANTIQUATED - Now runs from main.controller.js
	// Gets specific Topic data
	getTopic(params) {
		var vm = this;

		this.$http.get("www.mystance.co" + "/topic/" + params.id).then(function(topic) {
			if (!topic) {
				alert("Invalid topic id.");
			}
			vm.data = topic.data;
		});
	}

	// ANTIQUATED - Now runs from main.controller.js
	// Adds new Reason into a particular Topic's Side
	addReason() {
		this.$http.post("www.mystance.co" + "/topic/" + this.params.id + "/" + this.params.side + "/reason/add/", {
			reason: this.reason,
			side: this.params.side
		});
	}
}
