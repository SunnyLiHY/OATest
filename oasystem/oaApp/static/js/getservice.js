/******************************** 服务：数据库增删改查
**** admin :Sunny
**** createon:2016/8/5
********************************/
testapp.factory('oaFactory', ['$http', '$q', function($http, $q) {
	var allData = [];
	return {
		getFacStu: function() {
			var deferred = $q.defer(); // 声明延后执行,监控后面的执行  
			$http.get('AllData').
			success(function(data, status, headers, config) {
				deferred.resolve(data);
				allData = data;
			}).
			error(function(data, status, headers, config) {
				/* Act on the event */
				deferred.reject(data);
				console.log(status);

			});
			return deferred.promise;
		},

		addFacStu: function(add_student_num, add_student_name, add_student_sex, add_student_psd) {
			var selfId = 0;
			var id_list = [];
			if (allData.length == 0)
				selfId = 1;
			else {
				for (var i = 0; i < allData.length; i++) {
					id_list.push(allData[i].id);
				}
				selfId = Math.max.apply(Math, id_list) + 1;
			}
			var paramData = {
				'id': selfId,
				'student_num': add_student_num,
				'student_name': add_student_name,
				'student_sex': add_student_sex,
				'student_psd': add_student_psd
			};
			var deferred = $q.defer();
			var transform = function(data) {
				return $.param(data);
			};

			$http.get('AddData', {
				params: paramData
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
				allData = data;
			}).
			error(function(data, status, headers, config) {
				/* Act on the event */
				deferred.reject(data);
				console.log(status);

			});
			return deferred.promise;
		},

		delFacStu: function(getAllCheckedId) {
			var deferred = $q.defer();
			$http.get('DeleteData', {
				params: getAllCheckedId
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
				allData = data;
			}).
			error(function(data, status, headers, config) {
				/* Act on the event */
				deferred.reject(data);
				console.log(status);

			});
			return deferred.promise;
		},

		UpdateFacStu: function(num, name, sex, psd, id) {
			var paramData = {
				'id': id,
				'student_num': num,
				'student_name': name,
				'student_sex': sex,
				'student_psd': psd
			};
			var deferred = $q.defer();
			$http.get('AddData', {
				params: paramData
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
				allData = data;
			}).
			error(function(data, status, headers, config) {
				/* Act on the event */
				deferred.reject(data);
				console.log(status);

			});
			return deferred.promise;
		},

		searchFacStu:function(num,name){
			if(num == undefined){
				num = " ";
			}
			if(name == undefined){
				name = " ";
			}
			var searchParam = {
				'student_num': num,
				'student_name': name
			};
			var deferred = $q.defer();
			$http.get('SearchData', {
				params: searchParam
			}).
			success(function(data, status, headers, config) {
				deferred.resolve(data);
				allData = data;
			}).error(function(data) {
				deferred.reject(data);
				console.log(status);
			});
			return deferred.promise;
		}
	};
}]);