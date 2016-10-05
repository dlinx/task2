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

  // Filter for date range
  angular.module('memberlist')
    .filter('min', function () {
      return function (items, property, min) {
        if (!min) return items;
        return items.filter(function (item) {
          return new Date(item[property]) >= new Date(min);
        });
      };
    })
    .filter('max', function () {
      return function (items, property, max) {
        if (!max) return items;
        return items.filter(function (item) {
          return (new Date(item[property]) <= new Date(max));
        });
      };
    });

  // Member list Controller
  angular.module('memberlist')
    .controller('MemberlistMemberCtrl', _memberlistMemberCtrl)

  _memberlistMemberCtrl.$inject = ['crmApi', 'crmStatus', 'crmUiHelp', 'membersInfo', '$filter']

  function _memberlistMemberCtrl(crmApi, crmStatus, crmUiHelp, membersInfo, $filter) {
    var PAGE_SIZE = 10;
    this.pageIndex = 0;
    this.ts = CRM.ts('memberlist');
    this.hs = crmUiHelp({ file: 'CRM/memberlist/MemberCtrl' }); // See: templates/CRM/memberlist/MemberCtrl.hlp
    this.members = membersInfo.values;

    this.pageMembers = this.members.slice(PAGE_SIZE * 0, PAGE_SIZE);
    this.pages = new Array(Math.ceil(this.members.length / PAGE_SIZE));

    this.selectPage = function (pageIndex) {
      this.pageIndex = pageIndex;
      this.pageMembers = this.members.slice(PAGE_SIZE * pageIndex, PAGE_SIZE * (pageIndex + 1));
    }
    this.applyFilter = function () {
      this.members = $filter('min')(membersInfo.values, 'join_date', this.minDate);
      this.members = $filter('max')(this.members, 'join_date', this.maxDate);
      this.pageMembers = this.members.slice(0, PAGE_SIZE);
      this.pages = new Array(Math.ceil(this.members.length / PAGE_SIZE));
    }
  };

})(angular, CRM.$, CRM._);
