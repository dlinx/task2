(function (angular, $, _) {
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
})(angular, CRM.$, CRM._);
