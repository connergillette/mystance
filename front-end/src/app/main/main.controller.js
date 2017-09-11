export class MainController {
	constructor($http, $auth) {
		'ngInject';
		this.$http = $http;
		this.$auth = $auth;
		this.user = this.handleUser();

		this.handleUser();
		// Get Topic data to display on page load
		// this.getTopic();
	}

	handleUser() {
		var vm = this;
		if (!vm.$auth.getToken()) {
			this.$http.get("https://quiet-sierra-72284.herokuapp.com/user/add").then(function(token) {
				console.log(token.data);
				vm.$auth.setToken(token.data);
			});
		} else {
			this.$http.post("https://quiet-sierra-72284.herokuapp.com/user/login", {
				token: vm.$auth.getToken()
			}).then(function(user) {
				// console.log("THIS SHOULD BE AN ID (handleUser()): " + user.data._id);
				if (user.data == "") {
					vm.$auth.removeToken();
					vm.handleUser();
				}
				vm.user = user.data;
			});
		}
	}

	// Get featured Topic data
	getTopic() {
		var vm = this;

		this.$http.get("https://quiet-sierra-72284.herokuapp.com/topic/featured").then(function(topic) {
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
			this.$http.post("https://quiet-sierra-72284.herokuapp.com/topic/" + vm.data._id + "/" + side + "/reason/add/", {
				reason: this.no,
				side: side,
				user: user._id
			}).then(function() {
				vm.getTopic();
				document.getElementById("no-input").value = "";
			});
		} else if (side == 'yes') {
			this.$http.post("https://quiet-sierra-72284.herokuapp.com//topic/" + vm.data._id + "/" + side + "/reason/add/", {
				reason: this.yes,
				side: side,
				user: user._id
			}).then(function() {
				vm.getTopic();
				document.getElementById("yes-input").value = "";
			});
		} else if (side == 'maybe') {
			this.$http.post("https://quiet-sierra-72284.herokuapp.com//topic/" + vm.data._id + "/" + side + "/reason/add/", {
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
		this.getTopic();
	}

	addVote(reason, user) {
		var vm = this;
		var user = this.handleUser();

		this.$http.post("https://quiet-sierra-72284.herokuapp.com//topic/" + vm.data._id + "/" + reason.side + "/reason/add/", {
			reason: reason.text,
			side: reason.side,
			user: vm.user._id
		}).then(function() {
			vm.getTopic();
		});

		// TODO: Handle error
	}
}
