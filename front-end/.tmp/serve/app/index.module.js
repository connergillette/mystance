/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(1);
	
	var _index2 = __webpack_require__(2);
	
	var _index3 = __webpack_require__(3);
	
	var _main = __webpack_require__(4);
	
	var _topic = __webpack_require__(5);
	
	var _githubContributor = __webpack_require__(6);
	
	var _webDevTec = __webpack_require__(7);
	
	var _navbar = __webpack_require__(8);
	
	var _malarkey = __webpack_require__(9);
	
	angular.module('mystanceFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'satellizer']).constant('API_URL', 'http://localhost:4000/').constant('malarkey', malarkey).constant('moment', moment).config(_index.config).config(_index2.routerConfig).run(_index3.runBlock).service('githubContributor', _githubContributor.GithubContributorService).service('webDevTec', _webDevTec.WebDevTecService).controller('MainController', _main.MainController).controller('TopicController', _topic.TopicController).directive('acmeNavbar', _navbar.NavbarDirective).directive('acmeMalarkey', _malarkey.MalarkeyDirective); /* global malarkey:false, moment:false */

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	config.$inject = ["$logProvider", "toastrConfig", "$authProvider"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.config = config;
	function config($logProvider, toastrConfig, $authProvider) {
		'ngInject';
		// Enable log
	
		$logProvider.debugEnabled(true);
	
		// Set options third-party lib
		toastrConfig.allowHtml = true;
		toastrConfig.timeOut = 3000;
		toastrConfig.positionClass = 'toast-top-right';
		toastrConfig.preventDuplicates = true;
		toastrConfig.progressBar = true;
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.routerConfig = routerConfig;
	function routerConfig($stateProvider, $urlRouterProvider) {
		'ngInject';
	
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'main'
		}).state('topic-add', {
			url: '/topic/add',
			templateUrl: 'app/topic/topic-add.html',
			controller: 'TopicController',
			controllerAs: 'topic'
		}).state('reason-add', {
			url: '/topic/:id/:side/reason/add',
			templateUrl: 'app/topic/reason-add.html',
			controller: 'TopicController',
			controllerAs: 'topic'
		}).state('topic', {
			url: '/topic/:id',
			templateUrl: 'app/topic/topic.html',
			controller: 'TopicController',
			controllerAs: 'topic'
		});
	
		$urlRouterProvider.otherwise('/');
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	runBlock.$inject = ["$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.runBlock = runBlock;
	function runBlock($log) {
	  'ngInject';
	
	  $log.debug('runBlock end');
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainController = exports.MainController = function () {
		MainController.$inject = ["$http", "$auth"];
		function MainController($http, $auth) {
			'ngInject';
	
			_classCallCheck(this, MainController);
	
			this.$http = $http;
			this.$auth = $auth;
			this.user = this.handleUser();
	
			this.handleUser();
			// Get Topic data to display on page load
			this.getTopic();
		}
	
		_createClass(MainController, [{
			key: "handleUser",
			value: function handleUser() {
				var vm = this;
				if (!vm.$auth.getToken()) {
					this.$http.get("http://localhost:4000/user/add").then(function (token) {
						console.log(token.data);
						vm.$auth.setToken(token.data);
					});
				} else {
					this.$http.post("http://localhost:4000/user/login", {
						token: vm.$auth.getToken()
					}).then(function (user) {
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
	
		}, {
			key: "getTopic",
			value: function getTopic() {
				var vm = this;
	
				this.$http.get("http://localhost:4000/topic/featured").then(function (topic) {
					if (!topic) {
						alert("Invalid topic id.");
					}
					vm.data = topic.data;
					// console.log(topic);
				});
			}
	
			// Add a reason to a particular Side of the displayed Topic
	
		}, {
			key: "addReason",
			value: function addReason(side, user) {
				// console.log("addReason()");
				var vm = this;
	
				if (side == 'no') {
					this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
						reason: this.no,
						side: side,
						user: user._id
					}).then(function () {
						vm.getTopic();
						document.getElementById("no-input").value = "";
					});
				} else if (side == 'yes') {
					this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
						reason: this.yes,
						side: side,
						user: user._id
					}).then(function () {
						vm.getTopic();
						document.getElementById("yes-input").value = "";
					});
				} else if (side == 'maybe') {
					this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + side + "/reason/add/", {
						reason: this.maybe,
						side: side,
						user: user._id
					}).then(function () {
						vm.getTopic();
						document.getElementById("maybe-input").value = "";
					});
				} else {
					alert("Sorry - we received an invalid request. Please try again.");
				}
				this.getTopic();
			}
		}, {
			key: "addVote",
			value: function addVote(reason, user) {
				var vm = this;
				var user = this.handleUser();
	
				this.$http.post("http://localhost:4000/topic/" + vm.data._id + "/" + reason.side + "/reason/add/", {
					reason: reason.text,
					side: reason.side,
					user: vm.user._id
				}).then(function () {
					vm.getTopic();
				});
	
				// TODO: Handle error
			}
		}]);
	
		return MainController;
	}();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TopicController = exports.TopicController = function () {
		TopicController.$inject = ["$http", "$stateParams"];
		function TopicController($http, $stateParams) {
			'ngInject';
	
			_classCallCheck(this, TopicController);
	
			this.$http = $http;
			this.params = $stateParams;
	
			// Gets Topic data on page load based on URL
			this.getTopic($stateParams);
		}
	
		// Adds a topic with a given question
	
	
		_createClass(TopicController, [{
			key: "addTopic",
			value: function addTopic() {
				this.$http.post("http://localhost:4000/topic/add", {
					topic: this.topic
				});
			}
	
			// ANTIQUATED - Now runs from main.controller.js
			// Gets specific Topic data
	
		}, {
			key: "getTopic",
			value: function getTopic(params) {
				var vm = this;
	
				this.$http.get("http://localhost:4000/topic/" + params.id).then(function (topic) {
					if (!topic) {
						alert("Invalid topic id.");
					}
					vm.data = topic.data;
				});
			}
	
			// ANTIQUATED - Now runs from main.controller.js
			// Adds new Reason into a particular Topic's Side
	
		}, {
			key: "addReason",
			value: function addReason() {
				this.$http.post("http://localhost:4000/topic/" + this.params.id + "/" + this.params.side + "/reason/add/", {
					reason: this.reason,
					side: this.params.side
				});
			}
		}]);
	
		return TopicController;
	}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GithubContributorService = exports.GithubContributorService = function () {
	  GithubContributorService.$inject = ["$log", "$http"];
	  function GithubContributorService($log, $http) {
	    'ngInject';
	
	    _classCallCheck(this, GithubContributorService);
	
	    this.$log = $log;
	    this.$http = $http;
	    this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
	  }
	
	  _createClass(GithubContributorService, [{
	    key: 'getContributors',
	    value: function getContributors() {
	      var _this = this;
	
	      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
	
	      return this.$http.get(this.apiHost + '/contributors?per_page=' + limit).then(function (response) {
	        return response.data;
	      }).catch(function (error) {
	        _this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
	      });
	    }
	  }]);
	
	  return GithubContributorService;
	}();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WebDevTecService = exports.WebDevTecService = function () {
	  function WebDevTecService() {
	    'ngInject';
	
	    _classCallCheck(this, WebDevTecService);
	
	    this.data = [{
	      'title': 'AngularJS',
	      'url': 'https://angularjs.org/',
	      'description': 'HTML enhanced for web apps!',
	      'logo': 'angular.png'
	    }, {
	      'title': 'BrowserSync',
	      'url': 'http://browsersync.io/',
	      'description': 'Time-saving synchronised browser testing.',
	      'logo': 'browsersync.png'
	    }, {
	      'title': 'GulpJS',
	      'url': 'http://gulpjs.com/',
	      'description': 'The streaming build system.',
	      'logo': 'gulp.png'
	    }, {
	      'title': 'Jasmine',
	      'url': 'http://jasmine.github.io/',
	      'description': 'Behavior-Driven JavaScript.',
	      'logo': 'jasmine.png'
	    }, {
	      'title': 'Karma',
	      'url': 'http://karma-runner.github.io/',
	      'description': 'Spectacular Test Runner for JavaScript.',
	      'logo': 'karma.png'
	    }, {
	      'title': 'Protractor',
	      'url': 'https://github.com/angular/protractor',
	      'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
	      'logo': 'protractor.png'
	    }, {
	      'title': 'Bootstrap',
	      'url': 'http://getbootstrap.com/',
	      'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
	      'logo': 'bootstrap.png'
	    }, {
	      'title': 'Angular UI Bootstrap',
	      'url': 'http://angular-ui.github.io/bootstrap/',
	      'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
	      'logo': 'ui-bootstrap.png'
	    }, {
	      'title': 'Sass (Node)',
	      'url': 'https://github.com/sass/node-sass',
	      'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
	      'logo': 'node-sass.png'
	    }, {
	      'title': 'ES6 (Babel formerly 6to5)',
	      'url': 'https://babeljs.io/',
	      'description': 'Turns ES6+ code into vanilla ES5, so you can use next generation features today.',
	      'logo': 'babel.png'
	    }];
	  }
	
	  _createClass(WebDevTecService, [{
	    key: 'getTec',
	    value: function getTec() {
	      return this.data;
	    }
	  }]);
	
	  return WebDevTecService;
	}();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NavbarDirective = NavbarDirective;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function NavbarDirective() {
	  'ngInject';
	
	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/components/navbar/navbar.html',
	    scope: {
	      creationDate: '='
	    },
	    controller: NavbarController,
	    controllerAs: 'vm',
	    bindToController: true
	  };
	
	  return directive;
	}
	
	var NavbarController = function NavbarController(moment) {
	  'ngInject';
	
	  // "this.creationDate" is available by directive option "bindToController: true"
	
	  _classCallCheck(this, NavbarController);
	
	  this.relativeDate = moment(this.creationDate).fromNow();
	};
	NavbarController.$inject = ["moment"];

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	MalarkeyDirective.$inject = ["malarkey"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.MalarkeyDirective = MalarkeyDirective;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function MalarkeyDirective(malarkey) {
	  'ngInject';
	
	  var directive = {
	    restrict: 'E',
	    scope: {
	      extraValues: '='
	    },
	    template: '&nbsp;',
	    link: linkFunc,
	    controller: MalarkeyController,
	    controllerAs: 'vm'
	  };
	
	  return directive;
	
	  function linkFunc(scope, el, attr, vm) {
	    var watcher = void 0;
	    var typist = malarkey(el[0], {
	      typeSpeed: 40,
	      deleteSpeed: 40,
	      pauseDelay: 800,
	      loop: true,
	      postfix: ' '
	    });
	
	    el.addClass('acme-malarkey');
	
	    angular.forEach(scope.extraValues, function (value) {
	      typist.type(value).pause().delete();
	    });
	
	    watcher = scope.$watch('vm.contributors', function () {
	      angular.forEach(vm.contributors, function (contributor) {
	        typist.type(contributor.login).pause().delete();
	      });
	    });
	
	    scope.$on('$destroy', function () {
	      watcher();
	    });
	  }
	}
	
	var MalarkeyController = function () {
	  MalarkeyController.$inject = ["$log", "githubContributor"];
	  function MalarkeyController($log, githubContributor) {
	    'ngInject';
	
	    _classCallCheck(this, MalarkeyController);
	
	    this.$log = $log;
	    this.contributors = [];
	
	    this.activate(githubContributor);
	  }
	
	  _createClass(MalarkeyController, [{
	    key: 'activate',
	    value: function activate(githubContributor) {
	      var _this = this;
	
	      return this.getContributors(githubContributor).then(function () {
	        _this.$log.info('Activated Contributors View');
	      });
	    }
	  }, {
	    key: 'getContributors',
	    value: function getContributors(githubContributor) {
	      var _this2 = this;
	
	      return githubContributor.getContributors(10).then(function (data) {
	        _this2.contributors = data;
	
	        return _this2.contributors;
	      });
	    }
	  }]);
	
	  return MalarkeyController;
	}();

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTQ3YTg5MTRjZTNjZDYzM2RiZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5tb2R1bGUuanM/YWE0MSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LmNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LmNvbmZpZy5qcz85ZDUxIiwid2VicGFjazovLy8uL3NyYy9hcHAvaW5kZXgucm91dGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcz9mNTEyIiwid2VicGFjazovLy8uL3NyYy9hcHAvaW5kZXgucnVuLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaW5kZXgucnVuLmpzP2Y5ZDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9tYWluL21haW4uY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzPzMxYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90b3BpYy90b3BpYy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvdG9waWMvdG9waWMuY29udHJvbGxlci5qcz80NmNmIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlLmpzPzRjOTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlLmpzP2UwNWQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS5qcz9jMjA1Iiwid2VicGFjazovLy8uL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZS5qcz82NDFlIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zdGFudCIsIm1hbGFya2V5IiwibW9tZW50IiwiY29uZmlnIiwicnVuIiwic2VydmljZSIsImNvbnRyb2xsZXIiLCJkaXJlY3RpdmUiLCIkbG9nUHJvdmlkZXIiLCJ0b2FzdHJDb25maWciLCIkYXV0aFByb3ZpZGVyIiwiZGVidWdFbmFibGVkIiwiYWxsb3dIdG1sIiwidGltZU91dCIsInBvc2l0aW9uQ2xhc3MiLCJwcmV2ZW50RHVwbGljYXRlcyIsInByb2dyZXNzQmFyIiwicm91dGVyQ29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlckFzIiwib3RoZXJ3aXNlIiwicnVuQmxvY2siLCIkbG9nIiwiZGVidWciLCIkaHR0cCIsIiRhdXRoIiwidXNlciIsImhhbmRsZVVzZXIiLCJnZXRUb3BpYyIsInZtIiwiZ2V0VG9rZW4iLCJnZXQiLCJ0aGVuIiwidG9rZW4iLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInNldFRva2VuIiwicG9zdCIsInJlbW92ZVRva2VuIiwidG9waWMiLCJhbGVydCIsInNpZGUiLCJfaWQiLCJyZWFzb24iLCJubyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInllcyIsIm1heWJlIiwidGV4dCIsIiRzdGF0ZVBhcmFtcyIsInBhcmFtcyIsImlkIiwiYXBpSG9zdCIsImxpbWl0IiwicmVzcG9uc2UiLCJjYXRjaCIsImVycm9yIiwidG9Kc29uIiwiV2ViRGV2VGVjU2VydmljZSIsIk5hdmJhckRpcmVjdGl2ZSIsInJlc3RyaWN0Iiwic2NvcGUiLCJjcmVhdGlvbkRhdGUiLCJOYXZiYXJDb250cm9sbGVyIiwiYmluZFRvQ29udHJvbGxlciIsInJlbGF0aXZlRGF0ZSIsImZyb21Ob3ciLCJNYWxhcmtleURpcmVjdGl2ZSIsImV4dHJhVmFsdWVzIiwidGVtcGxhdGUiLCJsaW5rIiwibGlua0Z1bmMiLCJNYWxhcmtleUNvbnRyb2xsZXIiLCJlbCIsImF0dHIiLCJ3YXRjaGVyIiwidHlwaXN0IiwidHlwZVNwZWVkIiwiZGVsZXRlU3BlZWQiLCJwYXVzZURlbGF5IiwibG9vcCIsInBvc3RmaXgiLCJhZGRDbGFzcyIsImZvckVhY2giLCJ0eXBlIiwicGF1c2UiLCJkZWxldGUiLCIkd2F0Y2giLCJjb250cmlidXRvcnMiLCJjb250cmlidXRvciIsImxvZ2luIiwiJG9uIiwiZ2l0aHViQ29udHJpYnV0b3IiLCJhY3RpdmF0ZSIsImdldENvbnRyaWJ1dG9ycyIsImluZm8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQ0VBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUdBOztBQUlBQSxTQUFRQyxPQUFPLGlCQUFpQixDQUFDLGFBQWEsYUFBYSxXQUFXLGNBQWMsY0FBYyxVQUFVLGNBQWMsYUFBYSxnQkFBZ0IsVUFBVSxlQUMvSkMsU0FBUyxXQUFXLDBCQUNwQkEsU0FBUyxZQUFZQyxVQUNyQkQsU0FBUyxVQUFVRSxRQUNu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QzFCaEI7Ozs7Ozs4RERpQitCO0dDVm5DLDRCQUFheEQsTUFBTXlFLG1CQUFtQjtLQUNwQzs7S0FEb0M7O0tBR3BDLEtBQUt6RSxPQUFPQTtLQUNaLEtBQUtxRSxlQUFlOztLQUVwQixLQUFLSyxTQUFTRDs7O0dEZ0JoQixhQUFhLG9CQUFvQixDQUFDO0tBQ2hDLEtBQUs7S0FDTCxPQUFPLFNBQVMsU0NmVEEsbUJBQW1CO09BQUE7O09BQzFCLE9BQU8sS0FBS0UsZ0JBQWdCRixtQkFBbUIvRCxLQUFLLFlBQU07U0FDeEQsTUFBS1YsS0FBSzRFLEtBQUs7OztNRG9CaEI7S0FDRCxLQUFLO0tBQ0wsT0FBTyxTQUFTLGdCQ2xCRkgsbUJBQW1CO09BQUE7O09BQ2pDLE9BQU9BLGtCQUFrQkUsZ0JBQWdCLElBQUlqRSxLQUFLLFVBQUNJLE1BQVM7U0FDMUQsT0FBS3VELGVBQWV2RDs7U0FFcEIsT0FBTyxPQUFLdUQ7Ozs7O0dEeUJoQixPQUFPIiwiZmlsZSI6ImluZGV4Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU0N2E4OTE0Y2UzY2Q2MzNkYmYwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi9pbmRleC5jb25maWcnKTtcblxudmFyIF9pbmRleDIgPSByZXF1aXJlKCcuL2luZGV4LnJvdXRlJyk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi9pbmRleC5ydW4nKTtcblxudmFyIF9tYWluID0gcmVxdWlyZSgnLi9tYWluL21haW4uY29udHJvbGxlcicpO1xuXG52YXIgX3RvcGljID0gcmVxdWlyZSgnLi90b3BpYy90b3BpYy5jb250cm9sbGVyJyk7XG5cbnZhciBfZ2l0aHViQ29udHJpYnV0b3IgPSByZXF1aXJlKCcuLi9hcHAvY29tcG9uZW50cy9naXRodWJDb250cmlidXRvci9naXRodWJDb250cmlidXRvci5zZXJ2aWNlJyk7XG5cbnZhciBfd2ViRGV2VGVjID0gcmVxdWlyZSgnLi4vYXBwL2NvbXBvbmVudHMvd2ViRGV2VGVjL3dlYkRldlRlYy5zZXJ2aWNlJyk7XG5cbnZhciBfbmF2YmFyID0gcmVxdWlyZSgnLi4vYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUnKTtcblxudmFyIF9tYWxhcmtleSA9IHJlcXVpcmUoJy4uL2FwcC9jb21wb25lbnRzL21hbGFya2V5L21hbGFya2V5LmRpcmVjdGl2ZScpO1xuXG5hbmd1bGFyLm1vZHVsZSgnbXlzdGFuY2VGcm9udCcsIFsnbmdBbmltYXRlJywgJ25nQ29va2llcycsICduZ1RvdWNoJywgJ25nU2FuaXRpemUnLCAnbmdNZXNzYWdlcycsICduZ0FyaWEnLCAnbmdSZXNvdXJjZScsICd1aS5yb3V0ZXInLCAndWkuYm9vdHN0cmFwJywgJ3RvYXN0cicsICdzYXRlbGxpemVyJ10pLmNvbnN0YW50KCdBUElfVVJMJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMC8nKS5jb25zdGFudCgnbWFsYXJrZXknLCBtYWxhcmtleSkuY29uc3RhbnQoJ21vbWVudCcsIG1vbWVudCkuY29uZmlnKF9pbmRleC5jb25maWcpLmNvbmZpZyhfaW5kZXgyLnJvdXRlckNvbmZpZykucnVuKF9pbmRleDMucnVuQmxvY2spLnNlcnZpY2UoJ2dpdGh1YkNvbnRyaWJ1dG9yJywgX2dpdGh1YkNvbnRyaWJ1dG9yLkdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSkuc2VydmljZSgnd2ViRGV2VGVjJywgX3dlYkRldlRlYy5XZWJEZXZUZWNTZXJ2aWNlKS5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIF9tYWluLk1haW5Db250cm9sbGVyKS5jb250cm9sbGVyKCdUb3BpY0NvbnRyb2xsZXInLCBfdG9waWMuVG9waWNDb250cm9sbGVyKS5kaXJlY3RpdmUoJ2FjbWVOYXZiYXInLCBfbmF2YmFyLk5hdmJhckRpcmVjdGl2ZSkuZGlyZWN0aXZlKCdhY21lTWFsYXJrZXknLCBfbWFsYXJrZXkuTWFsYXJrZXlEaXJlY3RpdmUpOyAvKiBnbG9iYWwgbWFsYXJrZXk6ZmFsc2UsIG1vbWVudDpmYWxzZSAqL1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgubW9kdWxlLmpzIiwiLyogZ2xvYmFsIG1hbGFya2V5OmZhbHNlLCBtb21lbnQ6ZmFsc2UgKi9cblxuaW1wb3J0IHtcblx0Y29uZmlnXG59IGZyb20gJy4vaW5kZXguY29uZmlnJztcbmltcG9ydCB7XG5cdHJvdXRlckNvbmZpZ1xufSBmcm9tICcuL2luZGV4LnJvdXRlJztcbmltcG9ydCB7XG5cdHJ1bkJsb2NrXG59IGZyb20gJy4vaW5kZXgucnVuJztcbmltcG9ydCB7XG5cdE1haW5Db250cm9sbGVyXG59IGZyb20gJy4vbWFpbi9tYWluLmNvbnRyb2xsZXInO1xuaW1wb3J0IHtcblx0VG9waWNDb250cm9sbGVyXG59IGZyb20gJy4vdG9waWMvdG9waWMuY29udHJvbGxlcic7XG5pbXBvcnQge1xuXHRHaXRodWJDb250cmlidXRvclNlcnZpY2Vcbn0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvZ2l0aHViQ29udHJpYnV0b3IvZ2l0aHViQ29udHJpYnV0b3Iuc2VydmljZSc7XG5pbXBvcnQge1xuXHRXZWJEZXZUZWNTZXJ2aWNlXG59IGZyb20gJy4uL2FwcC9jb21wb25lbnRzL3dlYkRldlRlYy93ZWJEZXZUZWMuc2VydmljZSc7XG5pbXBvcnQge1xuXHROYXZiYXJEaXJlY3RpdmVcbn0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcblx0TWFsYXJrZXlEaXJlY3RpdmVcbn0gZnJvbSAnLi4vYXBwL2NvbXBvbmVudHMvbWFsYXJrZXkvbWFsYXJrZXkuZGlyZWN0aXZlJztcblxuYW5ndWxhci5tb2R1bGUoJ215c3RhbmNlRnJvbnQnLCBbJ25nQW5pbWF0ZScsICduZ0Nvb2tpZXMnLCAnbmdUb3VjaCcsICduZ1Nhbml0aXplJywgJ25nTWVzc2FnZXMnLCAnbmdBcmlhJywgJ25nUmVzb3VyY2UnLCAndWkucm91dGVyJywgJ3VpLmJvb3RzdHJhcCcsICd0b2FzdHInLCAnc2F0ZWxsaXplciddKVxuXHQuY29uc3RhbnQoJ0FQSV9VUkwnLCAnaHR0cDovL2xvY2FsaG9zdDo0MDAwLycpXG5cdC5jb25zdGFudCgnbWFsYXJrZXknLCBtYWxhcmtleSlcblx0LmNvbnN0YW50KCdtb21lbnQnLCBtb21lbnQpXG5cdC5jb25maWcoY29uZmlnKVxuXHQuY29uZmlnKHJvdXRlckNvbmZpZylcblx0LnJ1bihydW5CbG9jaylcblx0LnNlcnZpY2UoJ2dpdGh1YkNvbnRyaWJ1dG9yJywgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlKVxuXHQuc2VydmljZSgnd2ViRGV2VGVjJywgV2ViRGV2VGVjU2VydmljZSlcblx0LmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgTWFpbkNvbnRyb2xsZXIpXG5cdC5jb250cm9sbGVyKCdUb3BpY0NvbnRyb2xsZXInLCBUb3BpY0NvbnRyb2xsZXIpXG5cdC5kaXJlY3RpdmUoJ2FjbWVOYXZiYXInLCBOYXZiYXJEaXJlY3RpdmUpXG5cdC5kaXJlY3RpdmUoJ2FjbWVNYWxhcmtleScsIE1hbGFya2V5RGlyZWN0aXZlKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgubW9kdWxlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb25maWcgPSBjb25maWc7XG5mdW5jdGlvbiBjb25maWcoJGxvZ1Byb3ZpZGVyLCB0b2FzdHJDb25maWcsICRhdXRoUHJvdmlkZXIpIHtcblx0J25nSW5qZWN0Jztcblx0Ly8gRW5hYmxlIGxvZ1xuXG5cdCRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG5cblx0Ly8gU2V0IG9wdGlvbnMgdGhpcmQtcGFydHkgbGliXG5cdHRvYXN0ckNvbmZpZy5hbGxvd0h0bWwgPSB0cnVlO1xuXHR0b2FzdHJDb25maWcudGltZU91dCA9IDMwMDA7XG5cdHRvYXN0ckNvbmZpZy5wb3NpdGlvbkNsYXNzID0gJ3RvYXN0LXRvcC1yaWdodCc7XG5cdHRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyA9IHRydWU7XG5cdHRvYXN0ckNvbmZpZy5wcm9ncmVzc0JhciA9IHRydWU7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5jb25maWcuanMiLCJleHBvcnQgZnVuY3Rpb24gY29uZmlnKCRsb2dQcm92aWRlciwgdG9hc3RyQ29uZmlnLCAkYXV0aFByb3ZpZGVyKSB7XG5cdCduZ0luamVjdCc7XG5cdC8vIEVuYWJsZSBsb2dcblx0JGxvZ1Byb3ZpZGVyLmRlYnVnRW5hYmxlZCh0cnVlKTtcblxuXHQvLyBTZXQgb3B0aW9ucyB0aGlyZC1wYXJ0eSBsaWJcblx0dG9hc3RyQ29uZmlnLmFsbG93SHRtbCA9IHRydWU7XG5cdHRvYXN0ckNvbmZpZy50aW1lT3V0ID0gMzAwMDtcblx0dG9hc3RyQ29uZmlnLnBvc2l0aW9uQ2xhc3MgPSAndG9hc3QtdG9wLXJpZ2h0Jztcblx0dG9hc3RyQ29uZmlnLnByZXZlbnREdXBsaWNhdGVzID0gdHJ1ZTtcblx0dG9hc3RyQ29uZmlnLnByb2dyZXNzQmFyID0gdHJ1ZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXguY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yb3V0ZXJDb25maWcgPSByb3V0ZXJDb25maWc7XG5mdW5jdGlvbiByb3V0ZXJDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXHQnbmdJbmplY3QnO1xuXG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy8nLFxuXHRcdHRlbXBsYXRlVXJsOiAnYXBwL21haW4vbWFpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTWFpbkNvbnRyb2xsZXInLFxuXHRcdGNvbnRyb2xsZXJBczogJ21haW4nXG5cdH0pLnN0YXRlKCd0b3BpYy1hZGQnLCB7XG5cdFx0dXJsOiAnL3RvcGljL2FkZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdhcHAvdG9waWMvdG9waWMtYWRkLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdUb3BpY0NvbnRyb2xsZXInLFxuXHRcdGNvbnRyb2xsZXJBczogJ3RvcGljJ1xuXHR9KS5zdGF0ZSgncmVhc29uLWFkZCcsIHtcblx0XHR1cmw6ICcvdG9waWMvOmlkLzpzaWRlL3JlYXNvbi9hZGQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnYXBwL3RvcGljL3JlYXNvbi1hZGQuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ1RvcGljQ29udHJvbGxlcicsXG5cdFx0Y29udHJvbGxlckFzOiAndG9waWMnXG5cdH0pLnN0YXRlKCd0b3BpYycsIHtcblx0XHR1cmw6ICcvdG9waWMvOmlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2FwcC90b3BpYy90b3BpYy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVG9waWNDb250cm9sbGVyJyxcblx0XHRjb250cm9sbGVyQXM6ICd0b3BpYydcblx0fSk7XG5cblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucm91dGUuanMiLCJleHBvcnQgZnVuY3Rpb24gcm91dGVyQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblx0J25nSW5qZWN0Jztcblx0JHN0YXRlUHJvdmlkZXJcblx0XHQuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0XHR1cmw6ICcvJyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL21haW4vbWFpbi5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdNYWluQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdtYWluJ1xuXHRcdH0pXG5cblx0XHQuc3RhdGUoJ3RvcGljLWFkZCcsIHtcblx0XHRcdHVybDogJy90b3BpYy9hZGQnLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdhcHAvdG9waWMvdG9waWMtYWRkLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1RvcGljQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICd0b3BpYydcblx0XHR9KVxuXG5cdFx0LnN0YXRlKCdyZWFzb24tYWRkJywge1xuXHRcdFx0dXJsOiAnL3RvcGljLzppZC86c2lkZS9yZWFzb24vYWRkJyxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYXBwL3RvcGljL3JlYXNvbi1hZGQuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnVG9waWNDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3RvcGljJ1xuXHRcdH0pXG5cblx0XHQuc3RhdGUoJ3RvcGljJywge1xuXHRcdFx0dXJsOiAnL3RvcGljLzppZCcsXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2FwcC90b3BpYy90b3BpYy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdUb3BpY0NvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndG9waWMnXG5cdFx0fSk7XG5cblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9pbmRleC5yb3V0ZS5qcyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucnVuQmxvY2sgPSBydW5CbG9jaztcbmZ1bmN0aW9uIHJ1bkJsb2NrKCRsb2cpIHtcbiAgJ25nSW5qZWN0JztcblxuICAkbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2luZGV4LnJ1bi5qcyIsImV4cG9ydCBmdW5jdGlvbiBydW5CbG9jayAoJGxvZykge1xuICAnbmdJbmplY3QnO1xuICAkbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvaW5kZXgucnVuLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNYWluQ29udHJvbGxlciA9IGV4cG9ydHMuTWFpbkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRodHRwLCAkYXV0aCkge1xuXHRcdCduZ0luamVjdCc7XG5cblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWFpbkNvbnRyb2xsZXIpO1xuXG5cdFx0dGhpcy4kaHR0cCA9ICRodHRwO1xuXHRcdHRoaXMuJGF1dGggPSAkYXV0aDtcblx0XHR0aGlzLnVzZXIgPSB0aGlzLmhhbmRsZVVzZXIoKTtcblxuXHRcdHRoaXMuaGFuZGxlVXNlcigpO1xuXHRcdC8vIEdldCBUb3BpYyBkYXRhIHRvIGRpc3BsYXkgb24gcGFnZSBsb2FkXG5cdFx0dGhpcy5nZXRUb3BpYygpO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKE1haW5Db250cm9sbGVyLCBbe1xuXHRcdGtleTogXCJoYW5kbGVVc2VyXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVVzZXIoKSB7XG5cdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0aWYgKCF2bS4kYXV0aC5nZXRUb2tlbigpKSB7XG5cdFx0XHRcdHRoaXMuJGh0dHAuZ2V0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3VzZXIvYWRkXCIpLnRoZW4oZnVuY3Rpb24gKHRva2VuKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codG9rZW4uZGF0YSk7XG5cdFx0XHRcdFx0dm0uJGF1dGguc2V0VG9rZW4odG9rZW4uZGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3VzZXIvbG9naW5cIiwge1xuXHRcdFx0XHRcdHRva2VuOiB2bS4kYXV0aC5nZXRUb2tlbigpXG5cdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcIlRISVMgU0hPVUxEIEJFIEFOIElEIChoYW5kbGVVc2VyKCkpOiBcIiArIHVzZXIuZGF0YS5faWQpO1xuXHRcdFx0XHRcdGlmICh1c2VyLmRhdGEgPT0gXCJcIikge1xuXHRcdFx0XHRcdFx0dm0uJGF1dGgucmVtb3ZlVG9rZW4oKTtcblx0XHRcdFx0XHRcdHZtLmhhbmRsZVVzZXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dm0udXNlciA9IHVzZXIuZGF0YTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGZlYXR1cmVkIFRvcGljIGRhdGFcblxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFRvcGljXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFRvcGljKCkge1xuXHRcdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdFx0dGhpcy4kaHR0cC5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvZmVhdHVyZWRcIikudGhlbihmdW5jdGlvbiAodG9waWMpIHtcblx0XHRcdFx0aWYgKCF0b3BpYykge1xuXHRcdFx0XHRcdGFsZXJ0KFwiSW52YWxpZCB0b3BpYyBpZC5cIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0dm0uZGF0YSA9IHRvcGljLmRhdGE7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHRvcGljKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBhIHJlYXNvbiB0byBhIHBhcnRpY3VsYXIgU2lkZSBvZiB0aGUgZGlzcGxheWVkIFRvcGljXG5cblx0fSwge1xuXHRcdGtleTogXCJhZGRSZWFzb25cIixcblx0XHR2YWx1ZTogZnVuY3Rpb24gYWRkUmVhc29uKHNpZGUsIHVzZXIpIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiYWRkUmVhc29uKClcIik7XG5cdFx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0XHRpZiAoc2lkZSA9PSAnbm8nKSB7XG5cdFx0XHRcdHRoaXMuJGh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90b3BpYy9cIiArIHZtLmRhdGEuX2lkICsgXCIvXCIgKyBzaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0XHRcdHJlYXNvbjogdGhpcy5ubyxcblx0XHRcdFx0XHRzaWRlOiBzaWRlLFxuXHRcdFx0XHRcdHVzZXI6IHVzZXIuX2lkXG5cdFx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZtLmdldFRvcGljKCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuby1pbnB1dFwiKS52YWx1ZSA9IFwiXCI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChzaWRlID09ICd5ZXMnKSB7XG5cdFx0XHRcdHRoaXMuJGh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90b3BpYy9cIiArIHZtLmRhdGEuX2lkICsgXCIvXCIgKyBzaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0XHRcdHJlYXNvbjogdGhpcy55ZXMsXG5cdFx0XHRcdFx0c2lkZTogc2lkZSxcblx0XHRcdFx0XHR1c2VyOiB1c2VyLl9pZFxuXHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2bS5nZXRUb3BpYygpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwieWVzLWlucHV0XCIpLnZhbHVlID0gXCJcIjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKHNpZGUgPT0gJ21heWJlJykge1xuXHRcdFx0XHR0aGlzLiRodHRwLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvXCIgKyB2bS5kYXRhLl9pZCArIFwiL1wiICsgc2lkZSArIFwiL3JlYXNvbi9hZGQvXCIsIHtcblx0XHRcdFx0XHRyZWFzb246IHRoaXMubWF5YmUsXG5cdFx0XHRcdFx0c2lkZTogc2lkZSxcblx0XHRcdFx0XHR1c2VyOiB1c2VyLl9pZFxuXHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2bS5nZXRUb3BpYygpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWF5YmUtaW5wdXRcIikudmFsdWUgPSBcIlwiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiU29ycnkgLSB3ZSByZWNlaXZlZCBhbiBpbnZhbGlkIHJlcXVlc3QuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5nZXRUb3BpYygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogXCJhZGRWb3RlXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGFkZFZvdGUocmVhc29uLCB1c2VyKSB7XG5cdFx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdFx0dmFyIHVzZXIgPSB0aGlzLmhhbmRsZVVzZXIoKTtcblxuXHRcdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3RvcGljL1wiICsgdm0uZGF0YS5faWQgKyBcIi9cIiArIHJlYXNvbi5zaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0XHRyZWFzb246IHJlYXNvbi50ZXh0LFxuXHRcdFx0XHRzaWRlOiByZWFzb24uc2lkZSxcblx0XHRcdFx0dXNlcjogdm0udXNlci5faWRcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2bS5nZXRUb3BpYygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFRPRE86IEhhbmRsZSBlcnJvclxuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBNYWluQ29udHJvbGxlcjtcbn0oKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiZXhwb3J0IGNsYXNzIE1haW5Db250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoJGh0dHAsICRhdXRoKSB7XG5cdFx0J25nSW5qZWN0Jztcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy4kYXV0aCA9ICRhdXRoO1xuXHRcdHRoaXMudXNlciA9IHRoaXMuaGFuZGxlVXNlcigpO1xuXG5cdFx0dGhpcy5oYW5kbGVVc2VyKCk7XG5cdFx0Ly8gR2V0IFRvcGljIGRhdGEgdG8gZGlzcGxheSBvbiBwYWdlIGxvYWRcblx0XHR0aGlzLmdldFRvcGljKCk7XG5cdH1cblxuXHRoYW5kbGVVc2VyKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0aWYgKCF2bS4kYXV0aC5nZXRUb2tlbigpKSB7XG5cdFx0XHR0aGlzLiRodHRwLmdldChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC91c2VyL2FkZFwiKS50aGVuKGZ1bmN0aW9uKHRva2VuKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHRva2VuLmRhdGEpO1xuXHRcdFx0XHR2bS4kYXV0aC5zZXRUb2tlbih0b2tlbi5kYXRhKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiRodHRwLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdXNlci9sb2dpblwiLCB7XG5cdFx0XHRcdHRva2VuOiB2bS4kYXV0aC5nZXRUb2tlbigpXG5cdFx0XHR9KS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coXCJUSElTIFNIT1VMRCBCRSBBTiBJRCAoaGFuZGxlVXNlcigpKTogXCIgKyB1c2VyLmRhdGEuX2lkKTtcblx0XHRcdFx0aWYgKHVzZXIuZGF0YSA9PSBcIlwiKSB7XG5cdFx0XHRcdFx0dm0uJGF1dGgucmVtb3ZlVG9rZW4oKTtcblx0XHRcdFx0XHR2bS5oYW5kbGVVc2VyKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dm0udXNlciA9IHVzZXIuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIEdldCBmZWF0dXJlZCBUb3BpYyBkYXRhXG5cdGdldFRvcGljKCkge1xuXHRcdHZhciB2bSA9IHRoaXM7XG5cblx0XHR0aGlzLiRodHRwLmdldChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90b3BpYy9mZWF0dXJlZFwiKS50aGVuKGZ1bmN0aW9uKHRvcGljKSB7XG5cdFx0XHRpZiAoIXRvcGljKSB7XG5cdFx0XHRcdGFsZXJ0KFwiSW52YWxpZCB0b3BpYyBpZC5cIik7XG5cdFx0XHR9XG5cdFx0XHR2bS5kYXRhID0gdG9waWMuZGF0YTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRvcGljKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIEFkZCBhIHJlYXNvbiB0byBhIHBhcnRpY3VsYXIgU2lkZSBvZiB0aGUgZGlzcGxheWVkIFRvcGljXG5cdGFkZFJlYXNvbihzaWRlLCB1c2VyKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coXCJhZGRSZWFzb24oKVwiKTtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0aWYgKHNpZGUgPT0gJ25vJykge1xuXHRcdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3RvcGljL1wiICsgdm0uZGF0YS5faWQgKyBcIi9cIiArIHNpZGUgKyBcIi9yZWFzb24vYWRkL1wiLCB7XG5cdFx0XHRcdHJlYXNvbjogdGhpcy5ubyxcblx0XHRcdFx0c2lkZTogc2lkZSxcblx0XHRcdFx0dXNlcjogdXNlci5faWRcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZtLmdldFRvcGljKCk7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm8taW5wdXRcIikudmFsdWUgPSBcIlwiO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChzaWRlID09ICd5ZXMnKSB7XG5cdFx0XHR0aGlzLiRodHRwLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvXCIgKyB2bS5kYXRhLl9pZCArIFwiL1wiICsgc2lkZSArIFwiL3JlYXNvbi9hZGQvXCIsIHtcblx0XHRcdFx0cmVhc29uOiB0aGlzLnllcyxcblx0XHRcdFx0c2lkZTogc2lkZSxcblx0XHRcdFx0dXNlcjogdXNlci5faWRcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZtLmdldFRvcGljKCk7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwieWVzLWlucHV0XCIpLnZhbHVlID0gXCJcIjtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoc2lkZSA9PSAnbWF5YmUnKSB7XG5cdFx0XHR0aGlzLiRodHRwLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvXCIgKyB2bS5kYXRhLl9pZCArIFwiL1wiICsgc2lkZSArIFwiL3JlYXNvbi9hZGQvXCIsIHtcblx0XHRcdFx0cmVhc29uOiB0aGlzLm1heWJlLFxuXHRcdFx0XHRzaWRlOiBzaWRlLFxuXHRcdFx0XHR1c2VyOiB1c2VyLl9pZFxuXHRcdFx0fSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0dm0uZ2V0VG9waWMoKTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXliZS1pbnB1dFwiKS52YWx1ZSA9IFwiXCI7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoXCJTb3JyeSAtIHdlIHJlY2VpdmVkIGFuIGludmFsaWQgcmVxdWVzdC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0VG9waWMoKTtcblx0fVxuXG5cdGFkZFZvdGUocmVhc29uLCB1c2VyKSB7XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHR2YXIgdXNlciA9IHRoaXMuaGFuZGxlVXNlcigpO1xuXG5cdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3RvcGljL1wiICsgdm0uZGF0YS5faWQgKyBcIi9cIiArIHJlYXNvbi5zaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0cmVhc29uOiByZWFzb24udGV4dCxcblx0XHRcdHNpZGU6IHJlYXNvbi5zaWRlLFxuXHRcdFx0dXNlcjogdm0udXNlci5faWRcblx0XHR9KS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0dm0uZ2V0VG9waWMoKTtcblx0XHR9KTtcblxuXHRcdC8vIFRPRE86IEhhbmRsZSBlcnJvclxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBUb3BpY0NvbnRyb2xsZXIgPSBleHBvcnRzLlRvcGljQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gVG9waWNDb250cm9sbGVyKCRodHRwLCAkc3RhdGVQYXJhbXMpIHtcblx0XHQnbmdJbmplY3QnO1xuXG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRvcGljQ29udHJvbGxlcik7XG5cblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy5wYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG5cblx0XHQvLyBHZXRzIFRvcGljIGRhdGEgb24gcGFnZSBsb2FkIGJhc2VkIG9uIFVSTFxuXHRcdHRoaXMuZ2V0VG9waWMoJHN0YXRlUGFyYW1zKTtcblx0fVxuXG5cdC8vIEFkZHMgYSB0b3BpYyB3aXRoIGEgZ2l2ZW4gcXVlc3Rpb25cblxuXG5cdF9jcmVhdGVDbGFzcyhUb3BpY0NvbnRyb2xsZXIsIFt7XG5cdFx0a2V5OiBcImFkZFRvcGljXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGFkZFRvcGljKCkge1xuXHRcdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3RvcGljL2FkZFwiLCB7XG5cdFx0XHRcdHRvcGljOiB0aGlzLnRvcGljXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBBTlRJUVVBVEVEIC0gTm93IHJ1bnMgZnJvbSBtYWluLmNvbnRyb2xsZXIuanNcblx0XHQvLyBHZXRzIHNwZWNpZmljIFRvcGljIGRhdGFcblxuXHR9LCB7XG5cdFx0a2V5OiBcImdldFRvcGljXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFRvcGljKHBhcmFtcykge1xuXHRcdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdFx0dGhpcy4kaHR0cC5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvXCIgKyBwYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24gKHRvcGljKSB7XG5cdFx0XHRcdGlmICghdG9waWMpIHtcblx0XHRcdFx0XHRhbGVydChcIkludmFsaWQgdG9waWMgaWQuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZtLmRhdGEgPSB0b3BpYy5kYXRhO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gQU5USVFVQVRFRCAtIE5vdyBydW5zIGZyb20gbWFpbi5jb250cm9sbGVyLmpzXG5cdFx0Ly8gQWRkcyBuZXcgUmVhc29uIGludG8gYSBwYXJ0aWN1bGFyIFRvcGljJ3MgU2lkZVxuXG5cdH0sIHtcblx0XHRrZXk6IFwiYWRkUmVhc29uXCIsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGFkZFJlYXNvbigpIHtcblx0XHRcdHRoaXMuJGh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90b3BpYy9cIiArIHRoaXMucGFyYW1zLmlkICsgXCIvXCIgKyB0aGlzLnBhcmFtcy5zaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0XHRyZWFzb246IHRoaXMucmVhc29uLFxuXHRcdFx0XHRzaWRlOiB0aGlzLnBhcmFtcy5zaWRlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gVG9waWNDb250cm9sbGVyO1xufSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvdG9waWMvdG9waWMuY29udHJvbGxlci5qcyIsImV4cG9ydCBjbGFzcyBUb3BpY0NvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcigkaHR0cCwgJHN0YXRlUGFyYW1zKSB7XG5cdFx0J25nSW5qZWN0Jztcblx0XHR0aGlzLiRodHRwID0gJGh0dHA7XG5cdFx0dGhpcy5wYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG5cblx0XHQvLyBHZXRzIFRvcGljIGRhdGEgb24gcGFnZSBsb2FkIGJhc2VkIG9uIFVSTFxuXHRcdHRoaXMuZ2V0VG9waWMoJHN0YXRlUGFyYW1zKTtcblx0fVxuXG5cdC8vIEFkZHMgYSB0b3BpYyB3aXRoIGEgZ2l2ZW4gcXVlc3Rpb25cblx0YWRkVG9waWMoKSB7XG5cdFx0dGhpcy4kaHR0cC5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3RvcGljL2FkZFwiLCB7XG5cdFx0XHR0b3BpYzogdGhpcy50b3BpY1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gQU5USVFVQVRFRCAtIE5vdyBydW5zIGZyb20gbWFpbi5jb250cm9sbGVyLmpzXG5cdC8vIEdldHMgc3BlY2lmaWMgVG9waWMgZGF0YVxuXHRnZXRUb3BpYyhwYXJhbXMpIHtcblx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0dGhpcy4kaHR0cC5nZXQoXCJodHRwOi8vbG9jYWxob3N0OjQwMDAvdG9waWMvXCIgKyBwYXJhbXMuaWQpLnRoZW4oZnVuY3Rpb24odG9waWMpIHtcblx0XHRcdGlmICghdG9waWMpIHtcblx0XHRcdFx0YWxlcnQoXCJJbnZhbGlkIHRvcGljIGlkLlwiKTtcblx0XHRcdH1cblx0XHRcdHZtLmRhdGEgPSB0b3BpYy5kYXRhO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gQU5USVFVQVRFRCAtIE5vdyBydW5zIGZyb20gbWFpbi5jb250cm9sbGVyLmpzXG5cdC8vIEFkZHMgbmV3IFJlYXNvbiBpbnRvIGEgcGFydGljdWxhciBUb3BpYydzIFNpZGVcblx0YWRkUmVhc29uKCkge1xuXHRcdHRoaXMuJGh0dHAucG9zdChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC90b3BpYy9cIiArIHRoaXMucGFyYW1zLmlkICsgXCIvXCIgKyB0aGlzLnBhcmFtcy5zaWRlICsgXCIvcmVhc29uL2FkZC9cIiwge1xuXHRcdFx0cmVhc29uOiB0aGlzLnJlYXNvbixcblx0XHRcdHNpZGU6IHRoaXMucGFyYW1zLnNpZGVcblx0XHR9KTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC90b3BpYy90b3BpYy5jb250cm9sbGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlID0gZXhwb3J0cy5HaXRodWJDb250cmlidXRvclNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSgkbG9nLCAkaHR0cCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlKTtcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuYXBpSG9zdCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXInO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEdpdGh1YkNvbnRyaWJ1dG9yU2VydmljZSwgW3tcbiAgICBrZXk6ICdnZXRDb250cmlidXRvcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb250cmlidXRvcnMoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgbGltaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDMwO1xuXG4gICAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQodGhpcy5hcGlIb3N0ICsgJy9jb250cmlidXRvcnM/cGVyX3BhZ2U9JyArIGxpbWl0KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdYSFIgRmFpbGVkIGZvciBnZXRDb250cmlidXRvcnMuXFxuJyArIGFuZ3VsYXIudG9Kc29uKGVycm9yLmRhdGEsIHRydWUpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBHaXRodWJDb250cmlidXRvclNlcnZpY2U7XG59KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgR2l0aHViQ29udHJpYnV0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IgKCRsb2csICRodHRwKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuYXBpSG9zdCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1N3aWlwL2dlbmVyYXRvci1ndWxwLWFuZ3VsYXInO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGxpbWl0PTMwKSB7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAuZ2V0KHRoaXMuYXBpSG9zdCArICcvY29udHJpYnV0b3JzP3Blcl9wYWdlPScgKyBsaW1pdClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuJGxvZy5lcnJvcignWEhSIEZhaWxlZCBmb3IgZ2V0Q29udHJpYnV0b3JzLlxcbicgKyBhbmd1bGFyLnRvSnNvbihlcnJvci5kYXRhLCB0cnVlKSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL2dpdGh1YkNvbnRyaWJ1dG9yL2dpdGh1YkNvbnRyaWJ1dG9yLnNlcnZpY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBXZWJEZXZUZWNTZXJ2aWNlID0gZXhwb3J0cy5XZWJEZXZUZWNTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBXZWJEZXZUZWNTZXJ2aWNlKCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2ViRGV2VGVjU2VydmljZSk7XG5cbiAgICB0aGlzLmRhdGEgPSBbe1xuICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXJKUycsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vYW5ndWxhcmpzLm9yZy8nLFxuICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0hUTUwgZW5oYW5jZWQgZm9yIHdlYiBhcHBzIScsXG4gICAgICAnbG9nbyc6ICdhbmd1bGFyLnBuZydcbiAgICB9LCB7XG4gICAgICAndGl0bGUnOiAnQnJvd3NlclN5bmMnLFxuICAgICAgJ3VybCc6ICdodHRwOi8vYnJvd3NlcnN5bmMuaW8vJyxcbiAgICAgICdkZXNjcmlwdGlvbic6ICdUaW1lLXNhdmluZyBzeW5jaHJvbmlzZWQgYnJvd3NlciB0ZXN0aW5nLicsXG4gICAgICAnbG9nbyc6ICdicm93c2Vyc3luYy5wbmcnXG4gICAgfSwge1xuICAgICAgJ3RpdGxlJzogJ0d1bHBKUycsXG4gICAgICAndXJsJzogJ2h0dHA6Ly9ndWxwanMuY29tLycsXG4gICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHN0cmVhbWluZyBidWlsZCBzeXN0ZW0uJyxcbiAgICAgICdsb2dvJzogJ2d1bHAucG5nJ1xuICAgIH0sIHtcbiAgICAgICd0aXRsZSc6ICdKYXNtaW5lJyxcbiAgICAgICd1cmwnOiAnaHR0cDovL2phc21pbmUuZ2l0aHViLmlvLycsXG4gICAgICAnZGVzY3JpcHRpb24nOiAnQmVoYXZpb3ItRHJpdmVuIEphdmFTY3JpcHQuJyxcbiAgICAgICdsb2dvJzogJ2phc21pbmUucG5nJ1xuICAgIH0sIHtcbiAgICAgICd0aXRsZSc6ICdLYXJtYScsXG4gICAgICAndXJsJzogJ2h0dHA6Ly9rYXJtYS1ydW5uZXIuZ2l0aHViLmlvLycsXG4gICAgICAnZGVzY3JpcHRpb24nOiAnU3BlY3RhY3VsYXIgVGVzdCBSdW5uZXIgZm9yIEphdmFTY3JpcHQuJyxcbiAgICAgICdsb2dvJzogJ2thcm1hLnBuZydcbiAgICB9LCB7XG4gICAgICAndGl0bGUnOiAnUHJvdHJhY3RvcicsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3Byb3RyYWN0b3InLFxuICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0VuZCB0byBlbmQgdGVzdCBmcmFtZXdvcmsgZm9yIEFuZ3VsYXJKUyBhcHBsaWNhdGlvbnMgYnVpbHQgb24gdG9wIG9mIFdlYkRyaXZlckpTLicsXG4gICAgICAnbG9nbyc6ICdwcm90cmFjdG9yLnBuZydcbiAgICB9LCB7XG4gICAgICAndGl0bGUnOiAnQm9vdHN0cmFwJyxcbiAgICAgICd1cmwnOiAnaHR0cDovL2dldGJvb3RzdHJhcC5jb20vJyxcbiAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgaXMgdGhlIG1vc3QgcG9wdWxhciBIVE1MLCBDU1MsIGFuZCBKUyBmcmFtZXdvcmsgZm9yIGRldmVsb3BpbmcgcmVzcG9uc2l2ZSwgbW9iaWxlIGZpcnN0IHByb2plY3RzIG9uIHRoZSB3ZWIuJyxcbiAgICAgICdsb2dvJzogJ2Jvb3RzdHJhcC5wbmcnXG4gICAgfSwge1xuICAgICAgJ3RpdGxlJzogJ0FuZ3VsYXIgVUkgQm9vdHN0cmFwJyxcbiAgICAgICd1cmwnOiAnaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL2Jvb3RzdHJhcC8nLFxuICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Jvb3RzdHJhcCBjb21wb25lbnRzIHdyaXR0ZW4gaW4gcHVyZSBBbmd1bGFySlMgYnkgdGhlIEFuZ3VsYXJVSSBUZWFtLicsXG4gICAgICAnbG9nbyc6ICd1aS1ib290c3RyYXAucG5nJ1xuICAgIH0sIHtcbiAgICAgICd0aXRsZSc6ICdTYXNzIChOb2RlKScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL25vZGUtc2FzcycsXG4gICAgICAnZGVzY3JpcHRpb24nOiAnTm9kZS5qcyBiaW5kaW5nIHRvIGxpYnNhc3MsIHRoZSBDIHZlcnNpb24gb2YgdGhlIHBvcHVsYXIgc3R5bGVzaGVldCBwcmVwcm9jZXNzb3IsIFNhc3MuJyxcbiAgICAgICdsb2dvJzogJ25vZGUtc2Fzcy5wbmcnXG4gICAgfSwge1xuICAgICAgJ3RpdGxlJzogJ0VTNiAoQmFiZWwgZm9ybWVybHkgNnRvNSknLFxuICAgICAgJ3VybCc6ICdodHRwczovL2JhYmVsanMuaW8vJyxcbiAgICAgICdkZXNjcmlwdGlvbic6ICdUdXJucyBFUzYrIGNvZGUgaW50byB2YW5pbGxhIEVTNSwgc28geW91IGNhbiB1c2UgbmV4dCBnZW5lcmF0aW9uIGZlYXR1cmVzIHRvZGF5LicsXG4gICAgICAnbG9nbyc6ICdiYWJlbC5wbmcnXG4gICAgfV07XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2ViRGV2VGVjU2VydmljZSwgW3tcbiAgICBrZXk6ICdnZXRUZWMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUZWMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJEZXZUZWNTZXJ2aWNlO1xufSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCJleHBvcnQgY2xhc3MgV2ViRGV2VGVjU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdGhpcy5kYXRhID0gW1xuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnQW5ndWxhckpTJyxcbiAgICAgICAgJ3VybCc6ICdodHRwczovL2FuZ3VsYXJqcy5vcmcvJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0hUTUwgZW5oYW5jZWQgZm9yIHdlYiBhcHBzIScsXG4gICAgICAgICdsb2dvJzogJ2FuZ3VsYXIucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0Jyb3dzZXJTeW5jJyxcbiAgICAgICAgJ3VybCc6ICdodHRwOi8vYnJvd3NlcnN5bmMuaW8vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RpbWUtc2F2aW5nIHN5bmNocm9uaXNlZCBicm93c2VyIHRlc3RpbmcuJyxcbiAgICAgICAgJ2xvZ28nOiAnYnJvd3NlcnN5bmMucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0d1bHBKUycsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2d1bHBqcy5jb20vJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzdHJlYW1pbmcgYnVpbGQgc3lzdGVtLicsXG4gICAgICAgICdsb2dvJzogJ2d1bHAucG5nJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ3RpdGxlJzogJ0phc21pbmUnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9qYXNtaW5lLmdpdGh1Yi5pby8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQmVoYXZpb3ItRHJpdmVuIEphdmFTY3JpcHQuJyxcbiAgICAgICAgJ2xvZ28nOiAnamFzbWluZS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnS2FybWEnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9rYXJtYS1ydW5uZXIuZ2l0aHViLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdTcGVjdGFjdWxhciBUZXN0IFJ1bm5lciBmb3IgSmF2YVNjcmlwdC4nLFxuICAgICAgICAnbG9nbyc6ICdrYXJtYS5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnUHJvdHJhY3RvcicsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvcHJvdHJhY3RvcicsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdFbmQgdG8gZW5kIHRlc3QgZnJhbWV3b3JrIGZvciBBbmd1bGFySlMgYXBwbGljYXRpb25zIGJ1aWx0IG9uIHRvcCBvZiBXZWJEcml2ZXJKUy4nLFxuICAgICAgICAnbG9nbyc6ICdwcm90cmFjdG9yLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdCb290c3RyYXAnLFxuICAgICAgICAndXJsJzogJ2h0dHA6Ly9nZXRib290c3RyYXAuY29tLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdCb290c3RyYXAgaXMgdGhlIG1vc3QgcG9wdWxhciBIVE1MLCBDU1MsIGFuZCBKUyBmcmFtZXdvcmsgZm9yIGRldmVsb3BpbmcgcmVzcG9uc2l2ZSwgbW9iaWxlIGZpcnN0IHByb2plY3RzIG9uIHRoZSB3ZWIuJyxcbiAgICAgICAgJ2xvZ28nOiAnYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdBbmd1bGFyIFVJIEJvb3RzdHJhcCcsXG4gICAgICAgICd1cmwnOiAnaHR0cDovL2FuZ3VsYXItdWkuZ2l0aHViLmlvL2Jvb3RzdHJhcC8nLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQm9vdHN0cmFwIGNvbXBvbmVudHMgd3JpdHRlbiBpbiBwdXJlIEFuZ3VsYXJKUyBieSB0aGUgQW5ndWxhclVJIFRlYW0uJyxcbiAgICAgICAgJ2xvZ28nOiAndWktYm9vdHN0cmFwLnBuZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICd0aXRsZSc6ICdTYXNzIChOb2RlKScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9naXRodWIuY29tL3Nhc3Mvbm9kZS1zYXNzJyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ05vZGUuanMgYmluZGluZyB0byBsaWJzYXNzLCB0aGUgQyB2ZXJzaW9uIG9mIHRoZSBwb3B1bGFyIHN0eWxlc2hlZXQgcHJlcHJvY2Vzc29yLCBTYXNzLicsXG4gICAgICAgICdsb2dvJzogJ25vZGUtc2Fzcy5wbmcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAndGl0bGUnOiAnRVM2IChCYWJlbCBmb3JtZXJseSA2dG81KScsXG4gICAgICAgICd1cmwnOiAnaHR0cHM6Ly9iYWJlbGpzLmlvLycsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUdXJucyBFUzYrIGNvZGUgaW50byB2YW5pbGxhIEVTNSwgc28geW91IGNhbiB1c2UgbmV4dCBnZW5lcmF0aW9uIGZlYXR1cmVzIHRvZGF5LicsXG4gICAgICAgICdsb2dvJzogJ2JhYmVsLnBuZydcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0VGVjKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy93ZWJEZXZUZWMvd2ViRGV2VGVjLnNlcnZpY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLk5hdmJhckRpcmVjdGl2ZSA9IE5hdmJhckRpcmVjdGl2ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gTmF2YmFyRGlyZWN0aXZlKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNyZWF0aW9uRGF0ZTogJz0nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcbn1cblxudmFyIE5hdmJhckNvbnRyb2xsZXIgPSBmdW5jdGlvbiBOYXZiYXJDb250cm9sbGVyKG1vbWVudCkge1xuICAnbmdJbmplY3QnO1xuXG4gIC8vIFwidGhpcy5jcmVhdGlvbkRhdGVcIiBpcyBhdmFpbGFibGUgYnkgZGlyZWN0aXZlIG9wdGlvbiBcImJpbmRUb0NvbnRyb2xsZXI6IHRydWVcIlxuXG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOYXZiYXJDb250cm9sbGVyKTtcblxuICB0aGlzLnJlbGF0aXZlRGF0ZSA9IG1vbWVudCh0aGlzLmNyZWF0aW9uRGF0ZSkuZnJvbU5vdygpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCJleHBvcnQgZnVuY3Rpb24gTmF2YmFyRGlyZWN0aXZlKCkge1xuICAnbmdJbmplY3QnO1xuXG4gIGxldCBkaXJlY3RpdmUgPSB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgY3JlYXRpb25EYXRlOiAnPSdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IE5hdmJhckNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xufVxuXG5jbGFzcyBOYXZiYXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKG1vbWVudCkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICAvLyBcInRoaXMuY3JlYXRpb25EYXRlXCIgaXMgYXZhaWxhYmxlIGJ5IGRpcmVjdGl2ZSBvcHRpb24gXCJiaW5kVG9Db250cm9sbGVyOiB0cnVlXCJcbiAgICB0aGlzLnJlbGF0aXZlRGF0ZSA9IG1vbWVudCh0aGlzLmNyZWF0aW9uRGF0ZSkuZnJvbU5vdygpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5kaXJlY3RpdmUuanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmV4cG9ydHMuTWFsYXJrZXlEaXJlY3RpdmUgPSBNYWxhcmtleURpcmVjdGl2ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gTWFsYXJrZXlEaXJlY3RpdmUobWFsYXJrZXkpIHtcbiAgJ25nSW5qZWN0JztcblxuICB2YXIgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGV4dHJhVmFsdWVzOiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBsaW5rOiBsaW5rRnVuYyxcbiAgICBjb250cm9sbGVyOiBNYWxhcmtleUNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiAndm0nXG4gIH07XG5cbiAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICBmdW5jdGlvbiBsaW5rRnVuYyhzY29wZSwgZWwsIGF0dHIsIHZtKSB7XG4gICAgdmFyIHdhdGNoZXIgPSB2b2lkIDA7XG4gICAgdmFyIHR5cGlzdCA9IG1hbGFya2V5KGVsWzBdLCB7XG4gICAgICB0eXBlU3BlZWQ6IDQwLFxuICAgICAgZGVsZXRlU3BlZWQ6IDQwLFxuICAgICAgcGF1c2VEZWxheTogODAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIHBvc3RmaXg6ICcgJ1xuICAgIH0pO1xuXG4gICAgZWwuYWRkQ2xhc3MoJ2FjbWUtbWFsYXJrZXknKTtcblxuICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5leHRyYVZhbHVlcywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICB0eXBpc3QudHlwZSh2YWx1ZSkucGF1c2UoKS5kZWxldGUoKTtcbiAgICB9KTtcblxuICAgIHdhdGNoZXIgPSBzY29wZS4kd2F0Y2goJ3ZtLmNvbnRyaWJ1dG9ycycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5jb250cmlidXRvcnMsIGZ1bmN0aW9uIChjb250cmlidXRvcikge1xuICAgICAgICB0eXBpc3QudHlwZShjb250cmlidXRvci5sb2dpbikucGF1c2UoKS5kZWxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhdGNoZXIoKTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgTWFsYXJrZXlDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNYWxhcmtleUNvbnRyb2xsZXIoJGxvZywgZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1hbGFya2V5Q29udHJvbGxlcik7XG5cbiAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgIHRoaXMuY29udHJpYnV0b3JzID0gW107XG5cbiAgICB0aGlzLmFjdGl2YXRlKGdpdGh1YkNvbnRyaWJ1dG9yKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNYWxhcmtleUNvbnRyb2xsZXIsIFt7XG4gICAga2V5OiAnYWN0aXZhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhY3RpdmF0ZShnaXRodWJDb250cmlidXRvcikge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuJGxvZy5pbmZvKCdBY3RpdmF0ZWQgQ29udHJpYnV0b3JzIFZpZXcnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldENvbnRyaWJ1dG9ycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbnRyaWJ1dG9ycyhnaXRodWJDb250cmlidXRvcikge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBnaXRodWJDb250cmlidXRvci5nZXRDb250cmlidXRvcnMoMTApLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgX3RoaXMyLmNvbnRyaWJ1dG9ycyA9IGRhdGE7XG5cbiAgICAgICAgcmV0dXJuIF90aGlzMi5jb250cmlidXRvcnM7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWFsYXJrZXlDb250cm9sbGVyO1xufSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiLCJleHBvcnQgZnVuY3Rpb24gTWFsYXJrZXlEaXJlY3RpdmUobWFsYXJrZXkpIHtcbiAgJ25nSW5qZWN0JztcblxuICBsZXQgZGlyZWN0aXZlID0ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgICAgZXh0cmFWYWx1ZXM6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICcmbmJzcDsnLFxuICAgIGxpbms6IGxpbmtGdW5jLFxuICAgIGNvbnRyb2xsZXI6IE1hbGFya2V5Q29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgfTtcblxuICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gIGZ1bmN0aW9uIGxpbmtGdW5jKHNjb3BlLCBlbCwgYXR0ciwgdm0pIHtcbiAgICBsZXQgd2F0Y2hlcjtcbiAgICBsZXQgdHlwaXN0ID0gbWFsYXJrZXkoZWxbMF0sIHtcbiAgICAgIHR5cGVTcGVlZDogNDAsXG4gICAgICBkZWxldGVTcGVlZDogNDAsXG4gICAgICBwYXVzZURlbGF5OiA4MDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgcG9zdGZpeDogJyAnXG4gICAgfSk7XG5cbiAgICBlbC5hZGRDbGFzcygnYWNtZS1tYWxhcmtleScpO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLmV4dHJhVmFsdWVzLCAodmFsdWUpID0+IHtcbiAgICAgIHR5cGlzdC50eXBlKHZhbHVlKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgIH0pO1xuXG4gICAgd2F0Y2hlciA9IHNjb3BlLiR3YXRjaCgndm0uY29udHJpYnV0b3JzJywgKCkgPT4ge1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZtLmNvbnRyaWJ1dG9ycywgKGNvbnRyaWJ1dG9yKSA9PiB7XG4gICAgICAgIHR5cGlzdC50eXBlKGNvbnRyaWJ1dG9yLmxvZ2luKS5wYXVzZSgpLmRlbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xuICAgICAgd2F0Y2hlcigpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuY2xhc3MgTWFsYXJrZXlDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKCRsb2csIGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgdGhpcy5jb250cmlidXRvcnMgPSBbXTtcblxuICAgIHRoaXMuYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpO1xuICB9XG5cbiAgYWN0aXZhdGUoZ2l0aHViQ29udHJpYnV0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb250cmlidXRvcnMoZ2l0aHViQ29udHJpYnV0b3IpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy4kbG9nLmluZm8oJ0FjdGl2YXRlZCBDb250cmlidXRvcnMgVmlldycpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJpYnV0b3JzKGdpdGh1YkNvbnRyaWJ1dG9yKSB7XG4gICAgcmV0dXJuIGdpdGh1YkNvbnRyaWJ1dG9yLmdldENvbnRyaWJ1dG9ycygxMCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5jb250cmlidXRvcnMgPSBkYXRhO1xuXG4gICAgICByZXR1cm4gdGhpcy5jb250cmlidXRvcnM7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9tYWxhcmtleS9tYWxhcmtleS5kaXJlY3RpdmUuanMiXSwic291cmNlUm9vdCI6IiJ9