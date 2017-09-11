/******/!function(t){function e(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var o=n(1),a=n(2),i=n(3),r=n(4),s=n(5),c=n(6),l=n(7),u=n(8),d=n(9);angular.module("mystanceFront",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr","satellizer"]).constant("API_URL","http://localhost:4000/").constant("malarkey",malarkey).constant("moment",moment).constant("DOMAIN_URL","www.mystance.co").config(o.config).config(a.routerConfig).run(i.runBlock).service("githubContributor",c.GithubContributorService).service("webDevTec",l.WebDevTecService).controller("MainController",r.MainController).controller("TopicController",s.TopicController).directive("acmeNavbar",u.NavbarDirective).directive("acmeMalarkey",d.MalarkeyDirective)},function(t,e){"use strict";function n(t,e,n){"ngInject";t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}n.$inject=["$logProvider","toastrConfig","$authProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.config=n},function(t,e){"use strict";function n(t,e){"ngInject";t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("topic-add",{url:"/topic/add",templateUrl:"app/topic/topic-add.html",controller:"TopicController",controllerAs:"topic"}).state("reason-add",{url:"/topic/:id/:side/reason/add",templateUrl:"app/topic/reason-add.html",controller:"TopicController",controllerAs:"topic"}).state("topic",{url:"/topic/:id",templateUrl:"app/topic/topic.html",controller:"TopicController",controllerAs:"topic"}),e.otherwise("/")}n.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=n},function(t,e){"use strict";function n(t){"ngInject";t.debug("runBlock end")}n.$inject=["$log"],Object.defineProperty(e,"__esModule",{value:!0}),e.runBlock=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.MainController=function(){function t(e,o){"ngInject";n(this,t),this.$http=e,this.$auth=o,this.user=this.handleUser(),this.handleUser(),this.getTopic()}return t.$inject=["$http","$auth"],o(t,[{key:"handleUser",value:function(){var t=this;t.$auth.getToken()?this.$http.post("/user/login",{token:t.$auth.getToken()}).then(function(e){""==e.data&&(t.$auth.removeToken(),t.handleUser()),t.user=e.data}):this.$http.get("/user/add").then(function(e){console.log(e.data),t.$auth.setToken(e.data)})}},{key:"getTopic",value:function(){var t=this;this.$http.get("/topic/featured").then(function(e){e||alert("Invalid topic id."),t.data=e.data})}},{key:"addReason",value:function(t,e){var n=this;"no"==t?this.$http.post("/topic/"+n.data._id+"/"+t+"/reason/add/",{reason:this.no,side:t,user:e._id}).then(function(){n.getTopic(),document.getElementById("no-input").value=""}):"yes"==t?this.$http.post("/topic/"+n.data._id+"/"+t+"/reason/add/",{reason:this.yes,side:t,user:e._id}).then(function(){n.getTopic(),document.getElementById("yes-input").value=""}):"maybe"==t?this.$http.post("/topic/"+n.data._id+"/"+t+"/reason/add/",{reason:this.maybe,side:t,user:e._id}).then(function(){n.getTopic(),document.getElementById("maybe-input").value=""}):alert("Sorry - we received an invalid request. Please try again."),this.getTopic()}},{key:"addVote",value:function(t,e){var n=this;this.handleUser();this.$http.post("/topic/"+n.data._id+"/"+t.side+"/reason/add/",{reason:t.text,side:t.side,user:n.user._id}).then(function(){n.getTopic()})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.TopicController=function(){function t(e,o){"ngInject";n(this,t),this.$http=e,this.params=o}return t.$inject=["$http","$stateParams"],o(t,[{key:"addTopic",value:function(){this.$http.post("/topic/add",{topic:this.topic})}},{key:"getTopic",value:function(t){var e=this;this.$http.get("/topic/"+t.id).then(function(t){t||alert("Invalid topic id."),e.data=t.data})}},{key:"addReason",value:function(){this.$http.post("/topic/"+this.params.id+"/"+this.params.side+"/reason/add/",{reason:this.reason,side:this.params.side})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.GithubContributorService=function(){function t(e,o){"ngInject";n(this,t),this.$log=e,this.$http=o,this.apiHost="https://api.github.com/repos/Swiip/generator-gulp-angular"}return t.$inject=["$log","$http"],o(t,[{key:"getContributors",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:30;return this.$http.get(this.apiHost+"/contributors?per_page="+e).then(function(t){return t.data})["catch"](function(e){t.$log.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))})}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.WebDevTecService=function(){function t(){"ngInject";n(this,t),this.data=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"},{title:"ES6 (Babel formerly 6to5)",url:"https://babeljs.io/",description:"Turns ES6+ code into vanilla ES5, so you can use next generation features today.",logo:"babel.png"}]}return o(t,[{key:"getTec",value:function(){return this.data}}]),t}()},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){"ngInject";var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:a,controllerAs:"vm",bindToController:!0};return t}Object.defineProperty(e,"__esModule",{value:!0}),e.NavbarDirective=o;var a=function i(t){"ngInject";n(this,i),this.relativeDate=t(this.creationDate).fromNow()};a.$inject=["moment"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){"ngInject";function e(e,n,o,a){var i=void 0,r=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){r.type(t).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(a.contributors,function(t){r.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})}var n={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:i,controllerAs:"vm"};return n}o.$inject=["malarkey"],Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.MalarkeyDirective=o;var i=function(){function t(e,o){"ngInject";n(this,t),this.$log=e,this.contributors=[],this.activate(o)}return t.$inject=["$log","githubContributor"],a(t,[{key:"activate",value:function(t){var e=this;return this.getContributors(t).then(function(){e.$log.info("Activated Contributors View")})}},{key:"getContributors",value:function(t){var e=this;return t.getContributors(10).then(function(t){return e.contributors=t,e.contributors})}}]),t}()}]),angular.module("mystanceFront").run(["$templateCache",function(t){t.put("app/main/main.html",'<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel=stylesheet><!-- <div class="red"></div>\r\n<div class="white"></div>\r\n<div class="blue"></div> --><div class="container-fluid masthead"><h1 class="text-center site-header">MyStance</h1><h2 class="text-center site-subheader">The world\'s opinions in three boxes.</h2><h3 class="text-center site-subtext">Created by <a href=http://cwgillette.com target=_blank>Conner Gillette</a></h3></div><div class=container><div class=topic><div class="topic-label center-block">TOPIC:</div><div class="text-center topic-container">{{main.data.question}}<a href=#><span class="topic-right text-right glyphicon glyphicon-chevron-right" aria-hidden=true></span></a></div></div><div class=row><div class=col-md-6><div class=side><h4 class="side-header no">NO</h4><div class=reasons-container id=no-reasons><div class="row reason" ng-repeat="reason in main.data.no"><div class="reason-name col-md-9">{{reason.text}}</div><div class="count col-md-3" ng-click="main.addVote(reason, main.user)">{{reason.count}}</div></div></div><div class=reason><form name=add-reason ng-submit="main.addReason(\'no\', main.user)"><input id=no-input type=text ng-model=main.no class="reason-name reason-custom col-md-9" placeholder="What\'s your reason?"> <button class="reason-custom-button col-md-3 no-button">Add</button></form></div></div></div><div class="col-md-6 side"><h4 class="side-header yes">YES</h4><div class=reasons-container id=yes-reasons><div class="row reason" ng-repeat="reason in main.data.yes"><div class="reason-name col-md-9">{{reason.text}}</div><div class="count col-md-3" ng-click=main.addVote(reason)>{{reason.count}}</div></div></div><div class=reason><form name=add-reason ng-submit="main.addReason(\'yes\', main.user)"><input id=yes-input ng-model=main.yes type=text class="reason-name reason-custom col-md-9" placeholder="What\'s your reason?"> <button class="reason-custom-button col-md-3 yes-button">Add</button></form></div></div></div><div class=row><div class="col-md-offset-3 col-md-6 side second-row"><h4 class="side-header maybe">MAYBE</h4><div class=reasons-container id=maybe-reasons><div class="row reason" ng-repeat="reason in main.data.maybe"><div class="reason-name col-md-9">{{reason.text}}</div><div class="count col-md-3" ng-click=main.addVote(reason)>{{reason.count}}</div></div></div><div class=reason><form name=add-reason ng-submit="main.addReason(\'maybe\', main.user)"><input id=maybe-input type=text ng-model=main.maybe class="reason-name reason-custom col-md-9" placeholder="What\'s your reason?"> <button class="reason-custom-button col-md-3 maybe-button">Add</button></form></div></div></div></div>'),t.put("app/topic/reason-add.html",'<div class=container><h1>Add a reason</h1><form name=add-reason ng-submit=topic.addReason()><div class=row><label for=reason>Reason</label><input ng-model=topic.reason type=text id=reason placeholder="e.g. \'The 2nd amendment says so\'" class=col-md-12 value="The 2nd amendment says so"></div><button type=submit class="btn btn-default">Submit Reason</button></form></div>'),t.put("app/topic/topic-add.html",'<div class=container><h1>Add a topic</h1><form name=add-topic ng-submit=topic.addTopic()><div class=row><label for=question>Question</label><input ng-model=topic.topic.question type=text id=question placeholder="e.g. \'Should all US Citizens be allowed to own a firearm?\'" class=col-md-12></div><button type=submit class="btn btn-default">Submit Topic</button></form></div>'),t.put("app/topic/topic.html","<h1>{{topic.data.question}}</h1>"),t.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class=container-fluid><div class=navbar-header><a class=navbar-brand href=https://github.com/Swiip/generator-gulp-angular><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-6><ul class="nav navbar-nav"><li class=active><a ng-href=#>Home</a></li><li><a ng-href=#>About</a></li><li><a ng-href=#>Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-5de7931822.js.map
