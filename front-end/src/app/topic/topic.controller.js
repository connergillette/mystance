export class TopicController {
	constructor($http, $stateParams) {
		'ngInject';
		this.$http = $http;
		this.params = $stateParams;

		this.getTopic($stateParams);
	}

	addTopic() {
		this.$http.post("http://localhost:4000/topic/add", {
			topic: this.topic
		});
	}

	getTopic(params) {
		var vm = this;

		this.$http.get("http://localhost:4000/topic/" + params.id).then(function(topic) {
			if (!topic) {
				alert("Invalid topic id.");
			}
			vm.data = topic.data;
		});
	}

	addReason() {
		this.$http.post("http://localhost:4000/topic/" + this.params.id + "/" + this.params.side + "/reason/add/", {
			reason: this.reason,
			side: this.params.side
		});
	}
}
