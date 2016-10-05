(function (angular, $, _) {
    angular.module('memberlist').config(_config);

    function _config($routeProvider) {
        $routeProvider.when('/dlinx/members', {
            controller: 'MemberlistMemberCtrl',
            templateUrl: '~/memberlist/MemberCtrl.html',
            controllerAs: 'memberCtrl',
            resolve: {
                membersInfo: function (crmApi) {
                    return crmApi('Membership', 'get', {
                        sequential: true
                    });
                }
            }
        });
    }
} (angular, CRM.$, CRM._));