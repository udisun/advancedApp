'use strict';
// pagination filter, uses the current page and page size to
// calculate the current state/page of a list of items

angular.module('mean.system').filter('Paginate', ['$filter',
    function($filter) {
        return function(input, current_page, page_size) {
            if (input) {
                return $filter('limitTo')(input.slice(current_page * page_size), page_size);
            }
        }
    }
])
.filter('searchfilter', function() {
    return function(input, query) {
        return input.replace(RegExp('(' + query + ')', 'g'), '<span class="super-class">$1</span>');
    }
})



