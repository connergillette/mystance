export class MainController {
	constructor($http, $auth) {
		'ngInject';
		this.$http = $http;
		this.$auth = $auth;

		this.handleUser();
		// Get Topic data to display on page load
		this.getTopic();
	}

	handleUser() {
		var vm = this;
		var currentUser;
		if (!vm.$auth.getToken()) {
			this.$http.get("http://localhost:4000/user/add").then(function(token) {
				console.log(token.data);
				vm.$auth.setToken(token.data);
			});
		} else {
			this.$http.post("http://localhost:4000/user/login", {
				token: vm.$auth.getToken()
			}).then(function(user) {
				// console.log("THIS SHOULD BE AN ID (handleUser()): " + user.data._id);
				vm.user = user.data;
				currentUser = user.data._id;
				return currentUser;
			});
		}
	}

	// Get featured Topic data
	getTopic() {
		var vm = this;

		this.$http.get("http://localhost:4000/topic/featured").then(function(topic) {
			if (!topic) {
				alert("Invalid topic id.");
			}
			vm.data = topic.data;
			// console.log(topic);
		});
	}

	// Add a reason to a particular Side of the displayed Topic
	addReason(side, user) {
		// console.log("addReason()");
		var vm = this;

		if (side == 'no') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
				reason: this.no,
				side: side,
				user: user._id
			}).then(function() {
				vm.getTopic();
				document.getElementById("no-input").value = "";
			});
		} else if (side == 'yes') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
				reason: this.yes,
				side: side,
				user: user._id
			}).then(function() {
				vm.getTopic();
				document.getElementById("yes-input").value = "";
			});
		} else if (side == 'maybe') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
				reason: this.maybe,
				side: side,
				user: user._id
			}).then(function() {
				vm.getTopic();
				document.getElementById("maybe-input").value = "";
			});
		} else {
			alert("Sorry - we received an invalid request. Please try again.");
		}
	}

	addVote(reason, user) {
		var vm = this;
		if (reason.side == 'no') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + reason.side + "/reason/add/", {
				reason: reason.text,
				side: reason.side,
				user: user._id
			}).then(function() {
				vm.getTopic();
			});
		} else if (reason.side == 'yes') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + reason.side + "/reason/add/", {
				reason: reason.text,
				side: reason.side,
				user: user._id
			}).then(function() {
				vm.getTopic();
			});
		} else if (reason.side == 'maybe') {
			this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + reason.side + "/reason/add/", {
				reason: reason.text,
				side: reason.side,
				user: user._id
			}).then(function() {
				vm.getTopic();
			});
		} else {
			alert("Sorry - we received an invalid request. Please try again.");
		}
	}
}
