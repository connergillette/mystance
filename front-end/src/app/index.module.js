/* global malarkey:false, moment:false */

import {
	config
} from './index.config';
import {
	routerConfig
} from './index.route';
import {
	runBlock
} from './index.run';
import {
	MainController
} from './main/main.controller';
import {
	TopicController
} from './topic/topic.controller';
import {
	GithubContributorService
} from '../app/components/githubContributor/githubContributor.service';
import {
	WebDevTecService
} from '../app/components/webDevTec/webDevTec.service';
import {
	NavbarDirective
} from '../app/components/navbar/navbar.directive';
import {
	MalarkeyDirective
} from '../app/components/malarkey/malarkey.directive';

angular.module('mystanceFront', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'satellizer'])
	.constant('API_URL', 'http://localhost:4000/')
	.constant('malarkey', malarkey)
	.constant('moment', moment)
	.constant('DOMAIN_URL', 'www.mystance.co')
	.config(config)
	.config(routerConfig)
	.run(runBlock)
	.service('githubContributor', GithubContributorService)
	.service('webDevTec', WebDevTecService)
	.controller('MainController', MainController)
	.controller('TopicController', TopicController)
	.directive('acmeNavbar', NavbarDirective)
	.directive('acmeMalarkey', MalarkeyDirective);
