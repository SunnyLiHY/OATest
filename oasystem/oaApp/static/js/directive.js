angular.module("oasystem").directive('ngFocus', [function() {
	console.log("test");
	var FOCUS_CLASS = "ng-focused";
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			ctrl.$focused = false;
			element.bind('focus', function(evt) {
				element.addClass(FOCUS_CLASS);
				scope.$apply(function() {
					ctrl.$focused = true;
				});
			}).bind('blur', function(evt) {
				element.removeClass(FOCUS_CLASS);
				scope.$apply(function() {
					ctrl.$focused = false;
				});
			});
		}
	};
}]);

angular.module("oasystem").filter('sexFilter',function() {
	return function(input){
		if(input == 0)
			return '男'
		else
			return '女';
	}
});