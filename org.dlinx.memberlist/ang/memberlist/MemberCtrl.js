(function (angular, $, _) {

  angular.module('memberlist').config(function ($routeProvider) {
    $routeProvider.when('/dlinx/members', {
      controller: 'MemberlistMemberCtrl',
      templateUrl: '~/memberlist/MemberCtrl.html',

      resolve: {
        membersInfo: function (crmApi) {
          return crmApi('Membership', 'get', {
            sequential: true
          });
        }
      }
    });
  }
  );

  angular.module('memberlist').controller('MemberlistMemberCtrl', function ($scope, crmApi, crmStatus, crmUiHelp, membersInfo) {

    var ts = $scope.ts = CRM.ts('memberlist');
    var hs = $scope.hs = crmUiHelp({ file: 'CRM/memberlist/MemberCtrl' }); // See: templates/CRM/memberlist/MemberCtrl.hlp

    $scope.members = membersInfo.values;
  });

})(angular, CRM.$, CRM._);
